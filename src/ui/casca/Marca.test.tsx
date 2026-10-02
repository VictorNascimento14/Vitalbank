import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Marca } from "..";

test("a marca escreve o nome do produto", () => {
  render(<Marca />);
  expect(screen.getByText(/Vitalbank/)).toBeInTheDocument();
});

test("compacta mostra só o símbolo", () => {
  render(<Marca compacta />);
  expect(screen.queryByText(/Vitalbank/)).toBeNull();
});

test("duas marcas na mesma página não dividem o gradiente", () => {
  const { container } = render(
    <>
      <Marca />
      <Marca />
    </>,
  );
  const ids = [...container.querySelectorAll("linearGradient")].map((g) => g.id);
  expect(new Set(ids).size).toBe(2);
  const preenchimentos = [...container.querySelectorAll("rect[fill^='url(']")].map((r) => r.getAttribute("fill"));
  expect(preenchimentos).toEqual(ids.map((id) => `url(#${id})`));
});
