import { listarCartoes } from "@/dados";
import { MeusCartoes } from "@/telas/comum/MeusCartoes";

export default async function CartoesDeCredito() {
  const cartoes = await listarCartoes();
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,35fr)_minmax(0,73fr)]">
      <div className="xl:col-span-2">
        <MeusCartoes cartoes={cartoes} quantos={3} />
      </div>
    </div>
  );
}
