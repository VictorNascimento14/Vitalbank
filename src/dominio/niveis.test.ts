import { expect, test } from "vitest";
import { beneficioLiberado, situacaoNoPrograma } from "./niveis";

const niveis = [
  { id: "prata", minimo: 0 },
  { id: "ouro", minimo: 10000 },
  { id: "diamante", minimo: 15000 },
];

test("no meio do Ouro, a caminho do Diamante", () => {
  const s = situacaoNoPrograma(niveis, 12480);
  expect(s.atual.id).toBe("ouro");
  expect(s.proximo?.id).toBe("diamante");
  expect(s.faltam).toBe(2520);
  expect(s.progresso).toBeCloseTo(0.496);
});

test("no topo não há próximo", () => {
  const s = situacaoNoPrograma(niveis, 20000);
  expect(s.atual.id).toBe("diamante");
  expect(s.proximo).toBeUndefined();
  expect(s.progresso).toBe(1);
});

test("benefício vale do próprio nível para baixo", () => {
  expect(beneficioLiberado(niveis, "prata", "ouro")).toBe(true);
  expect(beneficioLiberado(niveis, "ouro", "ouro")).toBe(true);
  expect(beneficioLiberado(niveis, "diamante", "ouro")).toBe(false);
});
