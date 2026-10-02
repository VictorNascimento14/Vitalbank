import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { CampoDeSelecao } from "..";

test("rótulo nomeia a seleção e a escolha funciona", async () => {
  render(
    <CampoDeSelecao
      rotulo="Moeda"
      defaultValue="BRL"
      opcoes={[
        { valor: "BRL", rotulo: "Real (R$)" },
        { valor: "USD", rotulo: "Dólar (US$)" },
      ]}
    />,
  );
  const campo = screen.getByRole("combobox", { name: "Moeda" });
  expect(campo).toHaveValue("BRL");
  await userEvent.selectOptions(campo, "USD");
  expect(campo).toHaveValue("USD");
});
