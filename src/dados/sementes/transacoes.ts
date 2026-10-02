import type { Transacao } from "../tipos";

/** Movimentos fictícios, do mais recente para o mais antigo. */
export const TRANSACOES: readonly Transacao[] = [
  { id: "t01", descricao: "Fatura do cartão", categoria: "servico", data: "2026-09-28T09:12", valor: -85000, cartao: "1234", situacao: "concluida", meio: "cartao" },
  { id: "t02", descricao: "Depósito PayPal", categoria: "deposito", data: "2026-09-25T14:40", valor: 250000, cartao: "1234", situacao: "concluida", meio: "paypal" },
  { id: "t03", descricao: "Joana Wilson", categoria: "transferencia", data: "2026-09-21T18:05", valor: 540000, cartao: "1234", situacao: "concluida", meio: "pix" },
  { id: "t04", descricao: "Assinatura de música", categoria: "assinatura", data: "2026-09-20T12:30", valor: -2490, cartao: "1234", situacao: "pendente", meio: "cartao" },
  { id: "t05", descricao: "Venda de ilustrações", categoria: "transferencia", data: "2026-09-18T22:40", valor: 75000, cartao: "5600", situacao: "concluida", meio: "pix" },
  { id: "t06", descricao: "Plano de celular", categoria: "servico", data: "2026-09-15T10:40", valor: -15000, cartao: "1234", situacao: "concluida", meio: "cartao" },
  { id: "t07", descricao: "Transferência para Wilson", categoria: "transferencia", data: "2026-09-12T15:29", valor: -105000, cartao: "1234", situacao: "concluida", meio: "pix" },
  { id: "t08", descricao: "Reembolso de Emília", categoria: "transferencia", data: "2026-09-10T20:40", valor: 84000, cartao: "5600", situacao: "concluida", meio: "pix" },
  { id: "t09", descricao: "Supermercado", categoria: "compra", data: "2026-09-08T11:02", valor: -32790, cartao: "7560", situacao: "concluida", meio: "cartao" },
  { id: "t10", descricao: "Salário", categoria: "salario", data: "2026-09-05T08:00", valor: 820000, cartao: "1234", situacao: "concluida", meio: "pix" },
  { id: "t11", descricao: "Streaming de vídeo", categoria: "assinatura", data: "2026-09-04T07:45", valor: -5590, cartao: "5600", situacao: "concluida", meio: "cartao" },
  { id: "t12", descricao: "Conta de luz", categoria: "servico", data: "2026-09-02T09:20", valor: -21430, cartao: "1234", situacao: "concluida", meio: "cartao" },
];
