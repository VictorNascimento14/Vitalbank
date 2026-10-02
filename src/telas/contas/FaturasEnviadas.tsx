import { RiAppleFill, RiGamepadFill, RiUserFill } from "@remixicon/react";
import type { faturasEnviadas } from "@/dados";
import { haQuantoTempo } from "@/dominio/datas";
import { formatarMoeda } from "@/dominio/dinheiro";
import { Bloco, PastilhaDeIcone, TituloDeSecao, type Tom } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof faturasEnviadas>>;

const TIPO: Record<Dados[number]["tipo"], { tom: Tom; icone: React.ReactNode }> = {
  loja: { tom: "turquesa", icone: <RiAppleFill /> },
  pessoa: { tom: "amarelo", icone: <RiUserFill /> },
  jogo: { tom: "azul", icone: <RiGamepadFill /> },
};

export function FaturasEnviadas({ faturas, hoje }: { faturas: Dados; hoje?: Date }) {
  return (
    <section aria-labelledby="faturas-enviadas" className="flex flex-col">
      <TituloDeSecao id="faturas-enviadas">Faturas enviadas</TituloDeSecao>
      <Bloco className="flex-1">
        <Escalonado como="ul" className="flex h-full flex-col justify-between gap-2">
          {faturas.map((f, i) => {
            const { tom, icone } = TIPO[f.tipo];
            return (
              <ItemEscalonado
                key={f.id}
                como="li"
                className="group -mx-3 flex items-center gap-4 rounded-campo px-3 py-2 transition-colors hover:bg-fundo"
              >
                <PastilhaDeIcone tom={i === 3 ? "rosa" : tom} tamanho="sm" className="md:size-[60px]">
                  {icone}
                </PastilhaDeIcone>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-rotulo font-medium text-tinta-forte md:text-corpo">{f.para}</p>
                  <p className="text-legenda text-tinta-suave md:text-rotulo">{haQuantoTempo(f.enviadaEm, hoje)}</p>
                </div>
                <p className="valor-sensivel text-rotulo font-medium tabular-nums text-tinta-suave md:text-corpo">
                  {formatarMoeda(f.valor)}
                </p>
              </ItemEscalonado>
            );
          })}
        </Escalonado>
      </Bloco>
    </section>
  );
}
