import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { GraficoDeLinha } from "..";

const props = { titulo: "Saldo por mês", rotulos: ["jul", "ago", "set"], valores: [12000, 32000, 25000] };

test("tabela acessível com mês e valor", () => {
  render(<GraficoDeLinha {...props} formato="moeda" />);
  const tabela = screen.getByRole("table", { name: "Saldo por mês" });
  expect(within(tabela).getAllByRole("row")).toHaveLength(3);
  expect(within(tabela).getByText(/R\$\s320,00/)).toBeInTheDocument();
});

test("área e pontos são opcionais", () => {
  const { container, rerender } = render(<GraficoDeLinha {...props} />);
  expect(container.querySelectorAll("path")).toHaveLength(1);
  expect(container.querySelectorAll("circle")).toHaveLength(0);
  rerender(<GraficoDeLinha {...props} area pontos />);
  expect(container.querySelectorAll("path")).toHaveLength(2);
  expect(container.querySelectorAll("circle")).toHaveLength(3);
});

test("sem suavizar, a linha é feita de segmentos retos", () => {
  const { container } = render(<GraficoDeLinha {...props} suave={false} />);
  expect(container.querySelector("path")!.getAttribute("d")).not.toContain("C");
});
