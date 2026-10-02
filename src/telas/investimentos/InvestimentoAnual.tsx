import type { investimentoAnual } from "@/dados";
import { Bloco, GraficoDeLinha, TituloDeSecao } from "@/ui";

type Dados = Awaited<ReturnType<typeof investimentoAnual>>;

export function InvestimentoAnual({ anos }: { anos: Dados }) {
  return (
    <section aria-labelledby="investimento-anual" className="flex flex-col">
      <TituloDeSecao id="investimento-anual">Investimento anual</TituloDeSecao>
      <Bloco className="flex flex-1 items-center">
        <GraficoDeLinha
          className="w-full"
          titulo="Total investido no fim de cada ano"
          formato="moeda"
          cor="laranja"
          suave={false}
          pontos
          gradeTracejada
          rotulos={anos.map((a) => String(a.ano))}
          valores={anos.map((a) => a.total)}
        />
      </Bloco>
    </section>
  );
}
