import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { listarCartoes } from "@/dados";
import { MeuCartao } from "./MeuCartao";

test("um cartão e o atalho para todos", async () => {
  const azul = (await listarCartoes()).find((c) => c.variante === "azul")!;
  render(<MeuCartao cartao={azul} />);
  expect(screen.getAllByRole("article")).toHaveLength(1);
  expect(screen.getByRole("article", { name: /final 7560/ })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Ver todos" })).toHaveAttribute("href", "/cartoes");
});
