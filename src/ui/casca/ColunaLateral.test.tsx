import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { ColunaLateral } from "..";

vi.mock("next/navigation", () => ({ usePathname: () => "/contas" }));

test("marca a tela aberta com aria-current", () => {
  render(<ColunaLateral />);
  const nav = screen.getByRole("navigation", { name: "Principal" });
  expect(nav).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Contas" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("link", { name: "Transações" })).not.toHaveAttribute("aria-current");
});

test("lista as nove telas", () => {
  render(<ColunaLateral />);
  expect(screen.getAllByRole("listitem")).toHaveLength(9);
});
