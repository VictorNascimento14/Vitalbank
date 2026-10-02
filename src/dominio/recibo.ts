import type { Transacao } from "@/dados";
import { finalDoCartao } from "./cartao";
import { formatarDataLonga } from "./datas";
import { formatarMoeda } from "./dinheiro";

/** Texto do recibo de uma transação. Só o final do cartão; nada além do que a tela mostra. */
export function textoDoRecibo(t: Transacao, rotuloDoTipo: string): string {
  const [dia, hora] = t.data.split("T");
  return [
    "VITALBANK — RECIBO DE TRANSAÇÃO",
    "Documento de demonstração, sem valor fiscal.",
    "",
    `Código:     ${t.codigo}`,
    `Descrição:  ${t.descricao}`,
    `Tipo:       ${rotuloDoTipo}`,
    `Cartão:     ${finalDoCartao(t.cartao)}`,
    `Data:       ${formatarDataLonga(dia)}${hora ? `, ${hora}` : ""}`,
    `Valor:      ${formatarMoeda(t.valor, { sinal: true })}`,
    `Situação:   ${t.situacao === "concluida" ? "Concluída" : "Pendente"}`,
    "",
  ].join("\n");
}

export function nomeDoRecibo(t: Transacao): string {
  return `recibo-${t.codigo.replace("#", "")}.txt`;
}
