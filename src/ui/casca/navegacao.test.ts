import { expect, test } from "vitest";
import { itemAtivo, NAVEGACAO } from "./navegacao";

test.each([
  ["/", "/"],
  ["/transacoes", "/transacoes"],
  ["/cartoes/", "/cartoes"],
  ["/configuracoes/seguranca", "/configuracoes"],
])("%s ativa %s", (caminho, rota) => {
  expect(itemAtivo(caminho)?.rota).toBe(rota);
});

test("rota desconhecida não ativa nada (e '/x' não ativa a visão geral)", () => {
  expect(itemAtivo("/x")).toBeUndefined();
});

test("as rotas são únicas", () => {
  expect(new Set(NAVEGACAO.map((i) => i.rota)).size).toBe(NAVEGACAO.length);
});
