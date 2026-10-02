import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { linhasDeCredito } from "@/dados";
import { LinhasDeCredito } from "./LinhasDeCredito";

test("quatro linhas, a personalizada sem valor", async () => {
  render(<LinhasDeCredito linhas={await linhasDeCredito()} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(4);
  expect(screen.getByText("R$ 500.000,00", { selector: ".sr-only" })).toBeInTheDocument();
  expect(screen.getByText("Escolha o valor")).toBeInTheDocument();
});
