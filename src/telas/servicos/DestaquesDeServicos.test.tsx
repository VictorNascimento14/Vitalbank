import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { DestaquesDeServicos } from "./DestaquesDeServicos";

test("três destaques com título e frase", () => {
  render(<DestaquesDeServicos />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
  expect(screen.getByText("Seguro de vida")).toBeInTheDocument();
  expect(screen.getByText("Somos seus aliados")).toBeInTheDocument();
});
