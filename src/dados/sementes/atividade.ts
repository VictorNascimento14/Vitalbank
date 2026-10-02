import type { DiaISO } from "@/dominio/datas";

/** Entradas e saídas dos últimos sete dias, em centavos (kit: "Weekly Activity"). */
export const ATIVIDADE_SEMANAL: readonly { dia: DiaISO; entradas: number; saidas: number }[] = [
  { dia: "2026-09-26", entradas: 24000, saidas: 48000 },
  { dia: "2026-09-27", entradas: 13000, saidas: 35000 },
  { dia: "2026-09-28", entradas: 26000, saidas: 33000 },
  { dia: "2026-09-29", entradas: 37000, saidas: 48000 },
  { dia: "2026-09-30", entradas: 24000, saidas: 15000 },
  { dia: "2026-10-01", entradas: 24000, saidas: 39000 },
  { dia: "2026-10-02", entradas: 33000, saidas: 40000 },
];
