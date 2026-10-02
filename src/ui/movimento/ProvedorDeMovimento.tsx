"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { curvaSaida, duracao } from "./ritmo";

/**
 * Raiz do movimento: com `reducedMotion="user"`, quem pediu movimento reduzido ao sistema
 * vê o conteúdo chegar só com opacidade, sem trajeto — em todo componente, de uma vez.
 */
export function ProvedorDeMovimento({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: duracao.media, ease: curvaSaida }}>
      {children}
    </MotionConfig>
  );
}
