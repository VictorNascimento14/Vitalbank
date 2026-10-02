import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Avatar } from "..";
import { iniciais, parDoNome } from "./Avatar";

describe("iniciais", () => {
  test.each([
    ["Cliente Exemplo", "CE"],
    ["ana", "A"],
    ["  maria  da  silva ", "MS"],
    ["Ícaro Ávila", "ÍÁ"],
    ["", "?"],
  ])("%j → %s", (nome, esperado) => {
    expect(iniciais(nome)).toBe(esperado);
  });
});

test("a mesma pessoa cai sempre no mesmo gradiente", () => {
  expect(parDoNome("Cliente Exemplo")).toBe(parDoNome("Cliente Exemplo"));
});

test("o avatar é uma imagem com o nome da pessoa", () => {
  render(<Avatar nome="Cliente Exemplo" />);
  expect(screen.getByRole("img", { name: "Cliente Exemplo" })).toBeInTheDocument();
});
