"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { cx } from "../cx";
import { curvaSaida, duracao, mola } from "../movimento/ritmo";
import { fatias, noCirculo, setor } from "./geometria";

export interface Fatia {
  nome: string;
  /** Peso da fatia (percentual, centavos… — só a proporção importa). */
  valor: number;
  cor: string;
  /** Raio relativo (0–1). O kit desenha cada fatia com um raio. */
  raio?: number;
}

interface Props {
  titulo: string;
  fatias: readonly Fatia[];
  className?: string;
}

const T = 300;
const C = T / 2;
const R = 140;
const AFASTA = 7;
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 0 });

/**
 * Pizza "explodida" do kit: fatias afastadas do centro, cada uma com raio próprio e o
 * rótulo dentro. Ao aparecer, as fatias abrem do centro em cascata; com o mouse, a
 * fatia sai mais um pouco e as outras recuam.
 */
export function GraficoDePizza({ titulo, fatias: dados, className }: Props) {
  const [foco, setFoco] = useState<number | null>(null);
  const partes = fatias(dados.map((d) => d.valor));
  return (
    <figure className={cx("mx-auto w-full max-w-[300px]", className)}>
      <svg viewBox={`0 0 ${T} ${T}`} className="w-full overflow-visible" aria-hidden="true">
        {dados.map((d, i) => {
          const { a0, a1, meio, fracao } = partes[i];
          const r = R * (d.raio ?? 1);
          const desloc = noCirculo(0, 0, foco === i ? AFASTA * 2.4 : AFASTA, meio);
          const rotulo = noCirculo(C, C, r * 0.6, meio);
          return (
            <motion.g
              key={d.nome}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: duracao.lenta, ease: curvaSaida, delay: i * 0.1 }}
              style={{ originX: `${C}px`, originY: `${C}px` }}
              onPointerEnter={() => setFoco(i)}
              onPointerLeave={() => setFoco(null)}
            >
              <motion.g
                animate={{ x: desloc.x, y: desloc.y, opacity: foco === null || foco === i ? 1 : 0.55 }}
                transition={mola}
              >
                <path d={setor(C, C, r, a0, a1)} fill={`var(--${d.cor})`} className="cursor-pointer" />
                <text
                  x={rotulo.x}
                  y={rotulo.y}
                  textAnchor="middle"
                  className="pointer-events-none fill-white font-bold"
                >
                  <tspan x={rotulo.x} dy="-0.2em" className="text-[16px]">
                    {pct.format(fracao)}
                  </tspan>
                  <tspan x={rotulo.x} dy="1.25em" className="text-[11px] font-semibold">
                    {d.nome}
                  </tspan>
                </text>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
      <figcaption className="sr-only">
        {titulo}: {dados.map((d, i) => `${d.nome} ${pct.format(partes[i].fracao)}`).join(", ")}
      </figcaption>
    </figure>
  );
}
