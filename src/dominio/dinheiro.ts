/**
 * Dinheiro no Vitalbank é inteiro em centavos, da semente ao gráfico (ADR-001).
 * Real com vírgula só existe na borda: aqui, ao formatar e ao ler o que a pessoa digitou.
 */
export type Centavos = number;

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const compacta = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  notation: "compact",
  minimumFractionDigits: 0,
  maximumFractionDigits: 1,
});

export interface OpcoesDeFormato {
  /** Mostra "+" em valor positivo — para entrada de dinheiro numa lista. */
  sinal?: boolean;
  /** "R$ 1,2 mil" em vez de "R$ 1.200,00" — para eixo de gráfico. */
  compacto?: boolean;
}

export function formatarMoeda(centavos: Centavos, opcoes: OpcoesDeFormato = {}): string {
  if (!Number.isInteger(centavos)) {
    throw new TypeError(`valor em centavos precisa ser inteiro, veio ${centavos}`);
  }
  const texto = (opcoes.compacto ? compacta : moeda).format(centavos / 100);
  return opcoes.sinal && centavos > 0 ? `+${texto}` : texto;
}

export function somarCentavos(valores: readonly Centavos[]): Centavos {
  return valores.reduce((total, valor) => total + valor, 0);
}

/**
 * Lê o que a pessoa digitou ("1.234,56", "R$ 10", "0,5") e devolve centavos.
 * Devolve `null` quando o texto não é um valor em reais.
 */
export function paraCentavos(texto: string): Centavos | null {
  const limpo = texto.replace(/R\$|\s/g, "");
  if (!/^-?\d{1,3}(\.\d{3})*(,\d{1,2})?$|^-?\d+(,\d{1,2})?$/.test(limpo)) return null;
  const [inteiro, fracao = ""] = limpo.replace(/\./g, "").split(",");
  const negativo = inteiro.startsWith("-");
  const centavos = Math.abs(Number(inteiro)) * 100 + Number(fracao.padEnd(2, "0"));
  return negativo ? -centavos : centavos;
}
