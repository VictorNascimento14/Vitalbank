import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Transicao from "./template";

test("a transição entrega o conteúdo da tela", () => {
  render(
    <Transicao>
      <h2>Contas</h2>
    </Transicao>,
  );
  expect(screen.getByRole("heading", { name: "Contas" })).toBeInTheDocument();
});
