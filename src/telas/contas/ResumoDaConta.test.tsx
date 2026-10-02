import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { resumoDaConta } from "@/dados";
import { ResumoDaConta } from "./ResumoDaConta";

test("quatro cartões: saldo, receitas, despesas e poupança", async () => {
  render(<ResumoDaConta resumo={await resumoDaConta()} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(4);
  for (const [rotulo, valor] of [
    ["Meu saldo", "R$ 12.750,00"],
    ["Receitas", "R$ 5.600,00"],
    ["Despesas", "R$ 3.460,00"],
    ["Poupança", "R$ 7.920,00"],
  ]) {
    expect(screen.getByText(rotulo)).toBeInTheDocument();
    expect(screen.getByText(valor, { selector: ".sr-only" })).toBeInTheDocument();
  }
});
