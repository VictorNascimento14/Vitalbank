"use client";

import { RiArrowDownSLine, RiBankCardFill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Cartao } from "@/dados";
import { finalDoCartao } from "@/dominio/cartao";
import { formatarMoeda } from "@/dominio/dinheiro";
import { Bloco, cx, PastilhaDeIcone, TituloDeSecao, type Tom } from "@/ui";
import { curvaSaida, duracao, Escalonado, ItemEscalonado } from "@/ui/movimento";

const TONS: Tom[] = ["azul", "rosa", "amarelo"];

function Campo({ rotulo, valor, className }: { rotulo: string; valor: string; className?: string }) {
  return (
    <div className={cx("min-w-0", className)}>
      <p className="text-legenda font-medium text-tinta-forte md:text-corpo">{rotulo}</p>
      <p className="truncate text-legenda text-tinta-suave md:text-rotulo">{valor}</p>
    </div>
  );
}

/** Lista dos cartões; "Ver detalhes" abre a ficha do cartão logo abaixo da linha. */
export function ListaDeCartoes({ cartoes }: { cartoes: readonly Cartao[] }) {
  const [aberto, setAberto] = useState<string | null>(null);
  return (
    <section aria-labelledby="lista-de-cartoes" className="flex flex-col">
      <TituloDeSecao id="lista-de-cartoes">Lista de cartões</TituloDeSecao>
      <Escalonado como="ul" className="flex flex-1 flex-col gap-4">
        {cartoes.map((c, i) => {
          const expandido = aberto === c.id;
          const painel = `detalhes-${c.id}`;
          return (
            <ItemEscalonado key={c.id} como="li">
              <Bloco className="group !py-4">
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 md:grid-cols-[auto_repeat(4,minmax(0,1fr))_8.5rem]">
                  <PastilhaDeIcone tom={TONS[i % TONS.length]} tamanho="sm" className="md:size-[60px]">
                    <RiBankCardFill />
                  </PastilhaDeIcone>
                  <Campo rotulo="Tipo" valor={c.tipo === "principal" ? "Principal" : "Adicional"} />
                  <Campo rotulo="Banco" valor={c.banco} className="hidden md:block" />
                  <Campo rotulo="Número" valor={finalDoCartao(c.final)} className="hidden md:block" />
                  <Campo rotulo="Titular" valor={c.titular} className="hidden md:block" />
                  <button
                    type="button"
                    aria-expanded={expandido}
                    aria-controls={painel}
                    onClick={() => setAberto(expandido ? null : c.id)}
                    className="flex items-center gap-1 justify-self-end rounded-miudo px-2 py-1 text-legenda font-medium text-primaria-viva transition-colors hover:bg-azul-claro focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:outline-none md:text-rotulo"
                  >
                    {expandido ? "Fechar" : "Ver detalhes"}
                    <motion.span animate={{ rotate: expandido ? 180 : 0 }} transition={{ duration: duracao.media }}>
                      <RiArrowDownSLine aria-hidden="true" className="size-4" />
                    </motion.span>
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {expandido && (
                    <motion.div
                      id={painel}
                      key="painel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: duracao.media, ease: curvaSaida }}
                      className="overflow-hidden"
                    >
                      <dl className="mt-4 grid grid-cols-2 gap-4 border-t border-borda pt-4 md:grid-cols-4">
                        {[
                          ["Número", finalDoCartao(c.final)],
                          ["Validade", c.validade],
                          ["Saldo", formatarMoeda(c.saldo)],
                          ["Situação", "Ativo"],
                        ].map(([rotulo, valor]) => (
                          <div key={rotulo}>
                            <dt className="text-legenda text-tinta-suave">{rotulo}</dt>
                            <dd
                              className={cx(
                                "text-rotulo font-medium",
                                rotulo === "Situação" ? "text-sucesso" : "text-tinta-forte",
                                rotulo === "Saldo" && "valor-sensivel",
                              )}
                            >
                              {valor}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Bloco>
            </ItemEscalonado>
          );
        })}
      </Escalonado>
    </section>
  );
}
