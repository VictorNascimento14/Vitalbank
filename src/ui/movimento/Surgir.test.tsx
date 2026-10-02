import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ProvedorDeMovimento, Surgir } from ".";

test("Surgir entrega o conteúdo, que fica acessível desde o início", () => {
  render(
    <ProvedorDeMovimento>
      <Surgir>
        <h2>Meus cartões</h2>
      </Surgir>
    </ProvedorDeMovimento>,
  );
  expect(screen.getByRole("heading", { name: "Meus cartões" })).toBeInTheDocument();
});
