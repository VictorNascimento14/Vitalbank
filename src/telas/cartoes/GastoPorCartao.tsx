import type { Cartao, Transacao } from "@/dados";
import { finalDoCartao } from "@/dominio/cartao";
import { somarCentavos } from "@/dominio/dinheiro";
import { Bloco, GraficoDeRosca, TituloDeSecao } from "@/ui";

const CORES = ["azul", "turquesa", "laranja", "rosa"];
const ESPESSURAS = [0.82, 1, 0.9, 0.74];

/** Quanto saiu por cartão: soma das saídas das transações de cada um. */
export function gastoPorCartao(cartoes: readonly Cartao[], transacoes: readonly Transacao[]) {
  return cartoes.map((c) => ({
    final: c.final,
    gasto: -somarCentavos(transacoes.filter((t) => t.cartao === c.final && t.valor < 0).map((t) => t.valor)),
  }));
}

export function GastoPorCartao({ cartoes, transacoes }: { cartoes: readonly Cartao[]; transacoes: readonly Transacao[] }) {
  const gastos = gastoPorCartao(cartoes, transacoes);
  return (
    <section aria-labelledby="gasto-por-cartao" className="flex flex-col">
      <TituloDeSecao id="gasto-por-cartao">Gasto por cartão</TituloDeSecao>
      <Bloco className="flex flex-1 items-center justify-center">
        <GraficoDeRosca
          titulo="Quanto saiu por cartão"
          arcos={gastos.map((g, i) => ({
            nome: finalDoCartao(g.final),
            valor: g.gasto,
            cor: CORES[i % CORES.length],
            espessura: ESPESSURAS[i % ESPESSURAS.length],
          }))}
        />
      </Bloco>
    </section>
  );
}
