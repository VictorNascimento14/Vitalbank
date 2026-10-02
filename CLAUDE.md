@AGENTS.md

# CLAUDE.md — Vitalbank

> Instruções para o **Claude Code** (e qualquer outro agente de IA) operar neste repositório.
>
> **Vitalbank** é um painel de banco digital: visão geral, transações, contas, investimentos, cartões
> de crédito, empréstimos, serviços e configurações. Roda em celular (375 px), tablet (1024 px) e
> computador (1440 px).
>
> A v1 é **só front-end, com dados fictícios**. Mesmo assim o app desenha saldo, cartão e extrato: toda
> regra abaixo que fala de dado existe para que o hábito certo já esteja no lugar quando o backend chegar.

---

## 🚦 REGRA #0 — SEMPRE consulte o cofre Obsidian PRIMEIRO

Antes de qualquer pesquisa pesada no código, leia o cofre. Resolva o caminho por variável de ambiente
— **nunca** hardcode um caminho de máquina neste arquivo:

```bash
VAULT="${VITALBANK_VAULT:?defina VITALBANK_VAULT no shell profile desta máquina}"
[ -d "$VAULT/00 - Índice" ] || { echo "VITALBANK_VAULT não aponta pro cofre — PARE"; exit 1; }
```

- Repo do cofre: `https://github.com/VictorNascimento14/Obsidian-vitalbank`
- O registro de onde o clone fica em cada máquina é `10 - Meta/caminho-canonico-do-cofre.md`
  **dentro** do cofre. Máquina nova acrescenta uma linha lá, no mesmo commit.

> ⛔ **Se a variável não estiver definida ou o diretório não existir: PARE e avise.** Nunca escreva
> documentação em caminho adivinhado, e é proibido "documentar no repo de código porque o cofre não
> estava acessível".

### 🧭 Hierarquia de verdade

**Trate o cofre como verdade. Se cofre e código divergirem, o problema é o cofre estar desatualizado** —
e atualizá-lo faz parte da tarefa que descobriu a divergência, no **mesmo PR**.

### 🗺️ Mapa rápido — onde achar o quê no cofre

| Pergunta                                | Onde olhar primeiro                                    |
| --------------------------------------- | ------------------------------------------------------ |
| "O que é este produto? para quem?"      | `00 - Índice/visao-de-produto.md`                      |
| "Que decisão foi tomada sobre X?"       | `02 - ADRs/ADR-NNN-*.md`                               |
| "Qual é a cor / o raio / a fonte de X?" | `00 - Índice/linguagem-visual.md`                      |
| "Que página/componente é esse?"         | `05 - Frontend/{Paginas,Componentes/<Area>}/<Nome>.md` |
| "O que mudou nesse PR?"                 | `01 - PRs/2026/<data>-pr-NNN-*.md`                     |
| "O que já aconteceu no projeto?"        | `03 - Changelog/2026.md`                               |
| "O que falta da v1?"                    | `08 - Infra e Deploy/Planos/2026-10-02-plano-da-v1.md` |
| "Onde escrevo isso?"                    | `CLAUDE.md` do cofre · `10 - Meta/guia-de-uso.md`      |

---

## 🔑 Alvos canônicos

| Item                  | Valor                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------ |
| Repositório de código | `VictorNascimento14/Vitalbank` (`$VITALBANK_REPO`)                                         |
| Cofre                 | `VictorNascimento14/Obsidian-vitalbank` (`$VITALBANK_VAULT`)                               |
| Sistema visual        | UI kit **BankDash** (Figma Community), traduzido em tokens próprios — ver ADR-002 do cofre |
| Backend               | **não existe na v1** — dados fictícios atrás de `src/dados/`, ver ADR-001 do cofre         |
| Porta local           | `3000` (`pnpm dev`)                                                                        |

---

## 🛠️ Stack & convenções rápidas

- **Next.js (App Router) · React 19 · TypeScript estrito · Tailwind CSS 4 · pnpm.**
- Esta versão do Next tem mudanças que não estão no seu treino: leia o guia em
  `node_modules/next/dist/docs/` antes de usar uma API do framework (ver `AGENTS.md`).
