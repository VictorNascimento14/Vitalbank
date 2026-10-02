import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { listarCarteira } from "@/dados";
import { MeusInvestimentos, retornoComSinal } from "./MeusInvestimentos";

test("retorno com sinal", () => {
  expect(retornoComSinal(1600)).toBe("+16%");
  expect(retornoComSinal(-400)).toBe("-4%");
  expect(retornoComSinal(0)).toBe("0%");
});

test("cada aplicação com valor e retorno colorido", async () => {
  render(<MeusInvestimentos carteira={await listarCarteira()} />);
  const [pomar, galaxia] = screen.getAllByRole("listitem");
  expect(within(pomar).getByText(/R\$\s54\.000,00/)).toBeInTheDocument();
  expect(within(pomar).getByText("+16%")).toHaveClass("text-sucesso");
  expect(within(galaxia).getByText("-4%")).toHaveClass("text-perigo");
});
