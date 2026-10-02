import { despesasMensais, listarCartoes, listarTransacoes } from "@/dados";
import { Bloco, TituloDeSecao } from "@/ui";
import { AcaoDosCartoes, MeusCartoes } from "@/telas/comum/MeusCartoes";
import { MinhasDespesas } from "@/telas/transacoes/MinhasDespesas";
import { TabelaDeTransacoes } from "@/telas/transacoes/TabelaDeTransacoes";

export default async function Transacoes() {
  const [cartoes, meses, transacoes] = await Promise.all([
    listarCartoes(),
    despesasMensais(),
    listarTransacoes({ limite: 5 }),
  ]);
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <MeusCartoes cartoes={cartoes} acao={<AcaoDosCartoes href="/cartoes#novo-cartao">+ Adicionar cartão</AcaoDosCartoes>} />
      <MinhasDespesas meses={meses} />
      <section aria-labelledby="transacoes-recentes" className="xl:col-span-2">
        <TituloDeSecao id="transacoes-recentes">Transações recentes</TituloDeSecao>
        <Bloco>
          <TabelaDeTransacoes transacoes={transacoes} />
        </Bloco>
      </section>
    </div>
  );
}
