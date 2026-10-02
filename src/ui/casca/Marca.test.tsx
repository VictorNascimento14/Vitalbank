import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Marca } from "..";

test("a marca escreve o nome do produto", () => {
  render(<Marca />);
  expect(screen.getByText(/Vitalbank/)).toBeInTheDocument();
});

test("compacta mostra só o símbolo", () => {
  render(<Marca compacta />);
  expect(screen.queryByText(/Vitalbank/)).toBeNull();
});
