import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { ConfiguracoesDoCartao } from "./ConfiguracoesDoCartao";

test("bloquear o cartão muda o aviso da linha", async () => {
  render(<ConfiguracoesDoCartao />);
  await userEvent.click(screen.getByRole("switch", { name: "Bloquear cartão" }));
  expect(screen.getByText("Bloqueado: compras recusadas")).toBeInTheDocument();
});

test("adicionar a uma carteira confirma e desliga o botão", async () => {
  render(<ConfiguracoesDoCartao />);
  await userEvent.click(screen.getByRole("button", { name: "Adicionar ao Google Pay" }));
  expect(screen.getByRole("button", { name: "Adicionado ao Google Pay" })).toBeDisabled();
});
