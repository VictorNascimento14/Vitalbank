import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { despesasPorCategoria } from "@/dados";
import { EstatisticaDeDespesas } from "./EstatisticaDeDespesas";

test("as quatro categorias com o percentual do total", async () => {
  render(<EstatisticaDeDespesas despesas={await despesasPorCategoria()} />);
  expect(
    screen.getByText("Despesas do mês por categoria: Lazer 30%, Contas 15%, Investimento 20%, Outros 35%"),
  ).toBeInTheDocument();
});
