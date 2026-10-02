"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState, type PointerEvent } from "react";
import { cx } from "../cx";
import { formatarNumero, type FormatoDeNumero } from "../movimento/NumeroAnimado";
import { curvaSaida, duracao } from "../movimento/ritmo";
import { caminhoSuave, escalaLinear, marcasDoEixo } from "./escala";

interface Props {
  titulo: string;
  rotulos: readonly string[];
  valores: readonly number[];
  /** Token da cor da linha. */
  cor?: string;
  formato?: FormatoDeNumero;
  /** Preenche abaixo da linha com degradê (Histórico de saldo). */
  area?: boolean;
  /** Curva suave; sem isso, segmentos retos (Investimento anual). */
  suave?: boolean;
  /** Bolinhas nos pontos. */
  pontos?: boolean;
  /** Grade tracejada nos dois eixos, como no Histórico de saldo. */
  gradeTracejada?: boolean;
  className?: string;
}

const L = 640;
const A = 240;
const M = { topo: 14, dir: 14, base: 32, esq: 58 };

/**
 * Linha (ou área) que se desenha da esquerda para a direita ao aparecer. Com o mouse,
 * uma guia vertical marca o ponto mais próximo e mostra o valor.
 */
export function GraficoDeLinha({
  titulo,
  rotulos,
  valores,
  cor = "primaria",
  formato = "inteiro",
  area,
  suave = true,
  pontos,
  gradeTracejada,
  className,
}: Props) {
  const id = useId().replace(/:/g, "");
  const [foco, setFoco] = useState<number | null>(null);
  const marcas = marcasDoEixo(Math.max(...valores));
  const x = escalaLinear([0, valores.length - 1], [M.esq + 8, L - M.dir - 8]);
  const y = escalaLinear([0, marcas.at(-1)!], [A - M.base, M.topo]);
  const pts = valores.map((v, i) => ({ x: x(i), y: y(v) }));
  const linha = suave ? caminhoSuave(pts) : pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");
  const base = y(0);
  const preenchimento = `${linha} L${pts.at(-1)!.x},${base} L${pts[0].x},${base} Z`;
  const eixo = (v: number) => formatarNumero(v, formato === "moeda" ? "moeda-compacta" : formato);
  const cssCor = `var(--${cor})`;

  function mover(e: PointerEvent<SVGRectElement>) {
    const caixa = e.currentTarget.ownerSVGElement!.getBoundingClientRect();
    const px = ((e.clientX - caixa.left) / caixa.width) * L;
    let melhor = 0;
    for (let i = 1; i < pts.length; i++) if (Math.abs(pts[i].x - px) < Math.abs(pts[melhor].x - px)) melhor = i;
    setFoco(melhor);
  }

  const visivel = { once: true, margin: "0px 0px -40px 0px" } as const;
  return (
    <figure className={cx("relative", className)}>
      <svg viewBox={`0 0 ${L} ${A}`} className="w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id={`area-${id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={cssCor} stopOpacity="0.28" />
            <stop offset="100%" stopColor={cssCor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {marcas.map((m) => (
          <g key={m}>
            <line
              x1={M.esq}
              x2={L - M.dir}
              y1={y(m)}
              y2={y(m)}
              stroke={gradeTracejada ? "var(--borda-campo)" : "var(--borda)"}
              strokeDasharray={gradeTracejada ? "4 5" : undefined}
            />
            <text x={M.esq - 12} y={y(m)} dy="0.35em" textAnchor="end" className="fill-tinta-suave text-[13px]">
              {eixo(m)}
            </text>
          </g>
        ))}
        {gradeTracejada &&
          pts.map((p, i) => (
            <line key={i} x1={p.x} x2={p.x} y1={M.topo} y2={base} stroke="var(--borda-campo)" strokeDasharray="4 5" />
          ))}
        {rotulos.map((r, i) => (
          <text key={r + i} x={pts[i].x} y={A - 8} textAnchor="middle" className="fill-tinta-suave text-[13px]">
            {r}
          </text>
        ))}
        {area && (
          <motion.path
            d={preenchimento}
            fill={`url(#area-${id})`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={visivel}
            transition={{ duration: duracao.lenta, delay: 0.7 }}
          />
        )}
        <motion.path
          d={linha}
          fill="none"
          stroke={cssCor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={visivel}
          transition={{ duration: 1.4, ease: curvaSaida }}
        />
        {pontos &&
          pts.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={5}
              fill="var(--superficie)"
              stroke={cssCor}
              strokeWidth={3}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={visivel}
              style={{ transformBox: "fill-box", originX: 0.5, originY: 0.5 }}
              transition={{ delay: 0.3 + (i / pts.length) * 1.1, duration: duracao.media }}
            />
          ))}
        {foco !== null && (
          <g>
            <line x1={pts[foco].x} x2={pts[foco].x} y1={M.topo} y2={base} stroke={cssCor} strokeOpacity="0.35" strokeWidth={1.5} />
            <circle cx={pts[foco].x} cy={pts[foco].y} r={7} fill={cssCor} stroke="var(--superficie)" strokeWidth={3} />
          </g>
        )}
        <rect
          x={M.esq}
          y={0}
          width={L - M.esq - M.dir}
          height={A}
          fill="transparent"
          onPointerMove={mover}
          onPointerLeave={() => setFoco(null)}
        />
      </svg>
      <AnimatePresence>
        {foco !== null && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duracao.rapida }}
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[130%] rounded-campo bg-tinta px-3 py-2 text-legenda whitespace-nowrap text-white shadow-cartao"
            style={{ left: `${(pts[foco].x / L) * 100}%`, top: `${(pts[foco].y / A) * 100}%` }}
          >
            <span className="mr-1.5 opacity-70">{rotulos[foco]}</span>
            <span className="font-semibold">{formatarNumero(valores[foco], formato)}</span>
          </motion.div>
        )}
      </AnimatePresence>
      <table className="sr-only">
        <caption>{titulo}</caption>
        <tbody>
          {rotulos.map((r, i) => (
            <tr key={r + i}>
              <th scope="row">{r}</th>
              <td>{formatarNumero(valores[i], formato)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
