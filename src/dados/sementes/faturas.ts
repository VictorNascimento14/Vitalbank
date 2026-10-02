import type { DiaISO } from "@/dominio/datas";

/** Cobranças que a pessoa enviou (kit: "Invoices Sent"). Valores em centavos. */
export const FATURAS_ENVIADAS: readonly {
  id: string;
  para: string;
  tipo: "loja" | "pessoa" | "jogo";
  enviadaEm: DiaISO;
  valor: number;
}[] = [
  { id: "f1", para: "Loja de apps", tipo: "loja", enviadaEm: "2026-10-02T04:10", valor: 45000 },
  { id: "f2", para: "Miguel Santos", tipo: "pessoa", enviadaEm: "2026-09-30T15:00", valor: 16000 },
  { id: "f3", para: "Loja de games", tipo: "jogo", enviadaEm: "2026-09-27T19:30", valor: 108500 },
  { id: "f4", para: "Guilherme Rocha", tipo: "pessoa", enviadaEm: "2026-09-22T10:00", valor: 9000 },
];
