"use client";

import { RiBankCardFill, RiHandCoinFill, RiSafe2Fill, RiShieldStarFill, RiWallet3Fill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import type { listarServicos } from "@/dados";
import { Bloco, Botao, PastilhaDeIcone, TituloDeSecao, type Tom } from "@/ui";
import { curvaSaida, duracao, Escalonado, ItemEscalonado } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof listarServicos>>;

const ICONES: Record<Dados[number]["icone"], { tom: Tom; icone: ReactNode }> = {
  emprestimo: { tom: "rosa", icone: <RiHandCoinFill /> },
  conta: { tom: "amarelo", icone: <RiWallet3Fill /> },
  poupanca: { tom: "rosa", icone: <RiSafe2Fill /> },
  cartao: { tom: "azul", icone: <RiBankCardFill /> },
  seguro: { tom: "turquesa", icone: <RiShieldStarFill /> },
};

export function ListaDeServicos({ servicos }: { servicos: Dados }) {
  const [aberto, setAberto] = useState<string | null>(null);
  return (
    <section aria-labelledby="lista-de-servicos">
      <TituloDeSecao id="lista-de-servicos">Serviços do banco</TituloDeSecao>
      <Escalonado como="ul" className="flex flex-col gap-4">
        {servicos.map((s) => {
          const { tom, icone } = ICONES[s.icone];
          const expandido = aberto === s.id;
          return (
            <ItemEscalonado key={s.id} como="li">
              <Bloco className="group !py-4">
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 lg:grid-cols-[auto_minmax(0,1.4fr)_repeat(3,minmax(0,1fr))_8.5rem]">
                  <PastilhaDeIcone tom={tom} tamanho="sm" className="md:size-[60px]">
                    {icone}
                  </PastilhaDeIcone>
                  <div className="min-w-0">
                    <p className="truncate text-rotulo font-medium text-tinta-forte md:text-corpo">{s.nome}</p>
                    <p className="truncate text-legenda text-tinta-suave md:text-rotulo">{s.resumo}</p>
                  </div>
                  {s.atributos.map((a) => (
                    <div key={a.rotulo} className="hidden min-w-0 lg:block">
                      <p className="truncate text-corpo font-medium text-tinta-forte">{a.rotulo}</p>
                      <p className="truncate text-rotulo text-tinta-suave">{a.valor}</p>
                    </div>
                  ))}
                  <Botao
                    variante="contorno"
                    tamanho="sm"
                    forma="pilula"
                    aria-expanded={expandido}
                    aria-controls={`servico-${s.id}`}
                    onClick={() => setAberto(expandido ? null : s.id)}
                    className="justify-self-end border-tinta-suave/60 text-tinta-suave hover:border-primaria-viva md:w-[130px]"
                  >
                    {expandido ? "Fechar" : "Ver detalhes"}
                  </Botao>
                </div>
                <AnimatePresence initial={false}>
                  {expandido && (
                    <motion.div
                      id={`servico-${s.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: duracao.media, ease: curvaSaida }}
                      className="overflow-hidden"
                    >
                      <div className="mt-4 border-t border-borda pt-4">
                        <p className="text-rotulo text-tinta-forte">{s.descricao}</p>
                        <dl className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3 lg:hidden">
                          {s.atributos.map((a) => (
                            <div key={a.rotulo}>
                              <dt className="text-legenda text-tinta-suave">{a.rotulo}</dt>
                              <dd className="text-rotulo font-medium text-tinta-forte">{a.valor}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
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
