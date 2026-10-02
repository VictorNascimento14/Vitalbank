import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { listarServicos } from "@/dados";
import { ListaDeServicos } from "./ListaDeServicos";

test("seis serviços; Ver detalhes abre a descrição", async () => {
  render(<ListaDeServicos servicos={await listarServicos()} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(6);
  const [primeiro] = screen.getAllByRole("button", { name: "Ver detalhes" });
  await userEvent.click(primeiro);
  expect(primeiro).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText(/primeira para até 90 dias/)).toBeInTheDocument();
});
