import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { programaDePontos } from "@/dados";
import { Beneficios } from "./Beneficios";
import { NivelAtual } from "./NivelAtual";

test("nível Ouro, pontos e o caminho até o Diamante", async () => {
  render(<NivelAtual programa={await programaDePontos()} />);
  // "Ouro" aparece como nível e como início da barra
  expect(screen.getAllByText("Ouro")).toHaveLength(2);
  expect(screen.getByText("12.480", { selector: ".sr-only" })).toBeInTheDocument();
  expect(screen.getByRole("progressbar", { name: "Caminho até o Diamante" })).toHaveAttribute("aria-valuenow", "50");
});

test("benefícios até o Ouro ativos; os do Diamante trancados", async () => {
  render(<Beneficios programa={await programaDePontos()} />);
  const itens = screen.getAllByRole("listitem");
  expect(within(itens[2]).getByText("Ativo")).toBeInTheDocument();
  expect(within(itens[4]).getByText("Diamante")).toBeInTheDocument();
});
