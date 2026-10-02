import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Inicio from "./page";

test("a página inicial mostra o nome do produto", () => {
  render(<Inicio />);
  expect(screen.getByRole("heading", { name: /Vitalbank/ })).toBeInTheDocument();
});
