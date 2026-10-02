import type { DiaISO } from "@/dominio/datas";

/** Avisos recentes do app. */
export const NOTIFICACOES: readonly {
  id: string;
  tipo: "entrada" | "saida" | "seguranca" | "fatura";
  titulo: string;
  texto: string;
  quando: DiaISO;
  lida: boolean;
}[] = [
  { id: "n1", tipo: "entrada", titulo: "Pix recebido", texto: "Joana Wilson enviou R$ 5.400,00.", quando: "2026-10-02T08:15", lida: false },
  { id: "n2", tipo: "fatura", titulo: "Fatura fechada", texto: "A fatura do cartão •••• 1234 fecha hoje.", quando: "2026-10-02T06:00", lida: false },
  { id: "n3", tipo: "seguranca", titulo: "Novo acesso", texto: "Entrada pelo navegador em São Paulo.", quando: "2026-10-01T21:40", lida: false },
  { id: "n4", tipo: "saida", titulo: "Compra aprovada", texto: "Supermercado, R$ 327,90 no cartão •••• 7560.", quando: "2026-09-30T11:02", lida: true },
];
