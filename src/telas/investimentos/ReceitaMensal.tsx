import type { receitaMensal } from "@/dados";
import { mesCurto } from "@/dominio/datas";
import { Bloco, GraficoDeLinha, TituloDeSecao } from "@/ui";

type Dados = Awaited<ReturnType<typeof receitaMensal>>;

export function ReceitaMensal({ meses }: { meses: Dados }) {
  return (
    <section aria-labelledby="receita-mensal" className="flex flex-col">
      <TituloDeSecao id="receita-mensal">Receita mensal</TituloDeSecao>
      <Bloco className="flex flex-1 items-center">
        <GraficoDeLinha
          className="w-full"
          titulo="Receita dos investimentos por mês"
          formato="moeda"
          cor="turquesa"
          gradeTracejada
          rotulos={meses.map((m) => mesCurto(m.mes))}
          valores={meses.map((m) => m.receita)}
        />
      </Bloco>
    </section>
  );
}
