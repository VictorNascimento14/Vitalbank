import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Paginacao } from "..";

test("marca a página atual e desliga as setas nas pontas", () => {
  render(<Paginacao pagina={1} total={4} aoMudar={() => {}} />);
  expect(screen.getByRole("button", { name: "Página 1" })).toHaveAttribute("aria-current", "page");
  expect(screen.getByRole("button", { name: /Anterior/ })).toBeDisabled();
  expect(screen.getByRole("button", { name: /Próxima/ })).toBeEnabled();
});

test("número e setas pedem a página certa", async () => {
  const aoMudar = vi.fn();
  render(<Paginacao pagina={2} total={4} aoMudar={aoMudar} />);
  await userEvent.click(screen.getByRole("button", { name: "Página 4" }));
  await userEvent.click(screen.getByRole("button", { name: /Anterior/ }));
  await userEvent.click(screen.getByRole("button", { name: /Próxima/ }));
  expect(aoMudar.mock.calls).toEqual([[4], [1], [3]]);
});

test("uma página só não desenha nada", () => {
  const { container } = render(<Paginacao pagina={1} total={1} aoMudar={() => {}} />);
  expect(container).toBeEmptyDOMElement();
});
