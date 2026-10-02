import { listarCartoes, listarTransacoes } from "@/dados";
import { GastoPorCartao } from "@/telas/cartoes/GastoPorCartao";
import { ListaDeCartoes } from "@/telas/cartoes/ListaDeCartoes";
import { MeusCartoes } from "@/telas/comum/MeusCartoes";

export default async function CartoesDeCredito() {
  const [cartoes, transacoes] = await Promise.all([listarCartoes(), listarTransacoes()]);
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,35fr)_minmax(0,73fr)]">
      <div className="xl:col-span-2">
        <MeusCartoes cartoes={cartoes} quantos={3} />
      </div>
      <GastoPorCartao cartoes={cartoes} transacoes={transacoes} />
      <ListaDeCartoes cartoes={cartoes} />
    </div>
  );
}
