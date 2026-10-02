import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { listarCartoes } from "@/dados";
import { AcaoDosCartoes, MeusCartoes } from "./MeusCartoes";

test("mostra os dois primeiros cartões e a ação recebida", async () => {
  render(
    <MeusCartoes
      cartoes={await listarCartoes()}
      acao={<AcaoDosCartoes href="/cartoes">Ver todos</AcaoDosCartoes>}
    />,
  );
  expect(screen.getByRole("heading", { name: "Meus cartões" })).toBeInTheDocument();
  expect(screen.getAllByRole("article")).toHaveLength(2);
  expect(screen.getByRole("link", { name: "Ver todos" })).toHaveAttribute("href", "/cartoes");
});

test("quantos escolhe o número de cartões", async () => {
  render(<MeusCartoes cartoes={await listarCartoes()} quantos={3} />);
  expect(screen.getAllByRole("article")).toHaveLength(3);
});
