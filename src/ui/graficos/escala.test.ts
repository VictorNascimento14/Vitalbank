import { describe, expect, test } from "vitest";
import { caminhoSuave, escalaLinear, marcasDoEixo } from "./escala";

test("escalaLinear leva o domínio para a faixa", () => {
  const y = escalaLinear([0, 500], [200, 0]);
  expect(y(0)).toBe(200);
  expect(y(500)).toBe(0);
  expect(y(250)).toBe(100);
  expect(escalaLinear([3, 3], [0, 10])(3)).toBe(0);
});

describe("marcasDoEixo", () => {
  test.each([
    [480, [0, 100, 200, 300, 400, 500]],
    [800, [0, 200, 400, 600, 800]],
    [40000, [0, 10000, 20000, 30000, 40000]],
    [7, [0, 2, 4, 6, 8]],
    [0, [0, 1]],
  ])("%d → %j", (max, esperado) => {
    expect(marcasDoEixo(max)).toEqual(esperado);
  });
});

describe("caminhoSuave", () => {
  test("passa por todos os pontos", () => {
    const d = caminhoSuave([
      { x: 0, y: 10 },
      { x: 10, y: 0 },
      { x: 20, y: 5 },
    ]);
    expect(d.startsWith("M0,10")).toBe(true);
    expect(d).toContain("10,0 C");
    expect(d.endsWith("20,5")).toBe(true);
  });

  test("no pico, a tangente é plana: a curva não passa do valor", () => {
    const d = caminhoSuave([
      { x: 0, y: 10 },
      { x: 10, y: 0 },
      { x: 20, y: 10 },
    ]);
    // controles em volta do pico (10,0) têm y = 0
    expect(d).toContain("6.67,0 10,0");
    expect(d).toContain("C13.33,0");
  });

  test("casos curtos", () => {
    expect(caminhoSuave([])).toBe("");
    expect(caminhoSuave([{ x: 1, y: 2 }])).toBe("M1,2");
  });
});
