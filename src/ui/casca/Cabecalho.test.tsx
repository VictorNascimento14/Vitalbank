import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Cabecalho } from "..";

vi.mock("next/navigation", () => ({ usePathname: () => "/investimentos" }));

test("o título é o da tela aberta", () => {
  render(<Cabecalho nomeDoCliente="Cliente Exemplo" />);
  expect(screen.getByRole("heading", { level: 1, name: "Investimentos" })).toBeInTheDocument();
});

test("o botão de menu chama a gaveta", async () => {
  const abrir = vi.fn();
  render(<Cabecalho nomeDoCliente="Cliente Exemplo" aoAbrirMenu={abrir} />);
  await userEvent.click(screen.getByRole("button", { name: "Abrir menu" }));
  expect(abrir).toHaveBeenCalledOnce();
});

test("configurações tem nome acessível", () => {
  render(<Cabecalho nomeDoCliente="Cliente Exemplo" />);
  expect(screen.getByRole("link", { name: "Configurações" })).toHaveAttribute("href", "/configuracoes");
  // o sino vem de fora (slot `notificacoes`)
});
