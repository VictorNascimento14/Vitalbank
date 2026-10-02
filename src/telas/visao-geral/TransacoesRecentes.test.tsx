import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { listarTransacoes } from "@/dados";
import { TransacoesRecentes } from "./TransacoesRecentes";

test("lista as transações com data média e valor com sinal", async () => {
  render(<TransacoesRecentes transacoes={await listarTransacoes({ limite: 3 })} />);
  const itens = screen.getAllByRole("listitem");
  expect(itens).toHaveLength(3);
  expect(within(itens[0]).getByText("Fatura do cartão")).toBeInTheDocument();
  expect(within(itens[0]).getByText("28 set 2026")).toBeInTheDocument();
  expect(within(itens[0]).getByText(/^-R\$\s850,00$/)).toHaveClass("text-perigo");
  expect(within(itens[1]).getByText(/^\+R\$\s2\.500,00$/)).toHaveClass("text-sucesso");
});
