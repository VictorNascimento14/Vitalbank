import { RiVipCrown2Fill } from "@remixicon/react";
import type { programaDePontos } from "@/dados";
import { situacaoNoPrograma } from "@/dominio/niveis";
import { formatarNumero } from "@/dominio/numero";
import { BarraDeProgresso } from "@/ui";
import { NumeroAnimado, Surgir } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof programaDePontos>>;

/** O cartão do nível: gradiente do cartão de crédito, pontos que contam e o caminho até o próximo. */
export function NivelAtual({ programa }: { programa: Dados }) {
  const { atual, proximo, faltam, progresso } = situacaoNoPrograma(programa.niveis, programa.pontos);
  return (
    <Surgir>
      <section
        aria-label="Seu nível"
        className="relative overflow-hidden rounded-cartao bg-(image:--gradiente-cartao-escuro) p-6 text-white md:p-9"
      >
        <RiVipCrown2Fill
          aria-hidden="true"
          className="absolute -right-6 -top-6 size-44 rotate-12 text-white/10 motion-safe:animate-[flutuar_6s_ease-in-out_infinite]"
        />
        <p className="text-rotulo text-white/70">Seu nível</p>
        <p className="mt-1 text-titulo font-semibold">{atual.nome}</p>
        <p className="mt-5 text-rotulo text-white/70">Pontos</p>
        <p className="text-secao font-semibold md:text-[34px]">
          <NumeroAnimado valor={programa.pontos} formato="inteiro" />
        </p>
        {proximo ? (
          <div className="mt-6 max-w-xl">
            <div className="mb-2 flex justify-between text-legenda text-white/80 md:text-rotulo">
              <span>{atual.nome}</span>
              <span>
                faltam {formatarNumero(faltam, "inteiro")} pontos para o {proximo.nome}
              </span>
            </div>
            <BarraDeProgresso
              valor={progresso}
              rotulo={`Caminho até o ${proximo.nome}`}
              descricao={`faltam ${formatarNumero(faltam, "inteiro")} pontos`}
              className="bg-white/20"
              cor="bg-white"
            />
          </div>
        ) : (
          <p className="mt-6 text-rotulo text-white/80">Você está no nível mais alto. 🎉</p>
        )}
      </section>
    </Surgir>
  );
}
