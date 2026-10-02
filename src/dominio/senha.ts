/**
 * Força de senha, de 0 a 4, para o medidor da tela de Segurança. Conta o que torna a
 * senha difícil de adivinhar: tamanho e variedade. Não substitui a regra do servidor.
 */
export type Forca = 0 | 1 | 2 | 3 | 4;

export const ROTULO_DA_FORCA: Record<Forca, string> = {
  0: "Muito fraca",
  1: "Fraca",
  2: "Média",
  3: "Boa",
  4: "Forte",
};

/** Senhas que aparecem no topo de qualquer vazamento: valem zero, por mais variadas que pareçam. */
const COMUNS = new Set(["12345678", "123456789", "1234567890", "senha123", "password", "qwerty123", "abcdefgh", "abc12345"]);

export function forcaDaSenha(senha: string): Forca {
  if (senha.length < 6) return 0;
  const variedade = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((r) => r.test(senha)).length;
  let pontos = variedade - 1;
  if (senha.length >= 12) pontos += 1;
  if (/^(.)\1+$/.test(senha) || COMUNS.has(senha.toLowerCase())) pontos = 0;
  return Math.max(0, Math.min(4, pontos)) as Forca;
}

/** A regra mínima para aceitar a troca: 8+ caracteres, com letra e número. */
export function senhaAceitavel(senha: string): boolean {
  return senha.length >= 8 && /[A-Za-z]/.test(senha) && /\d/.test(senha);
}
