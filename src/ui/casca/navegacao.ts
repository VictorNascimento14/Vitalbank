import {
  RiBankCardFill,
  RiBarChartBoxFill,
  RiHandCoinFill,
  RiHome5Fill,
  RiLightbulbFlashFill,
  RiMoneyDollarCircleFill,
  RiSettings5Fill,
  RiToolsFill,
  RiUser3Fill,
  type RemixiconComponentType,
} from "@remixicon/react";

export interface ItemDeNavegacao {
  rota: string;
  /** Texto do menu. */
  rotulo: string;
  /** Título que o cabeçalho mostra quando a rota está aberta. */
  titulo: string;
  Icone: RemixiconComponentType;
}

/** As telas do app, na ordem da coluna lateral do kit. */
export const NAVEGACAO: readonly ItemDeNavegacao[] = [
  { rota: "/", rotulo: "Visão geral", titulo: "Visão geral", Icone: RiHome5Fill },
  { rota: "/transacoes", rotulo: "Transações", titulo: "Transações", Icone: RiMoneyDollarCircleFill },
  { rota: "/contas", rotulo: "Contas", titulo: "Contas", Icone: RiUser3Fill },
  { rota: "/investimentos", rotulo: "Investimentos", titulo: "Investimentos", Icone: RiBarChartBoxFill },
  { rota: "/cartoes", rotulo: "Cartões", titulo: "Cartões de crédito", Icone: RiBankCardFill },
  { rota: "/emprestimos", rotulo: "Empréstimos", titulo: "Empréstimos", Icone: RiHandCoinFill },
  { rota: "/servicos", rotulo: "Serviços", titulo: "Serviços", Icone: RiToolsFill },
  { rota: "/privilegios", rotulo: "Meus privilégios", titulo: "Meus privilégios", Icone: RiLightbulbFlashFill },
  { rota: "/configuracoes", rotulo: "Configurações", titulo: "Configurações", Icone: RiSettings5Fill },
];

/** O item da rota aberta: "/" só casa exato; os outros casam também as sub-rotas. */
export function itemAtivo(caminho: string): ItemDeNavegacao | undefined {
  const limpo = caminho.replace(/\/+$/, "") || "/";
  return NAVEGACAO.find((i) => (i.rota === "/" ? limpo === "/" : limpo === i.rota || limpo.startsWith(`${i.rota}/`)));
}

/** Metadados da aba para a tela da rota: título "Transações · Vitalbank". */
export function metadadosDaTela(rota: string): { title: string } {
  const item = NAVEGACAO.find((i) => i.rota === rota);
  if (!item) throw new Error(`rota fora da navegação: ${rota}`);
  return { title: item.titulo };
}
