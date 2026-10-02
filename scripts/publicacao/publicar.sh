#!/usr/bin/env bash
# Pipeline de publicação do Vitalbank: issue → checks → nota no cofre → PR → CI → squash → fecha issue.
# Uso: scripts/publicacao/publicar.sh <dir>   — ver scripts/publicacao/README.md
set -euo pipefail
export VE="$(cd "$(dirname "$0")" && pwd)/ve.py"   # o vault.sh do pacote chama "python3 $VE …"
: "${VITALBANK_REPO:?defina VITALBANK_REPO}" "${VITALBANK_VAULT:?defina VITALBANK_VAULT}"
DIR=$(cd "$1" && pwd)
source "$DIR/meta.env"   # BRANCH, TITULO, ISSUE_TITULO, SLUG, CATEGORIA (Adicionado|Alterado|Corrigido)
REPO="$VITALBANK_REPO"; VAULT="$VITALBANK_VAULT"; GH=VictorNascimento14/Vitalbank
HOJE=$(date +%F)
cd "$REPO"

# 0. base limpa
git fetch -q origin
[ "$(git rev-parse --abbrev-ref HEAD)" = main ] || { echo "não está na main"; exit 1; }
[ "$(git rev-parse HEAD)" = "$(git rev-parse origin/main)" ] || { echo "main local ≠ origin/main"; exit 1; }
[ -n "$(git status --porcelain)" ] || { echo "nada para publicar"; exit 1; }

# 1. checks locais (só os que existem)
for s in format:check lint type-check test build; do
  if node -e "process.exit(require('./package.json').scripts?.['$s']?0:1)" 2>/dev/null; then
    echo "▶ pnpm $s"
    if ! out=$(pnpm -s "$s" 2>&1); then echo "$out" | tail -40; echo "✗ $s falhou"; exit 1; fi
  fi
done

# 2. issue
if [ -n "${ISSUE_EXISTENTE:-}" ]; then I=$ISSUE_EXISTENTE; else
I=$(gh issue create -R "$GH" --title "$ISSUE_TITULO" --body-file "$DIR/issue.md" | command grep -oE '[0-9]+$'); fi
N=$((I + 1)); NNN=$(printf %03d "$N")
NOTA="$HOJE-pr-$NNN-$SLUG"
echo "issue #$I → PR previsto #$N"

sub() { sed -e "s/NNN3/$NNN/g; s/NNN/$N/g; s/ISSUE/$I/g; s/HOJE/$HOJE/g; s/NOTA/$NOTA/g" "$1"; }

# 3. cofre (antes do PR)
cd "$VAULT"; git pull -q --rebase
if head -1 "$DIR/nota.md" | command grep -q '^---'; then
  sub "$DIR/nota.md" > "01 - PRs/2026/$NOTA.md"
else
  { printf -- '---\ntipo: pr\ndata: %s\nautor: VictorNascimento14\nprojeto: Vitalbank\npr: %s\nurl: https://github.com/VictorNascimento14/Vitalbank/pull/%s\nbranch: %s\ntags: [pr, %s]\nstatus: aberto\n---\n\n# PR #%s — %s\n\n' \
      "$HOJE" "$N" "$N" "$BRANCH" "${TAGS:-frontend}" "$N" "$TITULO"
    sub "$DIR/nota.md"
    printf '\n## 📎 Documentação afetada\n\n%s- [[2026]] (changelog)\n' "${AFETADA:-}"; } > "01 - PRs/2026/$NOTA.md"
fi
python3 - "$CATEGORIA" "$(sub "$DIR/changelog.md")" <<'PY'
import sys; cat, entry = sys.argv[1], sys.argv[2].rstrip() + "\n"
p = "03 - Changelog/2026.md"; s = open(p).read()
icon = {"Adicionado": "✨", "Alterado": "🔄", "Corrigido": "🐛"}[cat]
h = f"### {icon} {cat}\n"
i = s.index(h) + len(h)
resto = s[i:].lstrip("\n")
open(p, "w").write(s[:i] + "\n" + entry + "\n" + resto)
PY
printf '| #%s | [[%s]] — %s |\n' "$N" "$NOTA" "$TITULO" >> "00 - Índice/prs.md"
[ -f "$DIR/vault.sh" ] && N=$N NOTA=$NOTA bash "$DIR/vault.sh"
git add -A && git commit -q -m "docs(pr-$N): $TITULO" && git push -q
cd "$REPO"

# 4. branch, commit, PR
git checkout -q -b "$BRANCH"
git add -A
git commit -q -m "$TITULO" -m "Refs #$I"
git push -q -u origin "$BRANCH" 2>/dev/null
NOTA_URL="https://github.com/VictorNascimento14/Obsidian-vitalbank/blob/main/01%20-%20PRs/2026/$NOTA.md"
{ cat "$DIR/pr.md"; printf '\nIssue: #%s\n\n## 📓 Documentação\n\n- [Nota do PR #%s](%s)\n- [Changelog 2026](https://github.com/VictorNascimento14/Obsidian-vitalbank/blob/main/03%%20-%%20Changelog/2026.md)\n' "$I" "$N" "$NOTA_URL"; } > "$DIR/.corpo.md"
URL=$(gh pr create -R "$GH" --base main --head "$BRANCH" --title "$TITULO" --body-file "$DIR/.corpo.md")
GOT=$(echo "$URL" | command grep -oE '[0-9]+$')
[ "$GOT" = "$N" ] || { echo "⚠ PR saiu #$GOT, nota previa #$N — corrigir à mão"; exit 2; }
echo "PR $URL"

# 5. CI
sleep 8
CK=$(gh pr checks "$N" -R "$GH" 2>&1 || true)
if [[ "$CK" == *"no checks"* ]]; then
  echo "(sem checks no repositório ainda)"
else
  gh pr checks "$N" -R "$GH" --watch --interval 10 >/dev/null 2>&1 || { gh pr checks "$N" -R "$GH"; echo "✗ CI falhou"; exit 3; }
fi

# 6. squash, issue, nota merged
gh pr merge "$N" -R "$GH" --squash --delete-branch --subject "$TITULO (#$N)" --body "" >/dev/null
git checkout -q main && git pull -q && git branch -D "$BRANCH" -q 2>/dev/null || true
gh issue close "$I" -R "$GH" --comment "Entregue no #$N." >/dev/null
cd "$VAULT"; git pull -q --rebase
sed -i 's/^status: aberto$/status: merged/' "01 - PRs/2026/$NOTA.md"
git add -A && git commit -q -m "docs(pr-$N): marcar como merged" && git push -q
echo "✓ #$N mergeado · nota $NOTA"
