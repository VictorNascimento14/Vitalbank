import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";
import { BotaoOcultarValores } from "./BotaoOcultarValores";
import { CHAVE_DE_OCULTAR } from "./ocultar";

afterEach(() => {
  document.documentElement.removeAttribute("data-ocultar");
  localStorage.clear();
});

test("liga e desliga o ocultar, marca o <html> e guarda a escolha", async () => {
  render(<BotaoOcultarValores />);
  const botao = screen.getByRole("button", { name: "Ocultar valores" });
  expect(botao).toHaveAttribute("aria-pressed", "false");
  await userEvent.click(botao);
  expect(document.documentElement).toHaveAttribute("data-ocultar");
  expect(localStorage.getItem(CHAVE_DE_OCULTAR)).toBe("sim");
  expect(botao).toHaveAttribute("aria-pressed", "true");
  await userEvent.click(botao);
  expect(document.documentElement).not.toHaveAttribute("data-ocultar");
  expect(localStorage.getItem(CHAVE_DE_OCULTAR)).toBeNull();
});
