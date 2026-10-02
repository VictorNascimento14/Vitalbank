import { RiShieldCheckFill, RiShieldStarFill, RiShoppingBag3Fill } from "@remixicon/react";
import type { ReactNode } from "react";
import { PastilhaDeIcone, type Tom } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

const DESTAQUES: { titulo: string; detalhe: string; tom: Tom; icone: ReactNode }[] = [
  { titulo: "Seguro de vida", detalhe: "Proteção sem limite", tom: "azul", icone: <RiShieldStarFill /> },
  { titulo: "Compras", detalhe: "Compre. Pense. Cresça.", tom: "amarelo", icone: <RiShoppingBag3Fill /> },
  { titulo: "Segurança", detalhe: "Somos seus aliados", tom: "turquesa", icone: <RiShieldCheckFill /> },
];

/** Os três serviços em destaque no topo da tela (kit: Life Insurance, Shopping, Safety). */
export function DestaquesDeServicos() {
  return (
    <section aria-label="Serviços em destaque">
      <Escalonado
        como="ul"
        className="-mx-6 flex snap-x snap-mandatory [scrollbar-width:none] gap-4 overflow-x-auto px-6 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 xl:gap-[30px]"
      >
        {DESTAQUES.map((d) => (
          <ItemEscalonado key={d.titulo} como="li" className="w-[230px] shrink-0 snap-start md:w-auto">
            <div className="group flex h-full items-center gap-4 rounded-cartao bg-superficie px-5 py-5 transition-[translate,box-shadow] duration-300 ease-saida hover:-translate-y-1 hover:shadow-cartao md:px-7 md:py-6">
              <PastilhaDeIcone tom={d.tom} tamanho="fluido">
                {d.icone}
              </PastilhaDeIcone>
              <div className="min-w-0">
                <p className="text-rotulo font-semibold text-tinta-forte md:text-menu xl:text-destaque">{d.titulo}</p>
                <p className="text-legenda text-tinta-suave md:text-rotulo">{d.detalhe}</p>
              </div>
            </div>
          </ItemEscalonado>
        ))}
      </Escalonado>
    </section>
  );
}
