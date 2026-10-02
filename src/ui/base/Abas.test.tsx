import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Abas } from "..";

const abas = [
  { id: "todas", rotulo: "Todas", conteudo: <p>todas as transações</p> },
  { id: "entradas", rotulo: "Entradas", conteudo: <p>só entradas</p> },
  { id: "saidas", rotulo: "Saídas", conteudo: <p>só saídas</p> },
];

test("a primeira aba começa ativa e mostra o painel dela", () => {
  render(<Abas rotulo="Transações" abas={abas} />);
  expect(screen.getByRole("tab", { name: "Todas" })).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tabpanel")).toHaveTextContent("todas as transações");
});

test("clique troca a aba", async () => {
  render(<Abas rotulo="Transações" abas={abas} />);
  await userEvent.click(screen.getByRole("tab", { name: "Saídas" }));
  expect(screen.getByRole("tab", { name: "Saídas" })).toHaveAttribute("aria-selected", "true");
  expect(await screen.findByText("só saídas")).toBeInTheDocument();
});

test("setas andam em círculo e só a aba ativa entra no Tab", async () => {
  render(<Abas rotulo="Transações" abas={abas} />);
  await userEvent.tab();
  expect(screen.getByRole("tab", { name: "Todas" })).toHaveFocus();
  await userEvent.keyboard("{ArrowLeft}");
  expect(screen.getByRole("tab", { name: "Saídas" })).toHaveFocus();
  expect(screen.getByRole("tab", { name: "Saídas" })).toHaveAttribute("aria-selected", "true");
  expect(screen.getByRole("tab", { name: "Todas" })).toHaveAttribute("tabindex", "-1");
  await userEvent.keyboard("{Home}");
  expect(screen.getByRole("tab", { name: "Todas" })).toHaveFocus();
});
