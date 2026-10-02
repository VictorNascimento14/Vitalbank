import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { acoesEmAlta } from "@/dados";
import { AcoesEmAlta } from "./AcoesEmAlta";

test("tabela numerada com preço e variação", async () => {
  render(<AcoesEmAlta acoes={await acoesEmAlta()} />);
  const tabela = screen.getByRole("table", { name: "Ações em alta hoje" });
  const linhas = within(tabela).getAllByRole("row").slice(1);
  expect(linhas).toHaveLength(5);
  expect(within(linhas[0]).getByText("01.")).toBeInTheDocument();
  expect(within(linhas[0]).getByRole("rowheader", { name: "Trívia" })).toBeInTheDocument();
  expect(within(linhas[2]).getByText("-3%")).toHaveClass("text-perigo");
});
