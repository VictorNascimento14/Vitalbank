import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import VisaoGeral from "./page";

test("a visão geral começa pelos cartões", async () => {
  render(await VisaoGeral());
  expect(screen.getByRole("heading", { name: "Meus cartões" })).toBeInTheDocument();
});
