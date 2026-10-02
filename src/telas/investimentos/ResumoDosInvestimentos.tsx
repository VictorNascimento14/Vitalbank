import { RiExchangeFill, RiMoneyDollarCircleFill, RiPieChart2Fill } from "@remixicon/react";
import type { resumoDosInvestimentos } from "@/dados";
import { formatarNumero } from "@/dominio/numero";
import { CartaoDeResumo } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof resumoDosInvestimentos>>;

export function ResumoDosInvestimentos({ resumo }: { resumo: Dados }) {
  const retorno = `${resumo.retorno >= 0 ? "+" : ""}${formatarNumero(resumo.retorno, "percentual")}`;
  return (
    <section aria-label="Resumo dos investimentos" className="xl:col-span-2">
      <Escalonado como="ul" className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 xl:gap-[30px]">
        <ItemEscalonado como="li">
          <CartaoDeResumo
            className="h-full"
            rotulo="Total investido"
            valor={resumo.totalInvestido}
            tom="turquesa"
            icone={<RiMoneyDollarCircleFill />}
          />
        </ItemEscalonado>
        <ItemEscalonado como="li">
          <CartaoDeResumo
            className="h-full"
            rotulo="Número de aplicações"
            valor={resumo.quantidade}
            formato="inteiro"
            tom="rosa"
            icone={<RiPieChart2Fill />}
          />
        </ItemEscalonado>
        <ItemEscalonado como="li">
          <CartaoDeResumo className="h-full" rotulo="Taxa de retorno" texto={retorno} tom="azul" icone={<RiExchangeFill />} />
        </ItemEscalonado>
      </Escalonado>
    </section>
  );
}
