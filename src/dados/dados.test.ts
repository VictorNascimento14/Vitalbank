import { describe, expect, test } from "vitest";
import { passaNoLuhn } from "@/dominio/cartao";
import { lerData } from "@/dominio/datas";
import { listarCartoes, listarTransacoes } from ".";

describe("cartões", () => {
  test("só guardam início e final, de 4 dígitos", async () => {
    for (const c of await listarCartoes()) {
      expect(c.inicio).toMatch(/^\d{4}$/);
      expect(c.final).toMatch(/^\d{4}$/);
      expect(Object.keys(c)).not.toContain("numero");
    }
  });

  test("saldo em centavos inteiros", async () => {
    for (const c of await listarCartoes()) expect(Number.isInteger(c.saldo)).toBe(true);
  });

  test("nenhum texto da semente passa no Luhn como número de cartão", async () => {
    const texto = JSON.stringify([await listarCartoes(), await listarTransacoes()]);
    for (const seq of texto.match(/\d{13,19}/g) ?? []) expect(passaNoLuhn(seq)).toBe(false);
  });
});

describe("transações", () => {
  test("datas válidas, do mais recente para o mais antigo", async () => {
    const lista = await listarTransacoes();
    const tempos = lista.map((t) => lerData(t.data).getTime());
    expect(tempos).toEqual([...tempos].sort((a, b) => b - a));
  });

  test("valores inteiros e diferentes de zero", async () => {
    for (const t of await listarTransacoes()) {
      expect(Number.isInteger(t.valor)).toBe(true);
      expect(t.valor).not.toBe(0);
    }
  });

  test("o cartão de cada transação existe", async () => {
    const finais = new Set((await listarCartoes()).map((c) => c.final));
    for (const t of await listarTransacoes()) expect(finais).toContain(t.cartao);
  });

  test("códigos únicos no formato do extrato", async () => {
    const codigos = (await listarTransacoes()).map((t) => t.codigo);
    for (const c of codigos) expect(c).toMatch(/^#\d{8}$/);
    expect(new Set(codigos).size).toBe(codigos.length);
  });

  test("limite corta a lista", async () => {
    expect(await listarTransacoes({ limite: 3 })).toHaveLength(3);
  });
});

test("atividade semanal: sete dias seguidos, valores inteiros", async () => {
  const { atividadeSemanal } = await import(".");
  const dias = await atividadeSemanal();
  expect(dias).toHaveLength(7);
  for (let i = 1; i < dias.length; i++) {
    expect(lerData(dias[i].dia).getTime() - lerData(dias[i - 1].dia).getTime()).toBe(86_400_000);
  }
  for (const d of dias) expect(Number.isInteger(d.entradas) && Number.isInteger(d.saidas)).toBe(true);
});
