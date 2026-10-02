import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Bloco, TituloDeSecao } from "..";

test("TituloDeSecao é um h2 com a ação ao lado", () => {
  render(<TituloDeSecao acao={<a href="#">Ver todos</a>}>Meus cartões</TituloDeSecao>);
  expect(screen.getByRole("heading", { level: 2, name: "Meus cartões" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Ver todos" })).toBeInTheDocument();
});

test("Bloco repassa atributos e junta classes", () => {
  render(<Bloco aria-label="resumo" className="extra" />);
  const bloco = screen.getByLabelText("resumo");
  expect(bloco).toHaveClass("rounded-cartao", "bg-superficie", "extra");
});

test("Bloco colado não tem respiro interno", () => {
  render(<Bloco aria-label="tabela" colado />);
  expect(screen.getByLabelText("tabela").className).not.toMatch(/\bp-5\b/);
});
