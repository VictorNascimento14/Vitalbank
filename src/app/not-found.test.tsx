import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import NaoEncontrada from "./not-found";

test("explica e leva de volta", () => {
  render(<NaoEncontrada />);
  expect(screen.getByRole("heading", { level: 1, name: "Esta página não existe" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Voltar para a visão geral" })).toHaveAttribute("href", "/");
});
