import { expect, test } from "vitest";
import { listarTransacoes } from "@/dados";
import { nomeDoRecibo, textoDoRecibo } from "./recibo";

test("o recibo traz código, valor e só o final do cartão", async () => {
  const [t] = await listarTransacoes({ limite: 1 });
  const texto = textoDoRecibo(t, "Serviço");
  expect(texto).toContain("Código:     #12548701");
  expect(texto).toContain("Cartão:     •••• 1234");
  expect(texto).toContain("Data:       28 de setembro de 2026, 09:12");
  expect(texto).toMatch(/Valor:\s+-R\$\s850,00/);
  expect(texto).toContain("sem valor fiscal");
  expect(nomeDoRecibo(t)).toBe("recibo-12548701.txt");
});
