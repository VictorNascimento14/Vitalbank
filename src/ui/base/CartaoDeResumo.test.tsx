import { RiWallet3Fill } from "@remixicon/react";
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { CartaoDeResumo } from "..";

test("rótulo e valor (lido uma vez pelo leitor de tela)", () => {
  render(<CartaoDeResumo rotulo="Meu saldo" valor={1275000} tom="amarelo" icone={<RiWallet3Fill />} />);
  expect(screen.getByText("Meu saldo")).toBeInTheDocument();
  expect(screen.getByText("R$ 12.750,00", { selector: ".sr-only" })).toBeInTheDocument();
});

test("aceita texto no lugar de número", () => {
  render(<CartaoDeResumo rotulo="Personalizado" texto="Escolha o valor" tom="turquesa" icone={<RiWallet3Fill />} />);
  expect(screen.getByText("Escolha o valor")).toBeInTheDocument();
});
