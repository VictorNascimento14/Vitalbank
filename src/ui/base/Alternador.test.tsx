import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Alternador } from "..";

test("liga e desliga pelo clique no rótulo", async () => {
  const aoMudar = vi.fn();
  render(<Alternador rotulo="Autenticação em dois fatores" aoMudar={aoMudar} />);
  const chave = screen.getByRole("switch", { name: "Autenticação em dois fatores" });
  expect(chave).not.toBeChecked();
  await userEvent.click(screen.getByText("Autenticação em dois fatores"));
  expect(chave).toBeChecked();
  expect(aoMudar).toHaveBeenLastCalledWith(true);
});

test("controlado: só muda quando quem usa muda", async () => {
  const aoMudar = vi.fn();
  render(<Alternador rotulo="Avisos" ligado={false} aoMudar={aoMudar} />);
  await userEvent.click(screen.getByRole("switch", { name: "Avisos" }));
  expect(aoMudar).toHaveBeenCalledWith(true);
  expect(screen.getByRole("switch", { name: "Avisos" })).not.toBeChecked();
});

test("funciona pelo teclado", async () => {
  render(<Alternador rotulo="Pedidos" />);
  await userEvent.tab();
  await userEvent.keyboard(" ");
  expect(screen.getByRole("switch", { name: "Pedidos" })).toBeChecked();
});
