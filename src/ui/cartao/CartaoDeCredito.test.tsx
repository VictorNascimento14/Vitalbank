import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import type { Cartao } from "@/dados";
import { CartaoDeCredito } from "..";

const cartao: Cartao = {
  id: "x",
  inicio: "3778",
  final: "1234",
  titular: "Cliente Exemplo",
  validade: "12/28",
  saldo: 575600,
  variante: "escuro",
  banco: "Vitalbank",
  tipo: "principal",
};

test("o cartão se apresenta pelo final e pelo saldo", () => {
  render(<CartaoDeCredito cartao={cartao} />);
  expect(screen.getByRole("article", { name: /final 1234, saldo R\$\s5\.756,00/ })).toBeInTheDocument();
});

test("a face mostra só início e final do número", () => {
  render(<CartaoDeCredito cartao={cartao} />);
  expect(screen.getByText("3778 •••• •••• 1234")).toBeInTheDocument();
  expect(screen.getByText("Cliente Exemplo")).toBeInTheDocument();
  expect(screen.getByText("12/28")).toBeInTheDocument();
});
