import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { GraficoDeColunas } from "..";

const props = { titulo: "Despesas por mês", rotulos: ["jul", "ago", "set"], valores: [400000, 900000, 1250000] };

test("destaca a última coluna e escreve o valor dela", () => {
  const { container } = render(<GraficoDeColunas {...props} formato="moeda" />);
  const textos = [...container.querySelectorAll("svg text")].map((t) => t.textContent);
  expect(textos).toContain("R$ 12.500,00");
  expect(screen.getByRole("table", { name: "Despesas por mês" })).toBeInTheDocument();
});

test("o destaque segue o mouse", () => {
  const { container } = render(<GraficoDeColunas {...props} formato="moeda" />);
  fireEvent.pointerEnter(container.querySelectorAll("svg g")[0]);
  const textos = [...container.querySelectorAll("svg text")].map((t) => t.textContent);
  expect(textos).toContain("R$ 4.000,00");
});
