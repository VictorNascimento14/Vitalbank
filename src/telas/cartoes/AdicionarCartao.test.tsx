import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { passaNoLuhn } from "@/dominio/cartao";
import { AdicionarCartao, mascararValidade, validarNovoCartao } from "./AdicionarCartao";

/** Número com verificador calculado aqui — nada de número fixo. */
function numeroValido(): string {
  const base = "400000000000000";
  for (let d = 0; d <= 9; d++) if (passaNoLuhn(base + d)) return base + d;
  throw new Error("inalcançável");
}

test("mascararValidade", () => {
  expect(mascararValidade("1")).toBe("1");
  expect(mascararValidade("122")).toBe("12/2");
  expect(mascararValidade("12/289")).toBe("12/28");
});

describe("validarNovoCartao", () => {
  const hoje = new Date(2026, 9, 2);
  test("tudo certo, nenhum erro", () => {
    expect(validarNovoCartao({ nome: "Cliente Exemplo", numero: numeroValido(), validade: "10/27" }, hoje)).toEqual({});
  });
  test("campo vazio pede o dado; preenchido errado explica", () => {
    expect(validarNovoCartao({ nome: "Cliente", numero: "", validade: "" }, hoje)).toEqual({
      numero: "Informe o número do cartão.",
      validade: "Informe a validade (MM/AA).",
    });
  });
  test("aponta cada campo errado", () => {
    expect(Object.keys(validarNovoCartao({ nome: "a", numero: "1234", validade: "01/20" }, hoje)).sort()).toEqual([
      "nome",
      "numero",
      "validade",
    ]);
  });
});

test("envio válido confirma pelo final e esquece o número", async () => {
  render(<AdicionarCartao />);
  await userEvent.type(screen.getByRole("textbox", { name: "Nome no cartão" }), "Cliente Exemplo");
  const numero = screen.getByRole("textbox", { name: "Número do cartão" });
  await userEvent.type(numero, numeroValido());
  expect(numero).toHaveValue("4000 0000 0000 000" + numeroValido().at(-1));
  await userEvent.type(screen.getByRole("textbox", { name: "Validade" }), "1230");
  await userEvent.click(screen.getByRole("button", { name: "Adicionar cartão" }));
  expect(screen.getByRole("status")).toHaveTextContent(`Cartão final 000${numeroValido().at(-1)} adicionado`);
  expect(numero).toHaveValue("");
});

test("envio inválido mostra os erros nos campos", async () => {
  render(<AdicionarCartao />);
  await userEvent.click(screen.getByRole("button", { name: "Adicionar cartão" }));
  expect(screen.getByRole("textbox", { name: "Número do cartão" })).toHaveAttribute("aria-invalid", "true");
  expect(screen.queryByRole("status")).toBeNull();
});
