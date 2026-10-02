#!/usr/bin/env python3
"""Edições recorrentes no cofre. Rode dentro do cofre.
ve.py moc "<cabeçalho>" "<linha>"   → acrescenta linha no fim da seção do MOC vitalbank-frontend
ve.py plano "<texto do item>"       → marca o item no plano da v1 com o número do PR ($N)
ve.py arquivo <caminho>             → (lê stdin) escreve nota nova
"""
import os, sys
n = os.environ.get('N', '?')
cmd = sys.argv[1]
if cmd == 'moc':
    p = '00 - Índice/vitalbank-frontend.md'; s = open(p).read()
    head, line = sys.argv[2], sys.argv[3]
    i = s.index(head + '\n') + len(head) + 1
    j = s.find('\n## ', i)
    j = len(s) if j < 0 else j
    bloco = s[i:j].rstrip('\n')
    s = s[:i] + (bloco + '\n' if bloco.strip() else '\n') + line + '\n' + ('\n' if j < len(s) else '') + s[j:].lstrip('\n')
    open(p, 'w').write(s)
elif cmd == 'plano':
    p = '08 - Infra e Deploy/Planos/2026-10-02-plano-da-v1.md'; s = open(p).read()
    item = sys.argv[2]
    if f'- [ ] {item}' in s:
        s = s.replace(f'- [ ] {item}', f'- [x] {item} — #{n}', 1)
    else:  # item dentro de uma linha com vários "·"
        s = s.replace(f' {item} ', f' ~~{item}~~ (#{n}) ', 1) if f' {item} ' in s else s.replace(f' {item}\n', f' ~~{item}~~ (#{n})\n', 1)
    open(p, 'w').write(s)
elif cmd == 'arquivo':
    p = sys.argv[2]; os.makedirs(os.path.dirname(p), exist_ok=True)
    open(p, 'w').write(sys.stdin.read().replace('NNN', n))
