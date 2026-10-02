import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Escalonado, ItemEscalonado } from ".";

test("Escalonado mantém a semântica de lista", () => {
  render(
    <Escalonado como="ul">
      <ItemEscalonado como="li">Depósito</ItemEscalonado>
      <ItemEscalonado como="li">Pix</ItemEscalonado>
    </Escalonado>,
  );
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getAllByRole("listitem")).toHaveLength(2);
});
