/** Linhas de crédito oferecidas (kit: Loans, primeira linha). Valores em centavos. */
export const LINHAS_DE_CREDITO = {
  pessoal: 5000000,
  empresarial: 10000000,
  negocios: 50000000,
} as const;

/** Empréstimos ativos. Valores em centavos; juros ao ano em pontos-base. */
export const EMPRESTIMOS_ATIVOS: readonly {
  id: string;
  valor: number;
  faltaPagar: number;
  meses: number;
  juros: number;
  parcela: number;
}[] = [
  { id: "e1", valor: 10000000, faltaPagar: 4050000, meses: 8, juros: 1200, parcela: 200000 },
  { id: "e2", valor: 50000000, faltaPagar: 25000000, meses: 36, juros: 1000, parcela: 800000 },
  { id: "e3", valor: 90000000, faltaPagar: 4050000, meses: 12, juros: 1200, parcela: 500000 },
  { id: "e4", valor: 5000000, faltaPagar: 4050000, meses: 25, juros: 500, parcela: 200000 },
  { id: "e5", valor: 5000000, faltaPagar: 4050000, meses: 5, juros: 1600, parcela: 1000000 },
  { id: "e6", valor: 8000000, faltaPagar: 2550000, meses: 14, juros: 800, parcela: 200000 },
  { id: "e7", valor: 1200000, faltaPagar: 550000, meses: 9, juros: 1300, parcela: 50000 },
  { id: "e8", valor: 16000000, faltaPagar: 10080000, meses: 3, juros: 1200, parcela: 90000 },
];
