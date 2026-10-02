import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { investimentoAnual } from "@/dados";
import { InvestimentoAnual } from "./InvestimentoAnual";

test("seis anos em ordem, com pontos", async () => {
  const { container } = render(<InvestimentoAnual anos={await investimentoAnual()} />);
  const anos = within(screen.getByRole("table"))
    .getAllByRole("rowheader")
    .map((c) => c.textContent);
  expect(anos).toEqual(["2021", "2022", "2023", "2024", "2025", "2026"]);
  expect(container.querySelectorAll("circle")).toHaveLength(6);
});
