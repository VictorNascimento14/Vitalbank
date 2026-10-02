import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { BarraDeProgresso } from "..";

test("progressbar com valor em porcentagem e descrição", () => {
  render(<BarraDeProgresso valor={0.496} rotulo="Rumo ao Diamante" descricao="faltam 2.520 pontos" />);
  const barra = screen.getByRole("progressbar", { name: "Rumo ao Diamante" });
  expect(barra).toHaveAttribute("aria-valuenow", "50");
  expect(barra).toHaveAttribute("aria-valuetext", "faltam 2.520 pontos");
});

test("valor fora de 0–1 é limitado", () => {
  render(<BarraDeProgresso valor={1.7} rotulo="x" />);
  expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100");
});