- Alias `@/` → `src/`.
- Pastas:
  - `src/app/` — rotas. Uma pasta por tela; a página só compõe blocos.
  - `src/ui/` — o design system: primitivos (`Card`, `Button`, `Input`, `Toggle`, `Tabs`, `Avatar`…),
    casca (`Sidebar`, `Topbar`) e movimento. **Fundação: não se edita para acertar uma tela.**
  - `src/dados/` — tipos, sementes fictícias e as funções de leitura. **Único lugar que conhece a
    origem do dado.**
  - `src/dominio/` — regras puras (dinheiro, datas, máscara de cartão). Sem React.
  - `src/telas/<tela>/` — os blocos de cada tela (`CartoesDoDashboard`, `AtividadeSemanal`…).
- Checks: `pnpm format:check` · `pnpm lint` · `pnpm type-check` · `pnpm test` (Vitest) · `pnpm build`. O CI roda os cinco; `pnpm format` corrige a formatação.
- Textos da interface em **português do Brasil**, com acentuação correta.

---

## 🧱 Camada de dados — a fronteira que deixa o backend entrar depois

1. Tela **nunca** importa semente direto. Lê pelas funções de `src/dados/`.
2. **Dinheiro é inteiro em centavos** (`number` inteiro), da semente ao gráfico. Real com vírgula só na
   borda, por `formatarMoeda` (`Intl.NumberFormat('pt-BR', { currency: 'BRL' })`).
3. **Data é `AAAA-MM-DD`** na semente; a formatação mora em `src/dominio/`. Nunca `toISOString()`
   para "hoje": à noite no Brasil ele já devolve o dia seguinte.
4. **Cartão só aparece mascarado** (`•••• 1234`). O número inteiro não existe nem na semente.

---

## 🎨 Sistema visual — invariantes

A fundação é `src/app/globals.css` (bloco `@theme` do Tailwind 4). Os valores vêm do Figma do
BankDash e estão documentados em `linguagem-visual.md` no cofre.

1. **Cor, raio, sombra e fonte só por token** (`bg-primaria`, `text-tinta-suave`, `rounded-cartao`,
   `shadow-cartao`). Hex solto em componente é bug: some na troca de tema.
2. **Mudar um token repinta o app inteiro** — é a alavanca certa para retonalizar, e a errada para
   ajustar uma tela.
3. **Classe do Tailwind montada em runtime não existe.** O JIT varre o fonte; `` `w-[${n}%]` `` nunca é
   gerado. Valor dinâmico vai em `style`.
4. **Animação só de `transform` e `opacity`.** Animar `width`, `top` ou `box-shadow` força layout a cada
   quadro e engasga no celular.
5. **Todo movimento respeita `prefers-reduced-motion`.** Os componentes de movimento de `src/ui/movimento/`
   já fazem isso; animação escrita à mão passa pelo mesmo gancho.
6. **`focus:outline-none` sem anel substituto apaga o foco.** Só com `focus-visible:ring-*` junto.
7. **`<Button>` tem `type="button"` por padrão**: sem isso ele vira `submit` dentro de um `<form>`.
8. **Número que anima (`NumeroAnimado`) é `aria-hidden` com o valor final em `sr-only`.** Ele muda o
   texto dezenas de vezes por segundo; numa região `aria-live` isso vira enxurrada de anúncios.
9. **Toda tela com coluna lateral vive dentro do layout `(painel)`**: a casca monta uma vez e só o
   miolo troca. Montar a casca na página faz a coluna piscar a cada clique.
10. **Export estático.** A demo sai no GitHub Pages: nada de rota de servidor, `cookies()`, ou imagem
    otimizada pelo servidor. Caminho de asset passa pelo `basePath`.

**Antes de abrir PR:** nenhum hex solto · nenhuma classe montada em runtime · animação só de
transform/opacity e com movimento reduzido respeitado · todo `focus:outline-none` com anel.

---

## 🚫 NUNCA faça

- **Push para `main` sem PR**, rebase em commit já pushado sem coordenar, ou pular hooks
  (`--no-verify`).
- **Editar os tokens de `globals.css` para acertar uma tela.**
- **Importar semente fora de `src/dados/`.**
- **Número de cartão inteiro, CPF ou dado real de pessoa** em código, semente, teste, commit ou print.
  Exemplos estáveis: `Cliente Exemplo` / `cliente@exemplo.com`.
