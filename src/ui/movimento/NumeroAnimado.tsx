"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { formatarNumero, type FormatoDeNumero } from "@/dominio/numero";
import { curvaSaida } from "./ritmo";

interface Props {
  valor: number;
  formato?: FormatoDeNumero;
  /** Segundos da contagem. */
  duracao?: number;
  className?: string;
}

/**
 * Conta de zero até o valor quando aparece na tela. O texto animado é `aria-hidden` e o
 * valor final fica em `sr-only`: o texto muda dezenas de vezes por segundo, e dentro de
 * uma região `aria-live` isso viraria uma enxurrada de anúncios.
 */
export function NumeroAnimado({ valor, formato = "inteiro", duracao = 1.2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const visivel = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduzido = useReducedMotion();
  const final = formatarNumero(valor, formato);

  useEffect(() => {
    const alvo = ref.current;
    if (!alvo || !visivel || reduzido) return;
    const controle = animate(0, valor, {
      duration: duracao,
      ease: curvaSaida,
      onUpdate: (v) => {
        alvo.textContent = formatarNumero(v, formato);
      },
    });
    return () => controle.stop();
  }, [visivel, reduzido, valor, formato, duracao]);

  return (
    <span className={className}>
      <span ref={ref} aria-hidden="true" className="tabular-nums">
        {final}
      </span>
      <span className="sr-only">{final}</span>
    </span>
  );
}
