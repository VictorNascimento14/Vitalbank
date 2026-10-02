import type { acoesEmAlta } from "@/dados";
import { formatarMoeda } from "@/dominio/dinheiro";
import { Bloco, cx, TituloDeSecao } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";
import { retornoComSinal } from "./MeusInvestimentos";

type Dados = Awaited<ReturnType<typeof acoesEmAlta>>;

export function AcoesEmAlta({ acoes }: { acoes: Dados }) {
  const celula = "py-3 pr-3 last:pr-0";
  return (
    <section aria-labelledby="acoes-em-alta" className="flex flex-col">
      <TituloDeSecao id="acoes-em-alta">Ações em alta</TituloDeSecao>
      <Bloco className="flex-1">
        <table className="w-full text-left text-rotulo md:text-corpo">
          <caption className="sr-only">Ações em alta hoje</caption>
          <thead>
            <tr className="text-tinta-suave">
              <th scope="col" className={cx(celula, "font-medium")}>Nº</th>
              <th scope="col" className={cx(celula, "font-medium")}>Nome</th>
              <th scope="col" className={cx(celula, "text-right font-medium")}>Preço</th>
              <th scope="col" className={cx(celula, "text-right font-medium")}>Variação</th>
            </tr>
          </thead>
          <Escalonado como="tbody" intervalo={0.05}>
            {acoes.map((a, i) => (
              <ItemEscalonado key={a.id} como="tr" className="text-tinta-forte transition-colors hover:bg-fundo/70">
                <td className={cx(celula, "tabular-nums")}>{String(i + 1).padStart(2, "0")}.</td>
                <th scope="row" className={cx(celula, "font-normal")}>{a.nome}</th>
                <td className={cx(celula, "text-right tabular-nums")}>{formatarMoeda(a.preco)}</td>
                <td className={cx(celula, "text-right tabular-nums", a.variacao >= 0 ? "text-sucesso" : "text-perigo")}>
                  {retornoComSinal(a.variacao)}
                </td>
              </ItemEscalonado>
            ))}
          </Escalonado>
        </table>
      </Bloco>
    </section>
  );
}
