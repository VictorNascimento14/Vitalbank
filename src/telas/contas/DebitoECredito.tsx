import type { debitoECredito } from "@/dados";
import { diaDaSemanaCurto } from "@/dominio/datas";
import { formatarMoeda, somarCentavos } from "@/dominio/dinheiro";
import { Bloco, GraficoDeBarras, TituloDeSecao } from "@/ui";

type Dados = Awaited<ReturnType<typeof debitoECredito>>;

export function DebitoECredito({ dias }: { dias: Dados }) {
  const debitado = somarCentavos(dias.map((d) => d.debito));
  const creditado = somarCentavos(dias.map((d) => d.credito));
  return (
    <section aria-labelledby="debito-e-credito" className="flex flex-col">
      <TituloDeSecao id="debito-e-credito">Débito e crédito</TituloDeSecao>
      <Bloco className="flex-1">
        <p className="mb-1 text-legenda text-tinta-suave md:text-rotulo">
          <strong className="valor-sensivel font-semibold text-tinta">{formatarMoeda(debitado)}</strong> debitados e{" "}
          <strong className="valor-sensivel font-semibold text-tinta">{formatarMoeda(creditado)}</strong> creditados
          nesta semana
        </p>
        <GraficoDeBarras
          titulo="Débitos e créditos por dia, últimos 7 dias"
          formato="moeda"
          barra={26}
          categorias={dias.map((d) => diaDaSemanaCurto(d.dia))}
          series={[
            { nome: "Débito", cor: "primaria", valores: dias.map((d) => d.debito) },
            { nome: "Crédito", cor: "laranja", valores: dias.map((d) => d.credito) },
          ]}
        />
      </Bloco>
    </section>
  );
}
