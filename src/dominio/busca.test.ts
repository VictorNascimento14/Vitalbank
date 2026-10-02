import { expect, test } from "vitest";
import { buscar, normalizar, type ItemDeBusca } from "./busca";

const itens: ItemDeBusca[] = [
  { tipo: "tela", titulo: "Transações", detalhe: "Extrato e despesas", href: "/transacoes" },
  { tipo: "transacao", titulo: "Supermercado", detalhe: "#12548709 · -R$ 327,90", href: "/transacoes" },
  { tipo: "servico", titulo: "Poupança", detalhe: "Rende todo dia", href: "/servicos" },
  { tipo: "transacao", titulo: "Transferência para Wilson", detalhe: "#12548707", href: "/transacoes" },
];

test("normalizar tira acento e maiúscula", () => {
  expect(normalizar("  Transações  ")).toBe("transacoes");
});

test("acha sem acento", () => {
  expect(buscar(itens, "poupanca").map((i) => i.titulo)).toEqual(["Poupança"]);
});

test("todas as palavras precisam aparecer", () => {
  expect(buscar(itens, "transf wilson").map((i) => i.titulo)).toEqual(["Transferência para Wilson"]);
  expect(buscar(itens, "transf poupanca")).toEqual([]);
});

test("acha pelo detalhe (código da transação)", () => {
  expect(buscar(itens, "12548709").map((i) => i.titulo)).toEqual(["Supermercado"]);
});

test("título que começa com o termo vem primeiro", () => {
  expect(buscar(itens, "trans").map((i) => i.titulo)).toEqual(["Transações", "Transferência para Wilson"]);
});

test("termo vazio não traz nada", () => {
  expect(buscar(itens, "   ")).toEqual([]);
});
