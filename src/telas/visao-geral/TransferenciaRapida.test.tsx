import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { listarContatos } from "@/dados";
import { TransferenciaRapida } from "./TransferenciaRapida";

test("mostra três contatos e anda com a seta", async () => {
  render(<TransferenciaRapida contatos={await listarContatos()} />);
  expect(screen.getAllByRole("button", { pressed: false }).length + 1).toBe(3);
  expect(screen.getByRole("button", { pressed: true })).toHaveTextContent("Lívia");
  await userEvent.click(screen.getByRole("button", { name: "Mais contatos" }));
  expect(await screen.findByText("Joana")).toBeInTheDocument();
});

test("escolher um contato e enviar confirma na tela", async () => {
  render(<TransferenciaRapida contatos={await listarContatos()} />);
  await userEvent.click(screen.getByRole("button", { name: /Rafael/ }));
  await userEvent.click(screen.getByRole("button", { name: /Enviar/ }));
  expect(screen.getByRole("status")).toHaveTextContent(/R\$\s525,50 para Rafael Prado — demonstração/);
});

test("valor inválido não envia e explica", async () => {
  render(<TransferenciaRapida contatos={await listarContatos()} />);
  const campo = screen.getByRole("textbox", { name: "Valor em reais" });
  await userEvent.clear(campo);
  await userEvent.type(campo, "abc");
  await userEvent.click(screen.getByRole("button", { name: /Enviar/ }));
  expect(campo).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("status")).toHaveTextContent("Digite um valor, como 525,50.");
});

test("quem é enviado está sempre à vista: ao avançar, a escolha acompanha", async () => {
  render(<TransferenciaRapida contatos={await listarContatos()} />);
  await userEvent.click(screen.getByRole("button", { name: "Mais contatos" }));
  expect(screen.getByRole("button", { pressed: true })).toHaveTextContent("Rafael");
});
