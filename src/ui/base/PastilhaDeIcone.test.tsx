import { RiPaypalFill } from "@remixicon/react";
import { render } from "@testing-library/react";
import { expect, test } from "vitest";
import { PastilhaDeIcone } from "..";

test("a pastilha é decorativa e leva o tom pedido", () => {
  const { container } = render(
    <PastilhaDeIcone tom="azul">
      <RiPaypalFill />
    </PastilhaDeIcone>,
  );
  const pastilha = container.firstElementChild!;
  expect(pastilha).toHaveAttribute("aria-hidden", "true");
  expect(pastilha).toHaveClass("bg-azul-claro", "text-azul");
  expect(pastilha.querySelector("svg")).not.toBeNull();
});
