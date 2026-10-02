import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { GraficoDePizza } from "..";

test("a legenda acessível traz cada fatia com o percentual", () => {
  render(
    <GraficoDePizza
      titulo="Despesas do mês"
      fatias={[
        { nome: "Lazer", valor: 30, cor: "tinta" },
        { nome: "Contas", valor: 15, cor: "laranja" },
        { nome: "Outros", valor: 55, cor: "primaria" },
      ]}
    />,
  );
  expect(screen.getByText("Despesas do mês: Lazer 30%, Contas 15%, Outros 55%")).toBeInTheDocument();
});
