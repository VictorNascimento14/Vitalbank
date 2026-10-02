"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { formatarMoeda } from "@/dominio/dinheiro";
import { curvaSaida } from "./ritmo";

export type FormatoDeNumero = "moeda" | "moeda-compacta" | "inteiro" | "percentual";

const inteiro = new Intl.NumberFormat("pt-BR");
const percentual = new Intl.NumberFormat("pt-BR", {
  style: "percent",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** `valor` em centavos para moeda; em pontos-base (1/100 de %) para percentual. */
export function formatarNumero(valor: number, formato: FormatoDeNumero): string {
  const redondo = Math.round(valor);
  switch (formato) {
    case "moeda":
      return formatarMoeda(redondo);
    case "moeda-compacta":
      return formatarMoeda(redondo, { compacto: true });
    case "percentual":
      return percentual.format(redondo / 10000);
    case "inteiro":
      return inteiro.format(redondo);
  }
}

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
