import type { DiaISO } from "@/dominio/datas";

/** Débitos e créditos por dia da semana, em centavos (kit: "Debit & Credit Overview"). */
export const DEBITO_E_CREDITO: readonly { dia: DiaISO; debito: number; credito: number }[] = [
  { dia: "2026-09-26", debito: 98000, credito: 150000 },
  { dia: "2026-09-27", debito: 76000, credito: 132000 },
  { dia: "2026-09-28", debito: 74000, credito: 99000 },
  { dia: "2026-09-29", debito: 152000, credito: 87000 },
  { dia: "2026-09-30", debito: 113000, credito: 145000 },
  { dia: "2026-10-01", debito: 120000, credito: 81000 },
  { dia: "2026-10-02", debito: 123000, credito: 148000 },
];
