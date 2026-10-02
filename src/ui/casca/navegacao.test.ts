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

test("metadadosDaTela dá o título da aba e recusa rota desconhecida", async () => {
  const { metadadosDaTela } = await import("./navegacao");
  expect(metadadosDaTela("/cartoes")).toEqual({ title: "Cartões de crédito" });
  expect(() => metadadosDaTela("/x")).toThrow();
});
