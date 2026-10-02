import { listarTransacoes, resumoDaConta } from "@/dados";
import { ResumoDaConta } from "@/telas/contas/ResumoDaConta";
import { UltimaTransacao } from "@/telas/contas/UltimaTransacao";

export default async function Contas() {
  const [resumo, transacoes] = await Promise.all([resumoDaConta(), listarTransacoes()]);
  // as três mais recentes que não são entrada de salário ou depósito: as que a pessoa confere
  const ultimas = transacoes.filter((t) => t.categoria !== "deposito" && t.categoria !== "salario").slice(1, 4);
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <ResumoDaConta resumo={resumo} />
      <UltimaTransacao transacoes={ultimas} />
    </div>
  );
}
