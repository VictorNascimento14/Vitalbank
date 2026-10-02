import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { listarTransacoes } from "@/dados";
import { UltimaTransacao } from "./UltimaTransacao";

test("cada linha traz tipo, cartão, situação e valor", async () => {
  const lista = (await listarTransacoes()).filter((t) => ["t04", "t06", "t08"].includes(t.id));
  render(<UltimaTransacao transacoes={lista} />);
  const [assinatura, celular, reembolso] = screen.getAllByRole("listitem");
  expect(within(assinatura).getByText("Assinatura")).toBeInTheDocument();
  expect(within(assinatura).getByText("Pendente")).toBeInTheDocument();
  expect(within(celular).getByText("Concluída")).toBeInTheDocument();
  expect(within(reembolso).getByText("•••• 5600")).toBeInTheDocument();
  expect(within(reembolso).getByText(/^\+R\$\s840,00$/)).toHaveClass("text-sucesso");
});
