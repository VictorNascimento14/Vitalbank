import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { listarCartoes } from "@/dados";
import { MeusCartoes } from "./MeusCartoes";

test("mostra os dois primeiros cartões e o atalho para todos", async () => {
  render(<MeusCartoes cartoes={await listarCartoes()} />);
  expect(screen.getByRole("heading", { name: "Meus cartões" })).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(2);
  expect(screen.getByRole("link", { name: "Ver todos" })).toHaveAttribute("href", "/cartoes");
});
