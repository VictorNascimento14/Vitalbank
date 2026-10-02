import {
  atividadeSemanal,
  despesasPorCategoria,
  listarCartoes,
  listarContatos,
  listarTransacoes,
} from "@/dados";
import { AtividadeSemanal } from "@/telas/visao-geral/AtividadeSemanal";
import { EstatisticaDeDespesas } from "@/telas/visao-geral/EstatisticaDeDespesas";
import { MeusCartoes } from "@/telas/visao-geral/MeusCartoes";
import { TransferenciaRapida } from "@/telas/visao-geral/TransferenciaRapida";
import { TransacoesRecentes } from "@/telas/visao-geral/TransacoesRecentes";

export default async function VisaoGeral() {
  const [cartoes, recentes, semana, despesas, contatos] = await Promise.all([
    listarCartoes(),
    listarTransacoes({ limite: 3 }),
    atividadeSemanal(),
    despesasPorCategoria(),
    listarContatos(),
  ]);
  return (
    <div className="grid gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <MeusCartoes cartoes={cartoes} />
      <TransacoesRecentes transacoes={recentes} />
      <AtividadeSemanal dias={semana} />
      <EstatisticaDeDespesas despesas={despesas} />
      <div className="grid gap-6 lg:gap-[30px] xl:col-span-2 xl:grid-cols-[minmax(0,445fr)_minmax(0,635fr)]">
        <TransferenciaRapida contatos={contatos} />
      </div>
    </div>
  );
}
