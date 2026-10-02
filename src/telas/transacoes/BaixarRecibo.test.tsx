import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test, vi } from "vitest";
import { listarTransacoes } from "@/dados";
import { BaixarRecibo } from "./BaixarRecibo";

afterEach(() => vi.restoreAllMocks());

test("baixa um .txt com o código no nome", async () => {
  const [t] = await listarTransacoes({ limite: 1 });
  URL.createObjectURL = vi.fn(() => "blob:recibo");
  URL.revokeObjectURL = vi.fn();
  const clique = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
    expect(this.download).toBe("recibo-12548701.txt");
  });
  render(<BaixarRecibo transacao={t} />);
  await userEvent.click(screen.getByRole("button", { name: "Baixar recibo de Fatura do cartão" }));
  expect(clique).toHaveBeenCalledOnce();
  expect(URL.revokeObjectURL).toHaveBeenCalledWith("blob:recibo");
});
