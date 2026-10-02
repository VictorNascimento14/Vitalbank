import { resumoDosInvestimentos } from "@/dados";
import { ResumoDosInvestimentos } from "@/telas/investimentos/ResumoDosInvestimentos";

export default async function Investimentos() {
  const resumo = await resumoDosInvestimentos();
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-2">
      <ResumoDosInvestimentos resumo={resumo} />
    </div>
  );
}
