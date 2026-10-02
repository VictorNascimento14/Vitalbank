import { RiArrowDownLine, RiArrowUpLine } from "@remixicon/react";
import type { ReactNode } from "react";
import type { Transacao } from "@/dados";
import { finalDoCartao } from "@/dominio/cartao";
import { formatarDataCurta } from "@/dominio/datas";
import { formatarMoeda } from "@/dominio/dinheiro";
import { TIPO } from "@/telas/comum/categoria";
import { cx } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

function Seta({ entrada }: { entrada: boolean }) {
  const Icone = entrada ? RiArrowDownLine : RiArrowUpLine;
  return (
    <span
      aria-hidden="true"
      className={cx(
        "grid size-[30px] shrink-0 place-items-center rounded-full border-2 border-tinta-suave/70 text-tinta-suave",
        "transition-transform duration-300 ease-saida group-hover:scale-110",
        entrada ? "group-hover:translate-y-0.5" : "group-hover:-translate-y-0.5",
      )}
    >
      <Icone className="size-4" />
    </span>
  );
}

function Valor({ centavos }: { centavos: number }) {
  return (
    <span className={cx("valor-sensivel font-medium tabular-nums", centavos > 0 ? "text-sucesso" : "text-perigo")}>
      {formatarMoeda(centavos, { sinal: true })}
    </span>
  );
}

interface Props {
  transacoes: readonly Transacao[];
  /** Coluna extra no fim de cada linha (o botão de recibo). */
  acao?: (t: Transacao) => ReactNode;
}

/**
 * Extrato em tabela (a partir de `md`) ou em lista (celular). As linhas entram em cascata;
 * a seta indica o sentido: para baixo, dinheiro que entrou; para cima, que saiu.
 */
export function TabelaDeTransacoes({ transacoes, acao }: Props) {
  if (transacoes.length === 0) {
    return <p className="py-10 text-center text-rotulo text-tinta-suave">Nenhuma transação aqui.</p>;
  }
  const celula = "px-3 py-4 first:pl-0 last:pr-0";
  return (
    <>
      <table className="hidden w-full text-left text-rotulo md:table md:text-corpo">
        <caption className="sr-only">Transações</caption>
        <thead>
          <tr className="border-b border-borda text-rotulo font-medium text-tinta-suave">
            <th scope="col" className={cx(celula, "pt-0 font-medium")}>
              Descrição
            </th>
            <th scope="col" className={cx(celula, "pt-0 font-medium")}>
              Código
            </th>
            <th scope="col" className={cx(celula, "pt-0 font-medium")}>
              Tipo
            </th>
            <th scope="col" className={cx(celula, "pt-0 font-medium")}>
              Cartão
            </th>
            <th scope="col" className={cx(celula, "pt-0 font-medium")}>
              Data
            </th>
            <th scope="col" className={cx(celula, "pt-0 text-right font-medium")}>
              Valor
            </th>
            {acao && (
              <th scope="col" className={cx(celula, "pt-0 text-right font-medium")}>
                Recibo
              </th>
            )}
          </tr>
        </thead>
        <Escalonado como="tbody" intervalo={0.04}>
          {transacoes.map((t) => (
            <ItemEscalonado
              key={t.id}
              como="tr"
              className="group border-b border-borda text-tinta-forte transition-colors duration-200 last:border-0 hover:bg-fundo/70"
            >
              <td className={celula}>
                <span className="flex items-center gap-4">
                  <Seta entrada={t.valor > 0} />
                  {t.descricao}
                </span>
              </td>
              <td className={cx(celula, "tabular-nums")}>{t.codigo}</td>
              <td className={celula}>{TIPO[t.categoria]}</td>
              <td className={cx(celula, "whitespace-nowrap")}>{finalDoCartao(t.cartao)}</td>
              <td className={cx(celula, "whitespace-nowrap")}>{formatarDataCurta(t.data)}</td>
              <td className={cx(celula, "text-right whitespace-nowrap")}>
                <Valor centavos={t.valor} />
              </td>
              {acao && <td className={cx(celula, "text-right")}>{acao(t)}</td>}
            </ItemEscalonado>
          ))}
        </Escalonado>
      </table>

      <Escalonado como="ul" intervalo={0.04} className="flex flex-col md:hidden">
        {transacoes.map((t) => (
          <ItemEscalonado
            key={t.id}
            como="li"
            className="group flex items-center gap-3.5 border-b border-borda py-3.5 last:border-0"
          >
            <Seta entrada={t.valor > 0} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-rotulo font-medium text-tinta-forte">{t.descricao}</p>
              <p className="text-legenda text-tinta-suave">{formatarDataCurta(t.data)}</p>
            </div>
            <span className="text-legenda">
              <Valor centavos={t.valor} />
            </span>
          </ItemEscalonado>
        ))}
      </Escalonado>
    </>
  );
}
