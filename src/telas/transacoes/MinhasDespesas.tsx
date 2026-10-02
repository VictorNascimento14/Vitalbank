import type { despesasMensais } from "@/dados";
import { mesCurto } from "@/dominio/datas";
import { Bloco, GraficoDeColunas, TituloDeSecao } from "@/ui";

type Dados = Awaited<ReturnType<typeof despesasMensais>>;

/** O destaque começa no mês que mais gastou — é a pergunta que a pessoa traz. */
export function MinhasDespesas({ meses }: { meses: Dados }) {
  const maior = meses.reduce((m, d, i) => (d.total > meses[m].total ? i : m), 0);
  return (
    <section aria-labelledby="minhas-despesas" className="flex flex-col">
      <TituloDeSecao id="minhas-despesas">Minhas despesas</TituloDeSecao>
      <Bloco className="flex flex-1 items-end">
        <GraficoDeColunas
          className="w-full"
          titulo="Despesas por mês, últimos 6 meses"
          formato="moeda"
          destaque={maior}
          rotulos={meses.map((m) => mesCurto(m.mes))}
          valores={meses.map((m) => m.total)}
        />
      </Bloco>
    </section>
  );
}
