import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { formatarNumero } from "@/dominio/numero";
import { NumeroAnimado } from "./NumeroAnimado";

const nbsp = (t: string) => t.replace(/ /g, " ");

describe("formatarNumero", () => {
  test.each([
    [575600, "moeda", nbsp("R$ 5.756,00")],
    [15000000, "moeda-compacta", nbsp("R$ 150 mil")],
    [1250, "inteiro", "1.250"],
    [580, "percentual", "5,8%"],
    [1234.6, "inteiro", "1.235"],
  ] as const)("%d como %s → %s", (valor, formato, esperado) => {
    expect(formatarNumero(valor, formato)).toBe(esperado);
  });
});

test("o leitor de tela lê só o valor final, uma vez", () => {
  const { container } = render(<NumeroAnimado valor={1275000} formato="moeda" />);
  // O Testing Library normaliza espaço (inclusive o não separável) antes de comparar.
  const lido = screen.getByText("R$ 12.750,00", { selector: ".sr-only" });
  expect(lido).toBeInTheDocument();
  expect(container.querySelector("[aria-hidden='true']")).toHaveTextContent("R$ 12.750,00");
});
