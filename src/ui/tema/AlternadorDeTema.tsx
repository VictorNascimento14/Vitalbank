"use client";

import { RiMoonFill, RiSunFill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useSyncExternalStore, type MouseEvent } from "react";
import { cx } from "../cx";
import { mola } from "../movimento/ritmo";
import { aplicarTema, assinarTema, temaEmUso, type Tema } from "./tema";

/**
 * Sol/lua no cabeçalho. Onde o navegador tem View Transitions (e sem movimento reduzido),
 * o tema novo se espalha em círculo a partir do botão; nos outros, troca na hora.
 */
export function AlternadorDeTema({ className }: { className?: string }) {
  // No servidor não há tema (null); no navegador, lê do <html> e acompanha as mudanças.
  const tema = useSyncExternalStore(assinarTema, temaEmUso, () => null);

  function alternar(e: MouseEvent<HTMLButtonElement>) {
    const novo: Tema = temaEmUso() === "escuro" ? "claro" : "escuro";
    const trocar = () => aplicarTema(novo);
    const reduzido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduzido) return trocar();
    const raiz = document.documentElement;
    raiz.style.setProperty("--vt-x", `${e.clientX}px`);
    raiz.style.setProperty("--vt-y", `${e.clientY}px`);
    document.startViewTransition(trocar);
  }

  const escuro = tema === "escuro";
  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={escuro ? "Usar tema claro" : "Usar tema escuro"}
      className={cx(
        "group grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-fundo transition-colors duration-200 ease-saida hover:bg-azul-claro lg:size-[50px]",
        "focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:outline-none",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={escuro ? "sol" : "lua"}
          initial={{ rotate: -90, scale: 0, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 90, scale: 0, opacity: 0 }}
          transition={mola}
          className="text-tinta-suave"
        >
          {escuro ? (
            <RiSunFill aria-hidden="true" className="size-5 lg:size-6" />
          ) : (
            <RiMoonFill aria-hidden="true" className="size-5 lg:size-6" />
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
