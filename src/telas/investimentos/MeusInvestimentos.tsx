import { RiCarFill, RiShoppingBag3Fill, RiSmartphoneFill } from "@remixicon/react";
import type { listarCarteira } from "@/dados";
import { formatarMoeda } from "@/dominio/dinheiro";
import { formatarNumero } from "@/dominio/numero";
import { Bloco, cx, PastilhaDeIcone, TituloDeSecao, type Tom } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof listarCarteira>>;

const ESTILO: { tom: Tom; icone: React.ReactNode }[] = [
  { tom: "rosa", icone: <RiShoppingBag3Fill /> },
  { tom: "azul", icone: <RiSmartphoneFill /> },
  { tom: "amarelo", icone: <RiCarFill /> },
];

export function retornoComSinal(pontosBase: number): string {
  return `${pontosBase > 0 ? "+" : ""}${formatarNumero(pontosBase, "percentual")}`;
}

export function MeusInvestimentos({ carteira }: { carteira: Dados }) {
  return (
    <section aria-labelledby="meus-investimentos" className="flex flex-col">
      <TituloDeSecao id="meus-investimentos">Meus investimentos</TituloDeSecao>
      <Escalonado como="ul" className="flex flex-1 flex-col gap-4">
        {carteira.map((a, i) => {
          const { tom, icone } = ESTILO[i % ESTILO.length];
          return (
            <ItemEscalonado key={a.id} como="li">
              <Bloco className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 !py-4 transition-[translate,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-cartao md:grid-cols-[auto_minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.8fr)]">
                <PastilhaDeIcone tom={tom} tamanho="sm" className="md:size-[60px]">
                  {icone}
                </PastilhaDeIcone>
                <div className="min-w-0">
                  <p className="truncate text-rotulo font-medium text-tinta-forte md:text-corpo">{a.nome}</p>
                  <p className="truncate text-legenda text-tinta-suave md:text-rotulo">{a.setor}</p>
                </div>
                <div className="hidden md:block">
                  <p className="text-corpo font-medium text-tinta-forte tabular-nums">{formatarMoeda(a.valor)}</p>
                  <p className="text-rotulo text-tinta-suave">Valor investido</p>
                </div>
                <div className="text-right md:text-left">
                  <p className={cx("text-rotulo font-medium tabular-nums md:text-corpo", a.retorno >= 0 ? "text-sucesso" : "text-perigo")}>
                    {retornoComSinal(a.retorno)}
                  </p>
                  <p className="text-legenda text-tinta-suave md:text-rotulo">Retorno</p>
                </div>
              </Bloco>
            </ItemEscalonado>
          );
        })}
      </Escalonado>
    </section>
  );
}
