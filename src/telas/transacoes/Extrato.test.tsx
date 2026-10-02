import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { listarTransacoes } from "@/dados";
import { Extrato } from "./Extrato";

const linhas = () => within(screen.getByRole("table", { name: "Transações" })).getAllByRole("row").slice(1);

test("cinco por página, quatro páginas para vinte transações", async () => {
  render(<Extrato transacoes={await listarTransacoes()} />);
  expect(linhas()).toHaveLength(5);
  expect(screen.getAllByRole("button", { name: /^Página \d$/ })).toHaveLength(4);
});

test("a página 2 traz as cinco seguintes", async () => {
  render(<Extrato transacoes={await listarTransacoes()} />);
  await userEvent.click(screen.getByRole("button", { name: "Página 2" }));
  expect(within(linhas()[0]).getByText("Plano de celular")).toBeInTheDocument();
});

test("a aba Entradas só tem valores positivos e volta para a página 1", async () => {
  render(<Extrato transacoes={await listarTransacoes()} />);
  await userEvent.click(screen.getByRole("button", { name: "Página 3" }));
  await userEvent.click(screen.getByRole("tab", { name: "Entradas" }));
  // o painel troca depois da animação de saída da aba anterior
  await waitFor(() => expect(screen.getByRole("button", { name: "Página 1" })).toHaveAttribute("aria-current", "page"));
  for (const l of linhas()) expect(l).toHaveTextContent(/\+R\$/);
});
