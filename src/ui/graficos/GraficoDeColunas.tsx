"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cx } from "../cx";
import { formatarNumero, type FormatoDeNumero } from "../movimento/NumeroAnimado";
import { curvaSaida, duracao, mola } from "../movimento/ritmo";

interface Props {
  titulo: string;
  rotulos: readonly string[];
  valores: readonly number[];
  /** Coluna em destaque quando o mouse não está sobre nenhuma (padrão: a última). */
  destaque?: number;
  formato?: FormatoDeNumero;
  className?: string;
}

const L = 300;
const A = 170;
const TOPO = 26;
const BASE = 22;

/**
 * Colunas sem eixo, com uma em destaque (turquesa, valor em cima) — "My Expense" do kit.
 * O destaque segue o mouse; ao sair, volta para a coluna padrão.
 */
export function GraficoDeColunas({ titulo, rotulos, valores, destaque, formato = "inteiro", className }: Props) {
  const padrao = destaque ?? valores.length - 1;
  const [foco, setFoco] = useState<number | null>(null);
  const ativa = foco ?? padrao;
  const maximo = Math.max(...valores) || 1;
  const passo = L / valores.length;
  const largura = Math.min(passo * 0.62, 46);
  const altura = (v: number) => ((A - TOPO - BASE) * v) / maximo;

  return (
    <figure className={cx("relative", className)}>
      <svg viewBox={`0 0 ${L} ${A}`} className="w-full overflow-visible" aria-hidden="true">
        {valores.map((v, i) => {
          const x = i * passo + (passo - largura) / 2;
          const h = altura(v);
          const y = A - BASE - h;
          const ligada = i === ativa;
          return (
            <g key={rotulos[i]} onPointerEnter={() => setFoco(i)} onPointerLeave={() => setFoco(null)}>
              <rect x={i * passo} y={0} width={passo} height={A} fill="transparent" />
              <motion.rect
                x={x}
                y={y}
                width={largura}
                height={h}
                rx={10}
                animate={{ fill: ligada ? "var(--turquesa)" : "var(--borda)" }}
                style={{ originY: 1, transformBox: "fill-box" }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                transition={{
                  scaleY: { duration: duracao.lenta, ease: curvaSaida, delay: i * 0.07 },
                  fill: { duration: duracao.rapida },
                }}
              />
              <text
                x={x + largura / 2}
                y={A - 4}
                textAnchor="middle"
                className={cx("text-[12px] transition-colors", ligada ? "fill-tinta" : "fill-tinta-suave")}
              >
                {rotulos[i]}
              </text>
            </g>
          );
        })}
        <AnimatePresence>
          <motion.text
            key={ativa}
            x={ativa * passo + passo / 2}
            y={A - BASE - altura(valores[ativa]) - 8}
            textAnchor="middle"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={mola}
            className="fill-tinta text-[12px] font-semibold"
          >
            {formatarNumero(valores[ativa], formato)}
          </motion.text>
        </AnimatePresence>
      </svg>
      <table className="sr-only">
        <caption>{titulo}</caption>
        <tbody>
          {rotulos.map((r, i) => (
            <tr key={r}>
              <th scope="row">{r}</th>
              <td>{formatarNumero(valores[i], formato)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
