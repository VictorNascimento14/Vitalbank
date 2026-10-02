import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import Carregando from "./loading";

test("o carregamento é anunciado uma vez", () => {
  render(<Carregando />);
  expect(screen.getByRole("status")).toHaveTextContent("Carregando…");
});
