import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { faturasEnviadas } from "@/dados";
import { FaturasEnviadas } from "./FaturasEnviadas";

test("cada fatura com quando foi enviada e o valor", async () => {
  render(<FaturasEnviadas faturas={await faturasEnviadas()} hoje={new Date(2026, 9, 2, 12)} />);
  const [loja, miguel, games] = screen.getAllByRole("listitem");
  expect(within(loja).getByText("hoje")).toBeInTheDocument();
  expect(within(miguel).getByText("anteontem")).toBeInTheDocument();
  expect(within(games).getByText(/R\$\s1\.085,00/)).toBeInTheDocument();
});
