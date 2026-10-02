import {
  atividadeSemanal,
  despesasPorCategoria,
  historicoDeSaldo,
  listarCartoes,
  listarContatos,
  listarTransacoes,
} from "@/dados";
import { AtividadeSemanal } from "@/telas/visao-geral/AtividadeSemanal";
import { EstatisticaDeDespesas } from "@/telas/visao-geral/EstatisticaDeDespesas";
import { HistoricoDeSaldo } from "@/telas/visao-geral/HistoricoDeSaldo";
import { AcaoDosCartoes, MeusCartoes } from "@/telas/comum/MeusCartoes";
import { TransferenciaRapida } from "@/telas/visao-geral/TransferenciaRapida";
import { TransacoesRecentes } from "@/telas/visao-geral/TransacoesRecentes";

export default async function VisaoGeral() {
  const [cartoes, recentes, semana, despesas, contatos, saldo] = await Promise.all([
    listarCartoes(),
    listarTransacoes({ limite: 3 }),
    atividadeSemanal(),
    despesasPorCategoria(),
    listarContatos(),
    historicoDeSaldo(),
  ]);
  return (
    <div className="grid gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <MeusCartoes cartoes={cartoes} acao={<AcaoDosCartoes href="/cartoes">Ver todos</AcaoDosCartoes>} />
      <TransacoesRecentes transacoes={recentes} />
      <AtividadeSemanal dias={semana} />
      <EstatisticaDeDespesas despesas={despesas} />
      <div className="grid gap-6 lg:gap-[30px] xl:col-span-2 xl:grid-cols-[minmax(0,445fr)_minmax(0,635fr)]">
        <TransferenciaRapida contatos={contatos} />
        <HistoricoDeSaldo meses={saldo} />
      </div>
    </div>
  );
}
