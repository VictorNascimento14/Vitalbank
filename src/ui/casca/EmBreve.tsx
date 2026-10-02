import { RiHammerLine } from "@remixicon/react";
import { Bloco } from "../base/Bloco";
import { PastilhaDeIcone } from "../base/PastilhaDeIcone";

/** Marcador provisório das telas que ainda não chegaram. */
export function EmBreve({ tela }: { tela: string }) {
  return (
    <Bloco className="flex flex-col items-center gap-4 py-16 text-center">
      <PastilhaDeIcone tom="azul" tamanho="lg">
        <RiHammerLine />
      </PastilhaDeIcone>
      <p className="text-menu font-semibold text-tinta">{tela} está em construção</p>
      <p className="max-w-sm text-rotulo text-tinta-suave">Esta tela chega nos próximos PRs.</p>
    </Bloco>
  );
}
