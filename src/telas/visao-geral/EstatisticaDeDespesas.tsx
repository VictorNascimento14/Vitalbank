import type { despesasPorCategoria } from "@/dados";
import { Bloco, GraficoDePizza, TituloDeSecao } from "@/ui";

type Dados = Awaited<ReturnType<typeof despesasPorCategoria>>;

/** Cor e raio de cada fatia na ordem do kit: a maior fatia não é a mais longa. */
const ESTILO = [
  { cor: "marinho", raio: 0.9 },
  { cor: "tangerina", raio: 0.82 },
  { cor: "magenta", raio: 0.95 },
  { cor: "primaria", raio: 0.86 },
];

export function EstatisticaDeDespesas({ despesas }: { despesas: Dados }) {
  return (
    <section aria-labelledby="estatistica-de-despesas" className="flex flex-col">
      <TituloDeSecao id="estatistica-de-despesas">Estatística de despesas</TituloDeSecao>
      <Bloco className="flex flex-1 items-center justify-center">
        <GraficoDePizza
          titulo="Despesas do mês por categoria"
          fatias={despesas.map((d, i) => ({ nome: d.categoria, valor: d.total, ...ESTILO[i % ESTILO.length] }))}
        />
      </Bloco>
    </section>
  );
}
