import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import ErroNaTela from "./error";

test("avisa, mostra o código e tenta de novo", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  const retry = vi.fn();
  render(<ErroNaTela error={Object.assign(new Error("falhou"), { digest: "abc123" })} retry={retry} />);
  expect(screen.getByRole("alert")).toHaveTextContent("Algo deu errado nesta tela");
  expect(screen.getByText("Código do erro: abc123")).toBeInTheDocument();
  await userEvent.click(screen.getByRole("button", { name: "Tentar de novo" }));
  expect(retry).toHaveBeenCalledOnce();
});
