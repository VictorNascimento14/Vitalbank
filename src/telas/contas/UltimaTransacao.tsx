import type { Transacao } from "@/dados";
import { finalDoCartao } from "@/dominio/cartao";
import { formatarDataMedia } from "@/dominio/datas";
import { formatarMoeda } from "@/dominio/dinheiro";
import { ICONE_DA_CATEGORIA, TIPO } from "@/telas/comum/categoria";
import { Bloco, cx, PastilhaDeIcone, TituloDeSecao } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

export function UltimaTransacao({ transacoes }: { transacoes: readonly Transacao[] }) {
  return (
    <section aria-labelledby="ultima-transacao" className="flex flex-col">
      <TituloDeSecao id="ultima-transacao">Última transação</TituloDeSecao>
      <Bloco className="flex-1 !py-3 md:!py-4">
        <Escalonado como="ul" className="flex h-full flex-col justify-around">
          {transacoes.map((t) => {
            const { tom, icone } = ICONE_DA_CATEGORIA[t.categoria];
            return (
              <ItemEscalonado
                key={t.id}
                como="li"
                className="group -mx-3 grid grid-cols-[45px_minmax(0,1fr)_auto] items-center gap-x-4 rounded-campo px-3 py-2.5 transition-colors hover:bg-fundo md:grid-cols-[55px_minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.8fr)_minmax(0,0.9fr)_7.5rem]"
              >
                <PastilhaDeIcone tom={tom} tamanho="sm" className="md:size-[55px]">
                  {icone}
                </PastilhaDeIcone>
                <div className="min-w-0">
                  <p className="truncate text-rotulo font-medium text-tinta-forte md:text-corpo">{t.descricao}</p>
                  <p className="text-legenda text-tinta-suave md:text-rotulo">{formatarDataMedia(t.data)}</p>
                </div>
                <p className="hidden text-rotulo text-tinta-suave md:block md:text-corpo">{TIPO[t.categoria]}</p>
                <p className="hidden text-rotulo text-tinta-suave md:block md:text-corpo">{finalDoCartao(t.cartao)}</p>
                <p className="hidden md:block">
                  <span
                    className={cx(
                      "rounded-full px-2.5 py-1 text-legenda font-medium",
                      t.situacao === "pendente" ? "bg-amarelo-claro text-laranja" : "bg-turquesa-clara text-sucesso",
                    )}
                  >
                    {t.situacao === "pendente" ? "Pendente" : "Concluída"}
                  </span>
                </p>
                <p
                  className={cx(
                    "text-right text-legenda font-medium tabular-nums md:text-corpo",
                    t.valor > 0 ? "text-sucesso" : "text-perigo",
                  )}
                >
                  {formatarMoeda(t.valor, { sinal: true })}
                </p>
              </ItemEscalonado>
            );
          })}
        </Escalonado>
      </Bloco>
    </section>
  );
}
