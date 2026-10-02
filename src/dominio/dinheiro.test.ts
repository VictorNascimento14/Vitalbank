import { describe, expect, test } from "vitest";
import { formatarMoeda, paraCentavos, somarCentavos } from "./dinheiro";

// O Intl separa "R$" do número com espaço não separável (U+00A0).
const nbsp = (texto: string) => texto.replace(/ /g, " ");

describe("formatarMoeda", () => {
  test("formata centavos em reais", () => {
    expect(formatarMoeda(575600)).toBe(nbsp("R$ 5.756,00"));
    expect(formatarMoeda(5)).toBe(nbsp("R$ 0,05"));
  });

  test("valor negativo leva o sinal de menos", () => {
    expect(formatarMoeda(-85000)).toBe(nbsp("-R$ 850,00"));
  });

  test("com sinal, entrada ganha +", () => {
    expect(formatarMoeda(250000, { sinal: true })).toBe(nbsp("+R$ 2.500,00"));
    expect(formatarMoeda(0, { sinal: true })).toBe(nbsp("R$ 0,00"));
  });

  test('compacto encurta valores grandes, sem ",0" sobrando', () => {
    expect(formatarMoeda(15000000, { compacto: true })).toBe(nbsp("R$ 150 mil"));
    expect(formatarMoeda(120000, { compacto: true })).toBe(nbsp("R$ 1,2 mil"));
  });

  test("recusa valor que não é inteiro", () => {
    expect(() => formatarMoeda(10.5)).toThrow(TypeError);
  });
});

test("somarCentavos não perde centavo", () => {
  // Em reais com float, 0,1 + 0,2 dá 0,30000000000000004.
  expect(somarCentavos([10, 20])).toBe(30);
  expect(somarCentavos([])).toBe(0);
});

describe("paraCentavos", () => {
  test.each([
    ["1.234,56", 123456],
    ["R$ 10", 1000],
    ["0,5", 50],
    ["525,50", 52550],
    ["-12,30", -1230],
  ])("%s → %i", (texto, esperado) => {
    expect(paraCentavos(texto)).toBe(esperado);
  });

  test.each(["", "abc", "1,234", "12.34", "1.23,00"])("recusa %j", (texto) => {
    expect(paraCentavos(texto)).toBeNull();
  });
});
