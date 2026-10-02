import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { listarTransacoes } from "@/dados";
import { TabelaDeTransacoes } from "./TabelaDeTransacoes";

test("tabela com cabeçalhos e uma linha por transação", async () => {
  render(<TabelaDeTransacoes transacoes={await listarTransacoes({ limite: 5 })} />);
  const tabela = screen.getByRole("table", { name: "Transações" });
  const cabecalhos = within(tabela)
    .getAllByRole("columnheader")
    .map((c) => c.textContent);
  expect(cabecalhos).toEqual(["Descrição", "Código", "Tipo", "Cartão", "Data", "Valor"]);
  const linhas = within(tabela).getAllByRole("row").slice(1);
  expect(linhas).toHaveLength(5);
  expect(within(linhas[0]).getByText("Fatura do cartão")).toBeInTheDocument();
  expect(within(linhas[0]).getByText("#12548701")).toBeInTheDocument();
  expect(within(linhas[0]).getByText("•••• 1234")).toBeInTheDocument();
  expect(within(linhas[0]).getByText("28 set, 09:12")).toBeInTheDocument();
});

test("coluna de recibo só com ação", async () => {
  render(
    <TabelaDeTransacoes transacoes={await listarTransacoes({ limite: 1 })} acao={() => <button>Baixar</button>} />,
  );
  expect(screen.getByRole("columnheader", { name: "Recibo" })).toBeInTheDocument();
});

test("lista vazia explica", () => {
  render(<TabelaDeTransacoes transacoes={[]} />);
  expect(screen.getByText("Nenhuma transação aqui.")).toBeInTheDocument();
});
