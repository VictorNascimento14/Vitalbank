import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { historicoDeSaldo } from "@/dados";
import { HistoricoDeSaldo } from "./HistoricoDeSaldo";

test("doze meses, com o nome curto de cada um", async () => {
  render(<HistoricoDeSaldo meses={await historicoDeSaldo()} />);
  const tabela = screen.getByRole("table", { name: "Saldo no fim de cada mês" });
  const meses = within(tabela).getAllByRole("rowheader").map((c) => c.textContent);
  expect(meses).toHaveLength(12);
  expect(meses.slice(0, 3)).toEqual(["abr", "mai", "jun"]);
});
