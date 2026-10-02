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

  test("limite corta a lista", async () => {
    expect(await listarTransacoes({ limite: 3 })).toHaveLength(3);
  });
});
