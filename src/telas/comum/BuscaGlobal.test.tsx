import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import type { ItemDeBusca } from "@/dominio/busca";
import { BuscaGlobal } from "./BuscaGlobal";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const itens: ItemDeBusca[] = [
  { tipo: "tela", titulo: "Transações", detalhe: "Tela", href: "/transacoes" },
  { tipo: "tela", titulo: "Contas", detalhe: "Tela", href: "/contas" },
  { tipo: "servico", titulo: "Poupança", detalhe: "Rende todo dia", href: "/servicos" },
];

test("clicar abre; digitar filtra; Enter vai para o resultado", async () => {
  render(<BuscaGlobal itens={itens} />);
  await userEvent.click(screen.getByRole("button", { name: /Buscar algo/ }));
  const campo = screen.getByRole("combobox", { name: /Buscar telas/ });
  expect(campo).toHaveFocus();
  await userEvent.type(campo, "poupanca");
  expect(screen.getAllByRole("option")).toHaveLength(1);
  await userEvent.keyboard("{Enter}");
  expect(push).toHaveBeenCalledWith("/servicos");
});

test("setas mudam a opção ativa", async () => {
  render(<BuscaGlobal itens={itens} />);
  await userEvent.click(screen.getByRole("button", { name: /Buscar algo/ }));
  expect(screen.getAllByRole("option")[0]).toHaveAttribute("aria-selected", "true");
  await userEvent.keyboard("{ArrowDown}");
  expect(screen.getAllByRole("option")[1]).toHaveAttribute("aria-selected", "true");
});

test("sem resultado, explica", async () => {
  render(<BuscaGlobal itens={itens} />);
  await userEvent.click(screen.getByRole("button", { name: /Buscar algo/ }));
  await userEvent.type(screen.getByRole("combobox"), "xyz");
  expect(screen.getByText(/Nada encontrado/)).toBeInTheDocument();
});
