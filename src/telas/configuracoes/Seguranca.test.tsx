import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { Seguranca, validarTrocaDeSenha } from "./Seguranca";

describe("validarTrocaDeSenha", () => {
  test("tudo certo", () => {
    expect(validarTrocaDeSenha("antiga1", "casaverde1", "casaverde1")).toEqual({});
  });
  test("nova igual à atual", () => {
    expect(validarTrocaDeSenha("casaverde1", "casaverde1", "casaverde1").nova).toMatch(/diferente/);
  });
  test("confirmação diferente", () => {
    expect(validarTrocaDeSenha("antiga1", "casaverde1", "casaverde2").confirma).toMatch(/não são iguais/);
  });
});

test("o medidor diz a força da nova senha", async () => {
  render(<Seguranca />);
  await userEvent.type(screen.getByLabelText("Nova senha"), "Casaverde1!x");
  expect(screen.getByText("Forte")).toBeInTheDocument();
});

test("troca aceita apaga os campos e confirma", async () => {
  render(<Seguranca />);
  await userEvent.type(screen.getByLabelText("Senha atual"), "antiga1");
  await userEvent.type(screen.getByLabelText("Nova senha"), "Casaverde1");
  await userEvent.type(screen.getByLabelText("Confirme a nova senha"), "Casaverde1");
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByRole("status")).toHaveTextContent("Senha trocada");
  expect(screen.getByLabelText("Nova senha")).toHaveValue("");
});
