import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";
import { AlternadorDeTema } from "./AlternadorDeTema";
import { CHAVE_DO_TEMA } from "./tema";

afterEach(() => {
  delete document.documentElement.dataset.tema;
  localStorage.clear();
});

test("alterna entre claro e escuro, marca o <html> e guarda a escolha", async () => {
  render(<AlternadorDeTema />);
  await userEvent.click(await screen.findByRole("button", { name: "Usar tema escuro" }));
  expect(document.documentElement.dataset.tema).toBe("escuro");
  expect(localStorage.getItem(CHAVE_DO_TEMA)).toBe("escuro");
  await userEvent.click(await screen.findByRole("button", { name: "Usar tema claro" }));
  expect(document.documentElement.dataset.tema).toBe("claro");
});
