import {
  RiCoinsFill,
  RiExchangeDollarFill,
  RiLock2Fill,
  RiPlaneFill,
  RiShieldStarFill,
  RiUserStarFill,
  RiWallet3Fill,
} from "@remixicon/react";
import type { ReactNode } from "react";
import type { programaDePontos } from "@/dados";
import { beneficioLiberado, situacaoNoPrograma } from "@/dominio/niveis";
import { cx, PastilhaDeIcone, TituloDeSecao, type Tom } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof programaDePontos>>;

const ICONES: Record<Dados["beneficios"][number]["icone"], { tom: Tom; icone: ReactNode }> = {
  cashback: { tom: "turquesa", icone: <RiCoinsFill /> },
  saque: { tom: "amarelo", icone: <RiWallet3Fill /> },
  sala: { tom: "azul", icone: <RiPlaneFill /> },
  seguro: { tom: "rosa", icone: <RiShieldStarFill /> },
  gerente: { tom: "primaria", icone: <RiUserStarFill /> },
  cambio: { tom: "laranja", icone: <RiExchangeDollarFill /> },
};

export function Beneficios({ programa }: { programa: Dados }) {
  const { atual } = situacaoNoPrograma(programa.niveis, programa.pontos);
  const nomeDoNivel = (id: string) => programa.niveis.find((n) => n.id === id)?.nome ?? id;
  return (
    <section aria-labelledby="beneficios">
      <TituloDeSecao id="beneficios">Benefícios</TituloDeSecao>
      <Escalonado como="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 xl:gap-[30px]">
        {programa.beneficios.map((b) => {
          const liberado = beneficioLiberado(programa.niveis, b.nivel, atual.id);
          const { tom, icone } = ICONES[b.icone];
          return (
            <ItemEscalonado key={b.id} como="li">
              <div
                className={cx(
                  "group flex h-full items-center gap-4 rounded-cartao bg-superficie p-5 transition-[translate,box-shadow] duration-300 ease-saida md:p-6",
                  liberado ? "hover:-translate-y-1 hover:shadow-cartao" : "opacity-60",
                )}
              >
                <PastilhaDeIcone tom={tom} tamanho="sm" className="md:size-[55px]">
                  {icone}
                </PastilhaDeIcone>
                <div className="min-w-0 flex-1">
                  <p className="text-rotulo font-semibold text-tinta-forte md:text-corpo">{b.nome}</p>
                  <p className="text-legenda text-tinta-suave md:text-rotulo">{b.descricao}</p>
                </div>
                {liberado ? (
                  <span className="shrink-0 rounded-full bg-turquesa-clara px-2.5 py-1 text-legenda font-medium text-sucesso">Ativo</span>
                ) : (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-fundo px-2.5 py-1 text-legenda font-medium text-tinta-suave">
                    <RiLock2Fill aria-hidden="true" className="size-3.5" />
                    {nomeDoNivel(b.nivel)}
                  </span>
                )}
              </div>
            </ItemEscalonado>
          );
        })}
      </Escalonado>
    </section>
  );
}
