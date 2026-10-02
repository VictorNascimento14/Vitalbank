"use client";

import { RiCheckLine } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { emprestimosAtivos } from "@/dados";
import { formatarMoeda, somarCentavos } from "@/dominio/dinheiro";
import { formatarNumero } from "@/dominio/numero";
import { Bloco, Botao, cx, TituloDeSecao } from "@/ui";
import { Escalonado, ItemEscalonado, mola } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof emprestimosAtivos>>;

/** Abate uma parcela, sem deixar o saldo negativo. */
export function pagarParcela(faltaPagar: number, parcela: number): number {
  return Math.max(0, faltaPagar - parcela);
}

const celula = "px-1.5 py-3.5 first:pl-0 last:pr-0 md:px-3";

/**
 * Empréstimos ativos. "Pagar" abate uma parcela do que falta (demonstração: nada sai da
 * conta); a célula pisca no valor novo e o total se atualiza.
 */
export function EmprestimosAtivos({ emprestimos }: { emprestimos: Dados }) {
  const [falta, setFalta] = useState(() => Object.fromEntries(emprestimos.map((e) => [e.id, e.faltaPagar])));
  const [pago, setPago] = useState<string | null>(null);

  function pagar(id: string, parcela: number) {
    setFalta((f) => ({ ...f, [id]: pagarParcela(f[id], parcela) }));
    setPago(id);
    window.setTimeout(() => setPago((atual) => (atual === id ? null : atual)), 1600);
  }

  const totais = {
    valor: somarCentavos(emprestimos.map((e) => e.valor)),
    falta: somarCentavos(Object.values(falta)),
    parcela: somarCentavos(emprestimos.map((e) => e.parcela)),
  };

  return (
    <section aria-labelledby="emprestimos-ativos">
      <TituloDeSecao id="emprestimos-ativos">Empréstimos ativos</TituloDeSecao>
      <Bloco className="overflow-x-auto px-3! md:px-6!">
        <table className="w-full text-left text-legenda md:text-corpo">
          <caption className="sr-only">Empréstimos em aberto</caption>
          <thead>
            <tr className="border-b border-borda text-tinta-suave">
              <th scope="col" className={cx(celula, "hidden pt-0 font-medium md:table-cell")}>
                Nº
              </th>
              <th scope="col" className={cx(celula, "pt-0 font-medium")}>
                Valor
              </th>
              <th scope="col" className={cx(celula, "pt-0 font-medium")}>
                Falta pagar
              </th>
              <th scope="col" className={cx(celula, "hidden pt-0 font-medium md:table-cell")}>
                Duração
              </th>
              <th scope="col" className={cx(celula, "hidden pt-0 font-medium md:table-cell")}>
                Juros
              </th>
              <th scope="col" className={cx(celula, "hidden pt-0 font-medium md:table-cell")}>
                Parcela
              </th>
              <th scope="col" className={cx(celula, "pt-0 text-right font-medium")}>
                Pagar
              </th>
            </tr>
          </thead>
          <Escalonado como="tbody" intervalo={0.04}>
            {emprestimos.map((e, i) => (
              <ItemEscalonado key={e.id} como="tr" className="border-b border-borda text-tinta-forte last:border-0">
                <td className={cx(celula, "hidden tabular-nums md:table-cell")}>{String(i + 1).padStart(2, "0")}.</td>
                <td className={cx(celula, "valor-sensivel tabular-nums")}>{formatarMoeda(e.valor)}</td>
                <td className={cx(celula, "tabular-nums")}>
                  <motion.span
                    key={falta[e.id]}
                    initial={{ backgroundColor: "var(--turquesa-clara)" }}
                    animate={{ backgroundColor: "rgb(0 0 0 / 0)" }}
                    transition={{ duration: 1.2 }}
                    className="valor-sensivel -mx-1.5 rounded-miudo px-1.5 py-0.5"
                  >
                    {formatarMoeda(falta[e.id])}
                  </motion.span>
                </td>
                <td className={cx(celula, "hidden md:table-cell")}>{e.meses} meses</td>
                <td className={cx(celula, "hidden tabular-nums md:table-cell")}>
                  {formatarNumero(e.juros, "percentual")}
                </td>
                <td className={cx(celula, "hidden whitespace-nowrap tabular-nums md:table-cell")}>
                  {formatarMoeda(e.parcela)} / mês
                </td>
                <td className={cx(celula, "text-right")}>
                  <Botao
                    variante="contorno"
                    tamanho="sm"
                    forma="pilula"
                    className="w-16 px-0! md:w-[96px]"
                    disabled={falta[e.id] === 0}
                    aria-label={`Pagar parcela do empréstimo ${i + 1}`}
                    onClick={() => pagar(e.id, e.parcela)}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={String(pago === e.id)}
                        className="flex items-center gap-1"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={mola}
                      >
                        {pago === e.id ? (
                          <>
                            <RiCheckLine aria-hidden="true" className="size-4" /> Pago
                          </>
                        ) : falta[e.id] === 0 ? (
                          "Quitado"
                        ) : (
                          "Pagar"
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </Botao>
                </td>
              </ItemEscalonado>
            ))}
          </Escalonado>
          <tfoot>
            <tr className="font-medium text-perigo">
              <th scope="row" className={cx(celula, "hidden pb-0 font-medium md:table-cell")}>
                Total
              </th>
              <td className={cx(celula, "valor-sensivel pb-0 tabular-nums")}>
                <span className="md:hidden">Total: </span>
                {formatarMoeda(totais.valor)}
              </td>
              <td className={cx(celula, "valor-sensivel pb-0 tabular-nums")} aria-live="polite">
                {formatarMoeda(totais.falta)}
              </td>
              <td className={cx(celula, "hidden pb-0 md:table-cell")} />
              <td className={cx(celula, "hidden pb-0 md:table-cell")} />
              <td className={cx(celula, "hidden pb-0 whitespace-nowrap tabular-nums md:table-cell")}>
                {formatarMoeda(totais.parcela)} / mês
              </td>
              <td className={cx(celula, "pb-0")} />
            </tr>
          </tfoot>
        </table>
      </Bloco>
    </section>
  );
}
