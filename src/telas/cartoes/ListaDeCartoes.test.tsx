import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { listarCartoes } from "@/dados";
import { ListaDeCartoes } from "./ListaDeCartoes";

test("Ver detalhes abre a ficha do cartão e o botão diz Fechar", async () => {
  render(<ListaDeCartoes cartoes={await listarCartoes()} />);
  const [primeiro] = screen.getAllByRole("button", { name: /Ver detalhes/ });
  expect(primeiro).toHaveAttribute("aria-expanded", "false");
  await userEvent.click(primeiro);
  expect(primeiro).toHaveAttribute("aria-expanded", "true");
  expect(primeiro).toHaveTextContent("Fechar");
  const ficha = document.getElementById(primeiro.getAttribute("aria-controls")!)!;
  expect(ficha).toHaveTextContent("12/28");
  expect(ficha).toHaveTextContent(/R\$\s5\.756,00/);
});

test("só uma ficha aberta por vez", async () => {
  render(<ListaDeCartoes cartoes={await listarCartoes()} />);
  const botoes = screen.getAllByRole("button", { name: /Ver detalhes/ });
  await userEvent.click(botoes[0]);
  await userEvent.click(botoes[1]);
  expect(botoes[0]).toHaveAttribute("aria-expanded", "false");
  expect(botoes[1]).toHaveAttribute("aria-expanded", "true");
});
