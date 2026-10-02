import { describe, expect, test } from "vitest";
import { agruparDigitos, finalDoCartao, mascararCartao, passaNoLuhn, validadeEmDia } from "./cartao";

/** Completa 15 dígitos com o verificador de Luhn — nada de número fixo no teste. */
function comVerificador(quinze: string): string {
  for (let d = 0; d <= 9; d++) if (passaNoLuhn(quinze + d)) return quinze + d;
  throw new Error("inalcançável");
}

test("mascararCartao mostra só o final", () => {
  expect(mascararCartao("1234")).toBe("•••• •••• •••• 1234");
  expect(mascararCartao("1234", "3778")).toBe("3778 •••• •••• 1234");
  expect(() => mascararCartao("12345")).toThrow(RangeError);
});

test("finalDoCartao", () => {
  expect(finalDoCartao("5600")).toBe("•••• 5600");
});

test("agruparDigitos agrupa de 4 em 4 e corta em 16", () => {
  expect(agruparDigitos("4111111")).toBe("4111 111");
  expect(agruparDigitos("12a3 4")).toBe("1234");
  expect(agruparDigitos("1".repeat(20))).toBe("1111 1111 1111 1111");
});

describe("passaNoLuhn", () => {
  test("aceita número com verificador certo", () => {
    expect(passaNoLuhn(comVerificador("123456789012345"))).toBe(true);
  });
  test("recusa um dígito trocado", () => {
    const valido = comVerificador("987654321098765");
    const trocado = valido.slice(0, -1) + ((Number(valido.at(-1)) + 1) % 10);
    expect(passaNoLuhn(trocado)).toBe(false);
  });
  test("recusa tamanho fora de 13–19", () => {
    expect(passaNoLuhn("0")).toBe(false);
  });
});

describe("validadeEmDia", () => {
  const hoje = new Date(2026, 9, 2);
  test.each([
    ["10/26", true],
    ["09/26", false],
    ["01/27", true],
    ["13/27", false],
    ["1/27", false],
  ])("%s → %s", (validade, esperado) => {
    expect(validadeEmDia(validade, hoje)).toBe(esperado);
  });
});
