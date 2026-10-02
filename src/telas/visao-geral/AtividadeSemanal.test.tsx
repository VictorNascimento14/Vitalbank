import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { atividadeSemanal } from "@/dados";
import { AtividadeSemanal } from "./AtividadeSemanal";

test("sete dias, de sábado a sexta, com entradas e saídas", async () => {
  render(<AtividadeSemanal dias={await atividadeSemanal()} />);
  const tabela = screen.getByRole("table", { name: /últimos 7 dias/ });
  const dias = within(tabela).getAllByRole("rowheader").map((c) => c.textContent);
  expect(dias).toEqual(["sáb", "dom", "seg", "ter", "qua", "qui", "sex"]);
  expect(within(tabela).getAllByRole("columnheader").map((c) => c.textContent)).toEqual([
    "Categoria",
    "Entradas",
    "Saídas",
  ]);
});
