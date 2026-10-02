import { despesasMensais, listarCartoes } from "@/dados";
import { AcaoDosCartoes, MeusCartoes } from "@/telas/comum/MeusCartoes";
import { MinhasDespesas } from "@/telas/transacoes/MinhasDespesas";

export default async function Transacoes() {
  const [cartoes, meses] = await Promise.all([listarCartoes(), despesasMensais()]);
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <MeusCartoes cartoes={cartoes} acao={<AcaoDosCartoes href="/cartoes#novo-cartao">+ Adicionar cartão</AcaoDosCartoes>} />
      <MinhasDespesas meses={meses} />
    </div>
  );
}
