"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { motion } from "motion/react";
import { useId } from "react";
import { cx } from "../cx";
import { mola } from "../movimento/ritmo";

interface Props {
  pagina: number;
  total: number;
  aoMudar: (pagina: number) => void;
  className?: string;
}

const seta =
  "flex items-center gap-1 rounded-miudo px-2 py-1.5 text-rotulo font-medium text-primaria transition-colors hover:bg-azul-claro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaria-viva disabled:pointer-events-none disabled:opacity-40";

/** Paginação do kit: "‹ Anterior 1 2 3 4 Próxima ›", com a página atual numa pílula que desliza. */
export function Paginacao({ pagina, total, aoMudar, className }: Props) {
  const id = useId();
  if (total <= 1) return null;
  return (
    <nav aria-label="Paginação" className={cx("flex items-center justify-end gap-1 md:gap-2", className)}>
      <button type="button" className={seta} disabled={pagina === 1} onClick={() => aoMudar(pagina - 1)}>
        <RiArrowLeftSLine aria-hidden="true" className="size-5" />
        Anterior
      </button>
      <ul className="flex gap-1">
        {Array.from({ length: total }, (_, i) => i + 1).map((n) => {
          const atual = n === pagina;
          return (
            <li key={n}>
              <button
                type="button"
                aria-current={atual ? "page" : undefined}
                aria-label={`Página ${n}`}
                onClick={() => aoMudar(n)}
                className={cx(
                  "relative grid size-10 place-items-center rounded-miudo text-rotulo font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:outline-none",
                  atual ? "text-white" : "text-primaria hover:bg-azul-claro",
                )}
              >
                {atual && (
                  <motion.span
                    layoutId={`${id}-atual`}
                    transition={mola}
                    className="absolute inset-0 rounded-miudo bg-primaria"
                  />
                )}
                <span className="relative">{n}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <button type="button" className={seta} disabled={pagina === total} onClick={() => aoMudar(pagina + 1)}>
        Próxima
        <RiArrowRightSLine aria-hidden="true" className="size-5" />
      </button>
    </nav>
  );
}
