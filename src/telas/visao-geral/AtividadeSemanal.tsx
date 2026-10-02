import type { atividadeSemanal } from "@/dados";
import { diaDaSemanaCurto } from "@/dominio/datas";
import { Bloco, GraficoDeBarras, TituloDeSecao } from "@/ui";

type Dados = Awaited<ReturnType<typeof atividadeSemanal>>;

export function AtividadeSemanal({ dias }: { dias: Dados }) {
  return (
    <section aria-labelledby="atividade-semanal" className="flex flex-col">
      <TituloDeSecao id="atividade-semanal">Atividade semanal</TituloDeSecao>
      <Bloco className="flex-1">
        <GraficoDeBarras
          titulo="Entradas e saídas por dia, últimos 7 dias"
          formato="moeda"
          categorias={dias.map((d) => diaDaSemanaCurto(d.dia))}
          series={[
            { nome: "Entradas", cor: "turquesa", valores: dias.map((d) => d.entradas) },
            { nome: "Saídas", cor: "primaria", valores: dias.map((d) => d.saidas) },
          ]}
        />
      </Bloco>
    </section>
  );
}
