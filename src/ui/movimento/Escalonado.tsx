"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { curvaSaida, duracao } from "./ritmo";

type Tag = "div" | "ul" | "ol" | "li" | "tbody" | "tr" | "section";

const grupo = (intervalo: number): Variants => ({
  oculto: {},
  visivel: { transition: { staggerChildren: intervalo, delayChildren: 0.05 } },
});

const item: Variants = {
  oculto: { opacity: 0, y: 12 },
  visivel: { opacity: 1, y: 0, transition: { duration: duracao.lenta, ease: curvaSaida } },
};

interface GrupoProps {
  children: ReactNode;
  como?: Tag;
  className?: string;
  /** Segundos entre um item e o próximo. */
  intervalo?: number;
}

/**
 * Lista que entra em cascata: cada `ItemEscalonado` filho chega um pouco depois do anterior.
 * O grupo dispara uma vez, quando aparece na tela; os itens só herdam o estado.
 */
export function Escalonado({ children, como = "div", className, intervalo = 0.06 }: GrupoProps) {
  const Componente = motion[como];
  return (
    <Componente
      className={className}
      variants={grupo(intervalo)}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
    >
      {children}
    </Componente>
  );
}

interface ItemProps {
  children: ReactNode;
  como?: Tag;
  className?: string;
}

export function ItemEscalonado({ children, como = "div", className }: ItemProps) {
  const Componente = motion[como];
  return (
    <Componente className={className} variants={item}>
      {children}
    </Componente>
  );
}
