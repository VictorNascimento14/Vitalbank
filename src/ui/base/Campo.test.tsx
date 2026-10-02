import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Campo } from "..";

test("o rótulo nomeia o campo", async () => {
  render(<Campo rotulo="Seu nome" placeholder="Cliente Exemplo" />);
  const campo = screen.getByRole("textbox", { name: "Seu nome" });
  await userEvent.type(campo, "Ana");
  expect(campo).toHaveValue("Ana");
});

test("erro marca o campo como inválido e é a descrição dele", () => {
  render(<Campo rotulo="E-mail" erro="Informe um e-mail válido" />);
  const campo = screen.getByRole("textbox", { name: "E-mail" });
  expect(campo).toHaveAttribute("aria-invalid", "true");
  expect(campo).toHaveAccessibleDescription("Informe um e-mail válido");
});

test("sem erro nem dica, nada de descrição", () => {
  render(<Campo rotulo="Cidade" />);
  expect(screen.getByRole("textbox", { name: "Cidade" })).not.toHaveAttribute("aria-describedby");
});
