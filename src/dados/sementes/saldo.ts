import type { DiaISO } from "@/dominio/datas";

/** Saldo no fim de cada mês, em centavos (kit: "Balance History"). */
export const HISTORICO_DE_SALDO: readonly { mes: DiaISO; saldo: number }[] = [
  { mes: "2026-04-01", saldo: 12000 },
  { mes: "2026-05-01", saldo: 31000 },
  { mes: "2026-06-01", saldo: 26000 },
  { mes: "2026-07-01", saldo: 47000 },
  { mes: "2026-08-01", saldo: 44000 },
  { mes: "2026-09-01", saldo: 78000 },
  { mes: "2026-10-01", saldo: 25000 },
  { mes: "2026-11-01", saldo: 57000 },
  { mes: "2026-12-01", saldo: 61000 },
  { mes: "2027-01-01", saldo: 22000 },
  { mes: "2027-02-01", saldo: 64000 },
  { mes: "2027-03-01", saldo: 59000 },
];
