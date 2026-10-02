import { RiBankCardFill, RiMoneyDollarCircleFill, RiPaypalFill } from "@remixicon/react";
import type { Transacao } from "@/dados";
import { formatarDataMedia } from "@/dominio/datas";
import { formatarMoeda } from "@/dominio/dinheiro";
import { Bloco, cx, PastilhaDeIcone, TituloDeSecao, type Tom } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

const MEIO: Record<Transacao["meio"], { tom: Tom; Icone: typeof RiPaypalFill }> = {
  cartao: { tom: "amarelo", Icone: RiBankCardFill },
  paypal: { tom: "azul", Icone: RiPaypalFill },
  pix: { tom: "turquesa", Icone: RiMoneyDollarCircleFill },
};

export function TransacoesRecentes({ transacoes }: { transacoes: readonly Transacao[] }) {
  return (
    <section aria-labelledby="transacoes-recentes" className="flex flex-col">
      <TituloDeSecao id="transacoes-recentes">Transações recentes</TituloDeSecao>
      <Bloco className="flex-1 !py-4 md:!py-5">
        <Escalonado como="ul" className="flex h-full flex-col justify-between gap-1">
          {transacoes.map((t) => {
            const { tom, Icone } = MEIO[t.meio];
            const entrada = t.valor > 0;
            return (
              <ItemEscalonado
                key={t.id}
                como="li"
                className="group -mx-3 flex items-center gap-3.5 rounded-campo px-3 py-2.5 transition-colors duration-200 hover:bg-fundo"
              >
                <PastilhaDeIcone tom={tom} tamanho="sm">
                  <Icone />
                </PastilhaDeIcone>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-rotulo font-medium text-tinta-forte md:text-corpo">{t.descricao}</p>
                  <p className="whitespace-nowrap text-legenda text-tinta-suave">{formatarDataMedia(t.data)}</p>
                </div>
                <p
                  className={cx(
                    "shrink-0 text-legenda font-medium tabular-nums md:text-rotulo",
                    entrada ? "text-sucesso" : "text-perigo",
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
