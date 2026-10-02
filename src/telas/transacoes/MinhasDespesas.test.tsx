import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { despesasMensais } from "@/dados";
import { MinhasDespesas } from "./MinhasDespesas";

test("o destaque começa no mês de maior gasto", async () => {
  const { container } = render(<MinhasDespesas meses={await despesasMensais()} />);
  const textos = [...container.querySelectorAll("svg text")].map((t) => t.textContent);
  expect(textos).toContain("R$ 12.500,00");
});
