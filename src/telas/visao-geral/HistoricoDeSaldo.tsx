import type { historicoDeSaldo } from "@/dados";
import { mesCurto } from "@/dominio/datas";
import { Bloco, GraficoDeLinha, TituloDeSecao } from "@/ui";

type Dados = Awaited<ReturnType<typeof historicoDeSaldo>>;

export function HistoricoDeSaldo({ meses }: { meses: Dados }) {
  return (
    <section aria-labelledby="historico-de-saldo" className="flex flex-col">
      <TituloDeSecao id="historico-de-saldo">Histórico de saldo</TituloDeSecao>
      <Bloco className="flex flex-1 items-center">
        <GraficoDeLinha
          className="w-full"
          titulo="Saldo no fim de cada mês"
          formato="moeda"
          cor="primaria-viva"
          area
          gradeTracejada
          rotulos={meses.map((m) => mesCurto(m.mes))}
          valores={meses.map((m) => m.saldo)}
        />
      </Bloco>
    </section>
  );
}
