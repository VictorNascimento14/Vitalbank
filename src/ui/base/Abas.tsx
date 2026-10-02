"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { cx } from "../cx";
import { duracao, mola } from "../movimento/ritmo";

export interface Aba {
  id: string;
  rotulo: string;
  conteudo: ReactNode;
}

interface Props {
  abas: readonly Aba[];
  /** Controlado. */
  ativa?: string;
  aoMudar?: (id: string) => void;
  className?: string;
  /** Nome do grupo para o leitor de tela. */
  rotulo: string;
}

/**
 * Abas no padrão WAI-ARIA: setas trocam de aba, Home/End vão às pontas, e só a aba ativa
 * entra no Tab. O sublinhado desliza até a aba nova (`layoutId`), e o painel troca com um fade.
 */
export function Abas({ abas, ativa, aoMudar, className, rotulo }: Props) {
  const base = useId();
  const [interna, setInterna] = useState(abas[0]?.id);
  const atual = ativa ?? interna;
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

  function escolher(id: string) {
    if (ativa === undefined) setInterna(id);
    aoMudar?.(id);
  }

  function teclado(e: KeyboardEvent, i: number) {
    const ultimo = abas.length - 1;
    const alvo = { ArrowRight: i === ultimo ? 0 : i + 1, ArrowLeft: i === 0 ? ultimo : i - 1, Home: 0, End: ultimo }[
      e.key
    ];
    if (alvo === undefined) return;
    e.preventDefault();
    refs.current[alvo]?.focus();
    escolher(abas[alvo].id);
  }

  const painel = abas.find((a) => a.id === atual);

  return (
    <div className={className}>
      <div role="tablist" aria-label={rotulo} className="flex gap-6 border-b border-borda md:gap-14">
        {abas.map((aba, i) => {
          const selecionada = aba.id === atual;
          return (
            <button
              key={aba.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${base}-aba-${aba.id}`}
              role="tab"
              type="button"
              aria-selected={selecionada}
              aria-controls={`${base}-painel`}
              tabIndex={selecionada ? 0 : -1}
              onClick={() => escolher(aba.id)}
              onKeyDown={(e) => teclado(e, i)}
              className={cx(
                "relative -mb-px px-1 pb-3 text-rotulo font-medium transition-colors duration-200 md:px-4 md:text-corpo",
                "focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:ring-offset-2 focus-visible:outline-none",
                selecionada ? "text-primaria" : "text-tinta-suave hover:text-tinta",
              )}
            >
              {aba.rotulo}
              {selecionada && (
                <motion.span
                  layoutId={`${base}-sublinhado`}
                  transition={mola}
                  className="absolute inset-x-0 bottom-0 h-[3px] rounded-t-full bg-primaria"
                />
              )}
            </button>
          );
        })}
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={atual}
          id={`${base}-painel`}
          role="tabpanel"
          aria-labelledby={`${base}-aba-${atual}`}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: duracao.rapida }}
          className="pt-6"
        >
          {painel?.conteudo}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
