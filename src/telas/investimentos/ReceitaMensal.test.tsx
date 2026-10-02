import { render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { receitaMensal } from "@/dados";
import { ReceitaMensal } from "./ReceitaMensal";

test("doze meses, linha suave sem pontos", async () => {
  const { container } = render(<ReceitaMensal meses={await receitaMensal()} />);
  expect(within(screen.getByRole("table")).getAllByRole("rowheader")).toHaveLength(12);
  expect(container.querySelector("path")!.getAttribute("d")).toContain("C");
  expect(container.querySelectorAll("circle")).toHaveLength(0);
});
