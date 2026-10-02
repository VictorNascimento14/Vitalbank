import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { listarNotificacoes } from "@/dados";
import { Notificacoes } from "./Notificacoes";

test("o sino conta as não lidas e abre o painel", async () => {
  render(<Notificacoes itens={await listarNotificacoes()} />);
  const sino = screen.getByRole("button", { name: "Notificações, 3 não lidas" });
  await userEvent.click(sino);
  expect(sino).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("dialog", { name: "Notificações" })).toBeInTheDocument();
  expect(screen.getAllByLabelText("não lida")).toHaveLength(3);
});

test("marcar todas como lidas apaga o ponto", async () => {
  render(<Notificacoes itens={await listarNotificacoes()} />);
  await userEvent.click(screen.getByRole("button", { name: /Notificações, 3/ }));
  await userEvent.click(screen.getByRole("button", { name: "Marcar todas como lidas" }));
  expect(screen.getByRole("button", { name: "Notificações" })).toBeInTheDocument();
  expect(screen.queryAllByLabelText("não lida")).toHaveLength(0);
});

test("Esc fecha e devolve o foco ao sino", async () => {
  render(<Notificacoes itens={await listarNotificacoes()} />);
  const sino = screen.getByRole("button", { name: /Notificações/ });
  await userEvent.click(sino);
  await userEvent.keyboard("{Escape}");
  await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull());
  expect(sino).toHaveFocus();
});
