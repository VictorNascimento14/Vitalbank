import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { emprestimosAtivos } from "@/dados";
import { EmprestimosAtivos, pagarParcela } from "./EmprestimosAtivos";

test("pagarParcela não deixa negativo", () => {
  expect(pagarParcela(100000, 30000)).toBe(70000);
  expect(pagarParcela(20000, 30000)).toBe(0);
});

test("pagar abate a parcela da linha e do total", async () => {
  render(<EmprestimosAtivos emprestimos={await emprestimosAtivos()} />);
  const tabela = screen.getByRole("table", { name: "Empréstimos em aberto" });
  const total = within(tabela).getAllByRole("row").at(-1)!;
  expect(total).toHaveTextContent(/R\$\s543\.800,00/);
  await userEvent.click(screen.getByRole("button", { name: "Pagar parcela do empréstimo 1" }));
  const primeira = within(tabela).getAllByRole("row")[1];
  expect(primeira).toHaveTextContent(/R\$\s38\.500,00/);
  expect(total).toHaveTextContent(/R\$\s541\.800,00/);
});
