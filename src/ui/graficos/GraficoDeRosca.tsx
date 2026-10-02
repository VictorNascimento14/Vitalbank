"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { formatarNumero, type FormatoDeNumero } from "@/dominio/numero";
import { cx } from "../cx";
import { curvaSaida, duracao } from "../movimento/ritmo";
import { fatias, setor } from "./geometria";

export interface Arco {
  nome: string;
  valor: number;
  cor: string;
  /** Espessura relativa (0–1): no kit, cada arco tem a sua. */
  espessura?: number;
}

interface Props {
  titulo: string;
  arcos: readonly Arco[];
  formato?: FormatoDeNumero;
  className?: string;
}

const T = 240;
const C = T / 2;
const FURO = 38;
const MAX = 100;
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 0 });

/**
 * Rosca com arcos de espessura própria e legenda embaixo. A rosca abre do centro
 * girando; com o mouse (no arco ou na legenda), o arco cresce e o centro mostra a parte.
 * O `d` do arco não é animado: o motion interpolaria as flags de arco (0/1) como números.
 */
export function GraficoDeRosca({ titulo, arcos, formato = "moeda", className }: Props) {
  const [foco, setFoco] = useState<number | null>(null);
  const partes = fatias(arcos.map((a) => a.valor));
  const raio = (a: Arco) => FURO + (MAX - FURO) * (a.espessura ?? 1);
  return (
    <figure className={cx("flex flex-col items-center gap-6", className)}>
      <div className="relative w-full max-w-[240px]">
        <motion.svg
          viewBox={`0 0 ${T} ${T}`}
          className="w-full overflow-visible"
          aria-hidden="true"
          initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
          whileInView={{ rotate: 0, scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: curvaSaida }}
        >
          {arcos.map((a, i) => (
            <motion.path
              key={a.nome}
              d={setor(C, C, raio(a), partes[i].a0, partes[i].a1, FURO)}
              animate={{ scale: foco === i ? 1.08 : 1 }}
              transition={{ duration: duracao.media, ease: curvaSaida }}
              style={{ originX: `${C}px`, originY: `${C}px` }}
              fill={`var(--${a.cor})`}
              stroke="var(--superficie)"
              strokeWidth={2}
              opacity={foco === null || foco === i ? 1 : 0.5}
              className="cursor-pointer transition-opacity duration-200"
              onPointerEnter={() => setFoco(i)}
              onPointerLeave={() => setFoco(null)}
            />
          ))}
        </motion.svg>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          {foco !== null && (
            <motion.div key={foco} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <p className="text-legenda font-bold text-tinta">{pct.format(partes[foco].fracao)}</p>
            </motion.div>
          )}
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
        {arcos.map((a, i) => (
          <li
            key={a.nome}
            onPointerEnter={() => setFoco(i)}
            onPointerLeave={() => setFoco(null)}
            className={cx(
              "flex cursor-default items-center gap-2.5 text-legenda transition-colors md:text-rotulo",
              foco === i ? "text-tinta" : "text-tinta-suave",
            )}
          >
            <span className="size-3.5 shrink-0 rounded-full" style={{ background: `var(--${a.cor})` }} />
            {a.nome}
            <span className="sr-only">
              : {formatarNumero(a.valor, formato)} ({pct.format(partes[i].fracao)})
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="sr-only">{titulo}</figcaption>
    </figure>
  );
}
