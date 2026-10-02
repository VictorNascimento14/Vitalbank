/**
 * Cartão no Vitalbank só existe mascarado: a semente guarda os quatro últimos dígitos, e o
 * formulário de novo cartão descarta o número inteiro assim que tira deles o final.
 */

/** "3778 •••• •••• 1234" quando há prefixo; "•••• •••• •••• 1234" quando não. */
export function mascararCartao(ultimos4: string, prefixo4?: string): string {
  if (!/^\d{4}$/.test(ultimos4)) throw new RangeError("o final do cartão tem 4 dígitos");
  return `${prefixo4 ?? "••••"} •••• •••• ${ultimos4}`;
}

/** "•••• 1234" — para listas, onde o número inteiro não cabe. */
export function finalDoCartao(ultimos4: string): string {
  return `•••• ${ultimos4}`;
}

export function somenteDigitos(texto: string): string {
  return texto.replace(/\D/g, "");
}

/** Agrupa em blocos de 4 enquanto a pessoa digita: "4111111" → "4111 111". */
export function agruparDigitos(texto: string): string {
  return somenteDigitos(texto)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

/** Dígito verificador de Luhn: pega erro de digitação, não diz se o cartão existe. */
export function passaNoLuhn(numero: string): boolean {
  const digitos = somenteDigitos(numero);
  if (digitos.length < 13 || digitos.length > 19) return false;
  let soma = 0;
  for (let i = 0; i < digitos.length; i++) {
    let d = Number(digitos[digitos.length - 1 - i]);
    if (i % 2 === 1) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    soma += d;
  }
  return soma % 10 === 0;
}

/** "MM/AA" ainda válido no mês de `hoje` (o cartão vale até o último dia do mês). */
export function validadeEmDia(validade: string, hoje: Date = new Date()): boolean {
  const m = /^(\d{2})\/(\d{2})$/.exec(validade);
  if (!m) return false;
  const mes = Number(m[1]);
  const ano = 2000 + Number(m[2]);
  if (mes < 1 || mes > 12) return false;
  return ano > hoje.getFullYear() || (ano === hoje.getFullYear() && mes >= hoje.getMonth() + 1);
}
