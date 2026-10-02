import { resumoDaConta } from "@/dados";
import { ResumoDaConta } from "@/telas/contas/ResumoDaConta";

export default async function Contas() {
  const resumo = await resumoDaConta();
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <ResumoDaConta resumo={resumo} />
    </div>
  );
}
