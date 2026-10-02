import { formatarMoeda } from "./dinheiro";

/**
 * Formatos de número das telas. Mora no domínio (sem "use client") para servir tanto a
 * componentes de servidor quanto aos animados: função exportada de um módulo cliente
 * não pode ser chamada pelo servidor.
 */
export type FormatoDeNumero = "moeda" | "moeda-compacta" | "inteiro" | "percentual";

const inteiro = new Intl.NumberFormat("pt-BR");
const percentual = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** `valor` em centavos para moeda; em pontos-base (1/100 de %) para percentual. */
export function formatarNumero(valor: number, formato: FormatoDeNumero): string {
  const redondo = Math.round(valor);
  switch (formato) {
    case "moeda":
      return formatarMoeda(redondo);
    case "moeda-compacta":
      return formatarMoeda(redondo, { compacto: true });
    case "percentual":
      return percentual.format(redondo / 10000);
    case "inteiro":
      return inteiro.format(redondo);
  }
}
