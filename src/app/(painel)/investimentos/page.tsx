import { acoesEmAlta, investimentoAnual, listarCarteira, receitaMensal, resumoDosInvestimentos } from "@/dados";
import { AcoesEmAlta } from "@/telas/investimentos/AcoesEmAlta";
import { MeusInvestimentos } from "@/telas/investimentos/MeusInvestimentos";
import { InvestimentoAnual } from "@/telas/investimentos/InvestimentoAnual";
import { ReceitaMensal } from "@/telas/investimentos/ReceitaMensal";
import { ResumoDosInvestimentos } from "@/telas/investimentos/ResumoDosInvestimentos";

export default async function Investimentos() {
  const [resumo, anos, meses, carteira, acoes] = await Promise.all([
    resumoDosInvestimentos(),
    investimentoAnual(),
    receitaMensal(),
    listarCarteira(),
    acoesEmAlta(),
  ]);
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-2">
      <ResumoDosInvestimentos resumo={resumo} />
      <InvestimentoAnual anos={anos} />
      <ReceitaMensal meses={meses} />
      <MeusInvestimentos carteira={carteira} />
      <AcoesEmAlta acoes={acoes} />
    </div>
  );
}
