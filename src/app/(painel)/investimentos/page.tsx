import { investimentoAnual, resumoDosInvestimentos } from "@/dados";
import { InvestimentoAnual } from "@/telas/investimentos/InvestimentoAnual";
import { ResumoDosInvestimentos } from "@/telas/investimentos/ResumoDosInvestimentos";

export default async function Investimentos() {
  const [resumo, anos] = await Promise.all([resumoDosInvestimentos(), investimentoAnual()]);
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-2">
      <ResumoDosInvestimentos resumo={resumo} />
      <InvestimentoAnual anos={anos} />
    </div>
  );
}
