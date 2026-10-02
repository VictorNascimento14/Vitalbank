/** Carteira fictícia (kit: Investments). Valores em centavos; retornos em pontos-base (580 = 5,80%). */
export const RESUMO_DOS_INVESTIMENTOS = {
  totalInvestido: 15000000,
  quantidade: 1250,
  retorno: 580,
} as const;

/** Total investido no fim de cada ano. */
export const INVESTIMENTO_ANUAL: readonly { ano: number; total: number }[] = [
  { ano: 2021, total: 520000 },
  { ano: 2022, total: 2300000 },
  { ano: 2023, total: 1680000 },
  { ano: 2024, total: 3640000 },
  { ano: 2025, total: 2010000 },
  { ano: 2026, total: 2910000 },
];

/** Receita dos investimentos, mês a mês, nos últimos 12 meses. */
export const RECEITA_MENSAL: readonly { mes: string; receita: number }[] = [
  { mes: "2025-11-01", receita: 820000 },
  { mes: "2025-12-01", receita: 1440000 },
  { mes: "2026-01-01", receita: 1030000 },
  { mes: "2026-02-01", receita: 2610000 },
  { mes: "2026-03-01", receita: 1900000 },
  { mes: "2026-04-01", receita: 1180000 },
  { mes: "2026-05-01", receita: 2790000 },
  { mes: "2026-06-01", receita: 1650000 },
  { mes: "2026-07-01", receita: 2470000 },
  { mes: "2026-08-01", receita: 1520000 },
  { mes: "2026-09-01", receita: 3320000 },
  { mes: "2026-10-01", receita: 3810000 },
];

/** Aplicações da carteira. Empresas fictícias; valor em centavos, retorno em pontos-base. */
export const CARTEIRA: readonly { id: string; nome: string; setor: string; valor: number; retorno: number }[] = [
  { id: "a1", nome: "Pomar Tecnologia", setor: "E-commerce, marketplace", valor: 5400000, retorno: 1600 },
  { id: "a2", nome: "Galáxia Mobile", setor: "E-commerce, marketplace", valor: 2530000, retorno: -400 },
  { id: "a3", nome: "Volt Motores", setor: "Veículos elétricos", valor: 820000, retorno: 2500 },
];

/** Ações em alta no dia. Nomes fictícios; preço em centavos, variação em pontos-base. */
export const ACOES_EM_ALTA: readonly { id: string; nome: string; preco: number; variacao: number }[] = [
  { id: "s1", nome: "Trívia", preco: 52000, variacao: 500 },
  { id: "s2", nome: "Lente", preco: 48000, variacao: 1000 },
  { id: "s3", nome: "Rota Food", preco: 35000, variacao: -300 },
  { id: "s4", nome: "Nórdica", preco: 94000, variacao: 200 },
  { id: "s5", nome: "Ritmo", preco: 67000, variacao: -1200 },
];
