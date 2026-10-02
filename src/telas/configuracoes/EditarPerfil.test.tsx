import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { obterPerfil } from "@/dados";
import { EditarPerfil, validarPerfil } from "./EditarPerfil";

test("o perfil de exemplo é válido", async () => {
  expect(validarPerfil(await obterPerfil())).toEqual({});
});

test("e-mail inválido não salva e explica", async () => {
  render(<EditarPerfil perfil={await obterPerfil()} />);
  const email = screen.getByRole("textbox", { name: "E-mail" });
  await userEvent.clear(email);
  await userEvent.type(email, "cliente@");
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(email).toHaveAttribute("aria-invalid", "true");
  expect(screen.queryByRole("status")).toBeNull();
});

test("salvar válido confirma", async () => {
  render(<EditarPerfil perfil={await obterPerfil()} />);
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByRole("status")).toHaveTextContent("Perfil salvo");
});
