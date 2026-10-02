import type { DiaISO } from "@/dominio/datas";

/** Total gasto por mês nos últimos seis meses, em centavos (kit: "My Expense"). */
export const DESPESAS_MENSAIS: readonly { mes: DiaISO; total: number }[] = [
  { mes: "2026-05-01", total: 640000 },
  { mes: "2026-06-01", total: 980000 },
  { mes: "2026-07-01", total: 760000 },
  { mes: "2026-08-01", total: 420000 },
  { mes: "2026-09-01", total: 1250000 },
  { mes: "2026-10-01", total: 610000 },
];
