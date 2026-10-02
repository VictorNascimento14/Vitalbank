import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import VisaoGeral from "./page";

test("a visão geral renderiza", () => {
  render(<VisaoGeral />);
  expect(screen.getByText(/visão geral/i)).toBeInTheDocument();
});
