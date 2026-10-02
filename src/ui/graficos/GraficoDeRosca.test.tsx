import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { GraficoDeRosca } from "..";

const arcos = [
  { nome: "•••• 1234", valor: 30000, cor: "azul" },
  { nome: "•••• 5600", valor: 10000, cor: "turquesa" },
];

test("legenda com valor e parte para o leitor de tela", () => {
  render(<GraficoDeRosca titulo="Gasto por cartão" arcos={arcos} />);
  expect(screen.getByText(/R\$\s300,00 \(75%\)/)).toBeInTheDocument();
  expect(screen.getByText("Gasto por cartão")).toBeInTheDocument();
});

test("passar o mouse na legenda mostra a parte no centro", () => {
  const { container } = render(<GraficoDeRosca titulo="Gasto por cartão" arcos={arcos} />);
  fireEvent.pointerEnter(screen.getAllByRole("listitem")[1]);
  expect(container.querySelector("[aria-hidden='true'] p")).toHaveTextContent("25%");
});
