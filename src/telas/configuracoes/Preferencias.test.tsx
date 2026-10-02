import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Preferencias } from "./Preferencias";

test("moeda e fuso começam no Brasil, e os avisos no padrão", () => {
  render(<Preferencias />);
  expect(screen.getByRole("combobox", { name: "Moeda" })).toHaveValue("BRL");
  expect(screen.getByRole("combobox", { name: "Fuso horário" })).toHaveValue("America/Sao_Paulo");
  expect(screen.getByRole("switch", { name: "Quando uma loja confirmar um pedido" })).not.toBeChecked();
  expect(screen.getByRole("group", { name: "Avisos" })).toBeInTheDocument();
});

test("salvar confirma; mudar algo depois apaga a confirmação", async () => {
  render(<Preferencias />);
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(screen.getByRole("status")).toHaveTextContent("Preferências salvas");
  await userEvent.click(screen.getByRole("switch", { name: "Recomendações para a minha conta" }));
  await waitFor(() => expect(screen.queryByRole("status")).toBeNull());
});
