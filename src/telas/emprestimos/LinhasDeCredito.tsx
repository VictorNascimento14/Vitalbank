import { RiBriefcase4Fill, RiLineChartFill, RiToolsFill, RiUser3Fill } from "@remixicon/react";
import type { linhasDeCredito } from "@/dados";
import { CartaoDeResumo } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof linhasDeCredito>>;

export function LinhasDeCredito({ linhas }: { linhas: Dados }) {
  return (
    <section aria-label="Linhas de crédito">
      <Escalonado como="ul" className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4 xl:gap-[30px]">
        <ItemEscalonado como="li">
          <CartaoDeResumo className="h-full" rotulo="Pessoal" valor={linhas.pessoal} tom="azul" icone={<RiUser3Fill />} />
        </ItemEscalonado>
        <ItemEscalonado como="li">
          <CartaoDeResumo className="h-full" rotulo="Empresarial" valor={linhas.empresarial} tom="amarelo" icone={<RiBriefcase4Fill />} />
        </ItemEscalonado>
        <ItemEscalonado como="li">
          <CartaoDeResumo className="h-full" rotulo="Negócios" valor={linhas.negocios} tom="rosa" icone={<RiLineChartFill />} />
        </ItemEscalonado>
        <ItemEscalonado como="li">
          <CartaoDeResumo className="h-full" rotulo="Personalizado" texto="Escolha o valor" tom="turquesa" icone={<RiToolsFill />} />
        </ItemEscalonado>
      </Escalonado>
    </section>
  );
}
