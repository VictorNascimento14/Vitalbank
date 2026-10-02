import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { debitoECredito } from "@/dados";
import { DebitoECredito } from "./DebitoECredito";

test("a frase soma a semana", async () => {
  render(<DebitoECredito dias={await debitoECredito()} />);
  expect(screen.getByText(/debitados e/).textContent).toMatch(
    /R\$\s7\.560,00 debitados e R\$\s8\.420,00 creditados nesta semana/,
  );
  expect(screen.getByRole("table", { name: /Débitos e créditos/ })).toBeInTheDocument();
});
