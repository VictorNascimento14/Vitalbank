import type { Cartao } from "../tipos";

/** Cartões fictícios. Só início e final: o miolo do número não existe. */
export const CARTOES: readonly Cartao[] = [
  {
    id: "c-principal",
    inicio: "3778",
    final: "1234",
    titular: "Cliente Exemplo",
    validade: "12/28",
    saldo: 575600,
    variante: "escuro",
    banco: "Vitalbank",
    tipo: "principal",
  },
  {
    id: "c-adicional",
    inicio: "3778",
    final: "5600",
    titular: "Cliente Exemplo",
    validade: "08/27",
    saldo: 213040,
    variante: "claro",
    banco: "Vitalbank",
    tipo: "adicional",
  },
  {
    id: "c-viagem",
    inicio: "5214",
    final: "7560",
    titular: "Cliente Exemplo",
    validade: "03/29",
    saldo: 98000,
    variante: "azul",
    banco: "Vitalbank",
    tipo: "adicional",
  },
];
