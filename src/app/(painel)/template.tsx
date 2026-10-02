"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { curvaSaida } from "@/ui/movimento";

/**
 * A cada troca de tela o miolo entra subindo e ganhando opacidade. O `template` é
 * remontado a cada navegação (o `layout`, não): a casca fica parada e só o conteúdo anima.
 */
export default function Transicao({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: curvaSaida }}>
      {children}
    </motion.div>
  );
}
