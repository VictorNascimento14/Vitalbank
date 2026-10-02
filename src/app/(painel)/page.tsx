import { atividadeSemanal, listarCartoes, listarTransacoes } from "@/dados";
import { AtividadeSemanal } from "@/telas/visao-geral/AtividadeSemanal";
import { MeusCartoes } from "@/telas/visao-geral/MeusCartoes";
import { TransacoesRecentes } from "@/telas/visao-geral/TransacoesRecentes";

export default async function VisaoGeral() {
  const [cartoes, recentes, semana] = await Promise.all([
    listarCartoes(),
    listarTransacoes({ limite: 3 }),
    atividadeSemanal(),
  ]);
  return (
    <div className="grid gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <MeusCartoes cartoes={cartoes} />
      <TransacoesRecentes transacoes={recentes} />
      <AtividadeSemanal dias={semana} />
    </div>
  );
}
