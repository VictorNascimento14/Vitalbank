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
