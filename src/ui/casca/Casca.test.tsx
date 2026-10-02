import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Casca } from "..";

vi.mock("next/navigation", () => ({ usePathname: () => "/contas", useRouter: () => ({ push: vi.fn() }) }));

test("a casca entrega o miolo dentro do main, com o link para pular até ele", () => {
  render(
    <Casca nomeDoCliente="Cliente Exemplo">
      <h2>Conteúdo</h2>
    </Casca>,
  );
  expect(screen.getByRole("main")).toContainElement(screen.getByRole("heading", { name: "Conteúdo" }));
  expect(screen.getByRole("link", { name: "Pular para o conteúdo" })).toHaveAttribute("href", "#conteudo");
});
