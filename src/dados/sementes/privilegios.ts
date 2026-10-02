/** Programa de pontos (tela própria do Vitalbank; o kit só traz o item no menu). */
export const NIVEIS = [
  { id: "prata", nome: "Prata", minimo: 0 },
  { id: "ouro", nome: "Ouro", minimo: 10000 },
  { id: "diamante", nome: "Diamante", minimo: 15000 },
] as const;

export type Nivel = (typeof NIVEIS)[number]["id"];

export const PONTOS = 12480;

export const BENEFICIOS: readonly {
  id: string;
  nome: string;
  descricao: string;
  nivel: Nivel;
  icone: "cashback" | "saque" | "sala" | "seguro" | "gerente" | "cambio";
}[] = [
  {
    id: "b1",
    nome: "Cashback de 0,5%",
    descricao: "De volta em toda compra no crédito",
    nivel: "prata",
    icone: "cashback",
  },
  {
    id: "b2",
    nome: "Saques ilimitados",
    descricao: "Em qualquer caixa 24 horas do país",
    nivel: "prata",
    icone: "saque",
  },
  { id: "b3", nome: "Sala VIP", descricao: "Duas visitas por ano em aeroportos", nivel: "ouro", icone: "sala" },
  { id: "b4", nome: "Seguro viagem", descricao: "Cobertura internacional automática", nivel: "ouro", icone: "seguro" },
  {
    id: "b5",
    nome: "Gerente dedicado",
    descricao: "Atendimento por uma pessoa só",
    nivel: "diamante",
    icone: "gerente",
  },
  {
    id: "b6",
    nome: "Câmbio sem spread",
    descricao: "Compra de moeda pelo valor comercial",
    nivel: "diamante",
    icone: "cambio",
  },
];
