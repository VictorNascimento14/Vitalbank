import type { Centavos } from "@/dominio/dinheiro";
import type { DiaISO } from "@/dominio/datas";

/** Aparência do cartão, como no kit: azul-escuro em gradiente, branco, ou azul-claro. */
export type VarianteDoCartao = "escuro" | "claro" | "azul";

export interface Cartao {
  id: string;
  /** Só os quatro últimos dígitos — o número inteiro não existe no app. */
  final: string;
  /** Quatro primeiros, para a face do cartão ("3778 •••• •••• 1234"). */
  inicio: string;
  titular: string;
  /** "MM/AA". */
  validade: string;
  saldo: Centavos;
  variante: VarianteDoCartao;
  banco: string;
  tipo: "principal" | "adicional";
}

export type CategoriaDeTransacao =
  | "deposito"
  | "transferencia"
  | "compra"
  | "servico"
  | "assinatura"
  | "salario";

export interface Transacao {
  id: string;
  descricao: string;
  categoria: CategoriaDeTransacao;
  /** `AAAA-MM-DD` ou `AAAA-MM-DDTHH:mm`. */
  data: DiaISO;
  /** Positivo é entrada; negativo é saída. */
  valor: Centavos;
  /** Final do cartão usado. */
  cartao: string;
  situacao: "concluida" | "pendente";
  /** Origem curta para a lista do painel ("Cartão", "PayPal", "Pix"). */
  meio: "cartao" | "paypal" | "pix";
}

export interface Contato {
  id: string;
  nome: string;
  cargo: string;
}
