"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { curvaSaida, duracao } from "./ritmo";

interface Props {
  children: ReactNode;
  className?: string;
  /** Segundos de espera antes de entrar. */
  atraso?: number;
  /** Quanto o bloco sobe ao entrar, em px. */
  deslocamento?: number;
}

/**
 * Entra na tela subindo e ganhando opacidade na primeira vez que aparece na viewport.
 * O disparo é por margem, não por fração: um bloco mais alto que a tela nunca atinge
 * "50% visível" e ficaria invisível para sempre.
 */
export function Surgir({ children, className, atraso = 0, deslocamento = 16 }: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: deslocamento }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: duracao.lenta, ease: curvaSaida, delay: atraso }}
    >
      {children}
    </motion.div>
  );
}
