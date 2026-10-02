# Publicação

O fluxo "publicar" do [`CLAUDE.md`](../../CLAUDE.md) num comando: **issue → checks locais → nota no cofre
→ PR com 📓 → CI → squash → issue fechada → nota marcada como merged**.

```bash
scripts/publicacao/publicar.sh caminho/do/pacote
```

O pacote é uma pasta com:

| Arquivo        | O quê                                                                                                                                  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `meta.env`     | `BRANCH`, `TITULO` (Conventional Commit), `ISSUE_TITULO`, `SLUG`, `CATEGORIA` (`Adicionado`/`Alterado`/`Corrigido`), `TAGS`, `AFETADA` |
| `issue.md`     | corpo da issue                                                                                                                         |
| `pr.md`        | corpo do PR (O que muda · Por quê · Como testar); a seção 📓 é acrescentada                                                            |
| `nota.md`      | corpo da nota do cofre (o cabeçalho é gerado)                                                                                          |
| `changelog.md` | entrada do changelog, com as duas leituras                                                                                             |
| `vault.sh`     | opcional: edições extras no cofre (MOC, plano, nota de componente) — use `python3 "$VE" …`                                             |

Nos textos, `NNN` vira o número do PR, `NNN3` o número com três dígitos, `ISSUE` o da issue, `HOJE` a data e
`NOTA` o nome da nota.

- O número do PR é **previsto** como issue + 1. Se outra issue ou PR nascer no meio (o Dependabot, por
  exemplo), o script para com aviso antes de mergear.
- Issue já criada: `ISSUE_EXISTENTE=43 scripts/publicacao/publicar.sh …`.
- Precisa de `VITALBANK_REPO`, `VITALBANK_VAULT` e do `gh` logado.

`ve.py` faz as edições recorrentes do cofre: `moc "<seção>" "<linha>"`, `plano "<item>"`.
