"use client";

import { RiEyeLine, RiEyeOffLine } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore } from "react";
import { cx } from "../cx";
import { mola } from "../movimento/ritmo";
import { assinarOcultar, definirOcultar, valoresOcultos } from "./ocultar";

/** O olho do cabeçalho: borra saldos e valores para quem está olhando por cima do ombro. */
export function BotaoOcultarValores({ className }: { className?: string }) {
  const ocultos = useSyncExternalStore(assinarOcultar, valoresOcultos, () => false);
  return (
    <button
      type="button"
      aria-pressed={ocultos}
      aria-label="Ocultar valores"
      onClick={() => definirOcultar(!ocultos)}
      className={cx(
        "grid size-10 shrink-0 place-items-center rounded-full bg-fundo transition-colors duration-200 ease-saida hover:bg-azul-claro lg:size-[50px]",
        "focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:outline-none",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={String(ocultos)}
          initial={{ scaleY: 0.1, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          exit={{ scaleY: 0.1, opacity: 0 }}
          transition={{ ...mola, stiffness: 600 }}
          className={ocultos ? "text-primaria" : "text-tinta-suave"}
        >
          {ocultos ? (
            <RiEyeOffLine aria-hidden="true" className="size-5 lg:size-6" />
          ) : (
            <RiEyeLine aria-hidden="true" className="size-5 lg:size-6" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
