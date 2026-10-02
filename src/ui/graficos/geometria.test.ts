import { expect, test } from "vitest";
import { fatias, noCirculo, setor } from "./geometria";

test("noCirculo: 0 rad é 12 horas, π/2 é 3 horas", () => {
  expect(noCirculo(0, 0, 10, 0)).toEqual({ x: 0, y: -10 });
  const tres = noCirculo(0, 0, 10, Math.PI / 2);
  expect(tres.x).toBeCloseTo(10);
  expect(tres.y).toBeCloseTo(0);
});

test("fatias dividem a volta pelos valores", () => {
  const f = fatias([30, 15, 20, 35]);
  expect(f.map((x) => x.fracao)).toEqual([0.3, 0.15, 0.2, 0.35]);
  expect(f.at(-1)!.a1).toBeCloseTo(Math.PI * 2);
  expect(f[0].meio).toBeCloseTo(0.3 * Math.PI);
});

test("setor de pizza começa no centro; de rosca, não", () => {
  expect(setor(50, 50, 40, 0, Math.PI / 2)).toMatch(/^M50,50 L50,10 A40,40 0 0 1 90,50 Z$/);
  expect(setor(50, 50, 40, 0, Math.PI / 2, 20)).toMatch(/^M50,10 A40,40 .* L70,50 A20,20 0 0 0 50,30 Z$/);
});

test("arco grande acima de meia volta, e volta inteira em duas metades", () => {
  expect(setor(0, 0, 10, 0, Math.PI * 1.5)).toContain(" 0 1 1 ");
  expect(setor(0, 0, 10, 0, Math.PI * 2).match(/Z/g)).toHaveLength(2);
});
