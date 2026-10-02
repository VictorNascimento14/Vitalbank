import { expect, test } from "vitest";
import { listarCartoes, listarTransacoes } from "@/dados";
import { gastoPorCartao } from "./GastoPorCartao";

test("soma só as saídas de cada cartão, em valor positivo", async () => {
  const gastos = gastoPorCartao(await listarCartoes(), await listarTransacoes());
  expect(gastos.map((g) => g.final)).toEqual(["1234", "5600", "7560"]);
  // 7560: supermercado 327,90 + passagem 1.249,00 + restaurante 156,80
  expect(gastos[2].gasto).toBe(32790 + 124900 + 15680);
  for (const g of gastos) expect(g.gasto).toBeGreaterThan(0);
});
