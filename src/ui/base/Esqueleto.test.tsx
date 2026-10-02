import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { Esqueleto } from "..";

test("é decorativo e aceita o tamanho de fora", () => {
  const { container } = render(<Esqueleto className="h-10 w-40" />);
  const bloco = container.firstElementChild!;
  expect(bloco).toHaveAttribute("aria-hidden", "true");
  expect(bloco).toHaveClass("h-10", "w-40");
});
