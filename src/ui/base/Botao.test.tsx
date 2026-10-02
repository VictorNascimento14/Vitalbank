import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Botao } from "..";

test("é type=button por padrão e não envia o formulário", async () => {
  const enviar = vi.fn((e: SubmitEvent) => e.preventDefault());
  render(
    <form onSubmit={(e) => enviar(e.nativeEvent as SubmitEvent)}>
      <Botao>Cancelar</Botao>
    </form>,
  );
  const botao = screen.getByRole("button", { name: "Cancelar" });
  expect(botao).toHaveAttribute("type", "button");
  await userEvent.click(botao);
  expect(enviar).not.toHaveBeenCalled();
});

test("type=submit envia", async () => {
  const enviar = vi.fn((e: SubmitEvent) => e.preventDefault());
  render(
    <form onSubmit={(e) => enviar(e.nativeEvent as SubmitEvent)}>
      <Botao type="submit">Salvar</Botao>
    </form>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Salvar" }));
  expect(enviar).toHaveBeenCalledOnce();
});

test("desabilitado não dispara clique", async () => {
  const clique = vi.fn();
  render(
    <Botao disabled onClick={clique}>
      Enviar
    </Botao>,
  );
  await userEvent.click(screen.getByRole("button", { name: "Enviar" }));
  expect(clique).not.toHaveBeenCalled();
});
