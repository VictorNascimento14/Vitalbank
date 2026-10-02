import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { GraficoDeBarras } from "..";

const props = {
  titulo: "Atividade semanal",
  categorias: ["sáb", "dom"],
  series: [
    { nome: "Depósito", cor: "turquesa", valores: [24000, 13000] },
    { nome: "Saque", cor: "primaria", valores: [48000, 35000] },
  ],
  formato: "moeda" as const,
};

test("o leitor de tela recebe a tabela com todos os valores", () => {
  render(<GraficoDeBarras {...props} />);
  const tabela = screen.getByRole("table", { name: "Atividade semanal" });
  const linhas = within(tabela).getAllByRole("row");
  expect(linhas).toHaveLength(3);
  expect(within(linhas[1]).getByRole("rowheader", { name: "sáb" })).toBeInTheDocument();
  expect(within(linhas[1]).getByText(/R\$\s240,00/)).toBeInTheDocument();
  expect(within(linhas[2]).getByText(/R\$\s350,00/)).toBeInTheDocument();
});

test("desenha uma barra por valor", () => {
  const { container } = render(<GraficoDeBarras {...props} />);
  expect(container.querySelectorAll("rect[fill^='var(--']")).toHaveLength(4);
});
