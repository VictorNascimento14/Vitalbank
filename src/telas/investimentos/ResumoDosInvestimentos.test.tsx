import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { resumoDosInvestimentos } from "@/dados";
import { ResumoDosInvestimentos } from "./ResumoDosInvestimentos";

test("total em reais, quantidade inteira e retorno com sinal", async () => {
  render(<ResumoDosInvestimentos resumo={await resumoDosInvestimentos()} />);
  expect(screen.getByText("R$ 150.000,00", { selector: ".sr-only" })).toBeInTheDocument();
  expect(screen.getByText("1.250", { selector: ".sr-only" })).toBeInTheDocument();
  expect(screen.getByText("+5,8%")).toBeInTheDocument();
});
