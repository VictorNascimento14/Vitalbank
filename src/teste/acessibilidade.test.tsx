import { render } from "@testing-library/react";
import axe from "axe-core";
import type { ReactElement } from "react";
import { describe, expect, test, vi } from "vitest";
import Transacoes from "@/app/(painel)/transacoes/page";
import Cartoes from "@/app/(painel)/cartoes/page";
import Configuracoes from "@/app/(painel)/configuracoes/page";
import Contas from "@/app/(painel)/contas/page";
import Emprestimos from "@/app/(painel)/emprestimos/page";
import Investimentos from "@/app/(painel)/investimentos/page";
import VisaoGeral from "@/app/(painel)/page";
import Privilegios from "@/app/(painel)/privilegios/page";
import Servicos from "@/app/(painel)/servicos/page";

vi.mock("next/navigation", () => ({ usePathname: () => "/", useRouter: () => ({ push: vi.fn() }) }));

/** Regras que o jsdom não consegue avaliar (não calcula layout nem cor final). */
const FORA = { "color-contrast": { enabled: false } };

async function violacoes(elemento: ReactElement) {
  const { container } = render(<main>{elemento}</main>);
  const r = await axe.run(container, { rules: FORA });
  return r.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).join(" | ")}`);
}

describe("acessibilidade das telas (axe)", () => {
  test.each([
    ["Visão geral", VisaoGeral],
    ["Transações", Transacoes],
    ["Contas", Contas],
    ["Investimentos", Investimentos],
    ["Cartões", Cartoes],
    ["Empréstimos", Emprestimos],
    ["Serviços", Servicos],
    ["Meus privilégios", Privilegios],
    ["Configurações", Configuracoes],
  ] as const)("%s sem violações", async (_, Tela) => {
    const elemento = await (Tela as () => Promise<ReactElement> | ReactElement)();
    expect(await violacoes(elemento)).toEqual([]);
  });
});

test("controle: o axe reprova uma falha conhecida", async () => {
  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- falha de propósito
  const falhas = await violacoes(<><img src="x.png" /><button /></>);
  expect(falhas.map((f) => f.split(":")[0]).sort()).toEqual(["button-name", "image-alt"]);
});
