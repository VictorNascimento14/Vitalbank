"use client";

import { motion } from "motion/react";
import { cx } from "../cx";
import { curvaSaida } from "../movimento/ritmo";

interface Props {
  /** De 0 a 1. */
  valor: number;
  rotulo: string;
  /** Texto lido pelo leitor de tela ("2.520 pontos para o Diamante"). */
  descricao?: string;
  className?: string;
  /** Classe da faixa cheia (cor). */
  cor?: string;
}

/** Barra que enche até o valor quando aparece. Só `scaleX`: nada de animar largura. */
export function BarraDeProgresso({ valor, rotulo, descricao, className, cor = "bg-primaria" }: Props) {
  const v = Math.min(1, Math.max(0, valor));
  return (
    <div
      role="progressbar"
      aria-label={rotulo}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      aria-valuetext={descricao}
      className={cx("h-3 overflow-hidden rounded-full bg-borda", className)}
    >
      <motion.div
        className={cx("h-full origin-left rounded-full", cor)}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: v }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: curvaSaida, delay: 0.2 }}
      />
    </div>
  );
}
