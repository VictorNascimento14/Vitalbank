import { debitoECredito, listarCartoes, listarTransacoes, resumoDaConta } from "@/dados";
import { DebitoECredito } from "@/telas/contas/DebitoECredito";
import { MeuCartao } from "@/telas/contas/MeuCartao";
import { ResumoDaConta } from "@/telas/contas/ResumoDaConta";
import { UltimaTransacao } from "@/telas/contas/UltimaTransacao";

export default async function Contas() {
  const [resumo, transacoes, cartoes, semana] = await Promise.all([
    resumoDaConta(),
    listarTransacoes(),
    listarCartoes(),
    debitoECredito(),
  ]);
  const emDestaque = cartoes.find((c) => c.variante === "azul") ?? cartoes[0];
  // as três mais recentes que não são entrada de salário ou depósito: as que a pessoa confere
  const ultimas = transacoes.filter((t) => t.categoria !== "deposito" && t.categoria !== "salario").slice(1, 4);
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <ResumoDaConta resumo={resumo} />
      <UltimaTransacao transacoes={ultimas} />
      <MeuCartao cartao={emDestaque} />
      <DebitoECredito dias={semana} />
    </div>
  );
}