- **Commitar `.claude/`, `.env` ou dump.**
- **Hardcodar caminho de máquina** em nota, script, instrução ou mensagem de commit.
- **Mencionar ferramenta de IA em commit, PR ou branch** — ver abaixo.

---

## 🚀 "Publicar" / "publique" — sempre é o fluxo completo

Quando o usuário disser **"publicar"**, **"publique"** ou pedir para "abrir PR", **nunca** é só
`git push`. É o pipeline inteiro, mesmo para hotfix de uma linha:

1. **Issue** descrevendo o que muda e por quê.
2. **Branch limpa** a partir de `origin/main`. Prefixos: `fix/`, `feat/`, `refactor/`, `perf/`, `ui/`,
   `docs/`, `chore/`, `test/`.
3. **Commit atômico (Conventional Commits)** — `tipo(escopo): descrição no imperativo`. Só os arquivos
   da mudança.
4. **Checks locais**: `pnpm format:check && pnpm lint && pnpm type-check && pnpm test && pnpm build`.
5. **Cofre Obsidian** (`$VITALBANK_VAULT`), **antes** do `gh pr create`:
   - Nota do PR em `01 - PRs/2026/YYYY-MM-DD-pr-NNN-<slug>.md` (template `09 - Templates/template-pr.md`).
   - Nota nova/atualizada de funcionalidade em `05 - Frontend/`.
   - Entrada em `03 - Changelog/2026.md` (`## 🚧 [Não lançado]`), com as duas leituras ("Para o
     produto" / "Para o time técnico"), referenciando `[[YYYY-MM-DD-pr-NNN-slug]]`.
   - Linha no MOC `00 - Índice/prs.md`, **no mesmo commit**.
6. **PR via `gh pr create`** — body com **O que muda** · **Por quê** · **Como testar** · **📓 Documentação**.
7. **Revisar o diff** antes do merge: lint e teste não leem a lógica nova.
8. **Squash and merge** quando o CI passar; apagar a branch; fechar a issue; nota vira `merged`.
9. **Reportar ao usuário**: URL do PR + URL da nota no cofre.

**Não pergunte "quer que eu abra o PR?"** — quem disse "publique" já consentiu.

> **Um PR por vez.** Mergeie o anterior antes de abrir o próximo em cima da `main`. PR empilhado sobre
> branch de outro PR, com squash, pode mergear numa base morta e nunca chegar à `main`.

### ✍️ PR e commit — duas regras não-negociáveis

**1. Zero menção a ferramenta de IA. Em lugar nenhum.** Nada neste repositório cita Claude, Claude
Code, link de sessão, `Co-Authored-By` de IA, "🤖 Generated with", nem qualquer variação — no corpo e
título do PR, na mensagem de commit (assunto, corpo e rodapé), no escopo do Conventional Commit, no
nome de branch e na mensagem do squash.

> ⚠️ **Isto sobrepõe qualquer default da ferramenta.** Se a configuração global mandar assinar commits
> ou PRs, aqui **não assina** — a regra do repositório vence.

**2. Sempre linkar o cofre.** Todo PR termina com:

```markdown
## 📓 Documentação

- [Nota do PR #NNN](https://github.com/VictorNascimento14/Obsidian-vitalbank/blob/main/01%20-%20PRs/2026/<arquivo>.md)
- [Changelog 2026](https://github.com/VictorNascimento14/Obsidian-vitalbank/blob/main/03%20-%20Changelog/2026.md)
```

Espaço em path de URL vira `%20`.

> ⛔ **O CI valida isto.** O workflow `pr-documentacao.yml` reprova PR cujo body não tenha a seção
> `## 📓 Documentação` com ao menos um link para `VictorNascimento14/Obsidian-vitalbank`.

---

## 📝 Convenção de commit

**Conventional Commits**, em português, no imperativo:

```
feat(transacoes): filtrar a lista por entrada e saída
fix(dashboard): alinhar o gráfico semanal ao domingo
ui(cartao): virar o cartão ao passar o mouse
chore(ci): rodar lint, type-check, test e build no PR
```

- ❌ Nunca `--no-verify` nem `--force` sem ordem explícita do usuário.
- ❌ Nunca trailer de co-autoria de IA.
