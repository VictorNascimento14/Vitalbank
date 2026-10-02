"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { cx } from "../cx";
import { formatarNumero, type FormatoDeNumero } from "@/dominio/numero";
import { curvaSaida, duracao } from "../movimento/ritmo";
import { escalaLinear, marcasDoEixo } from "./escala";

export interface Serie {
  nome: string;
  /** Nome do token de cor (`primaria`, `turquesa`…). */
  cor: string;
  valores: readonly number[];
}

interface Props {
  titulo: string;
  categorias: readonly string[];
  series: readonly Serie[];
  formato?: FormatoDeNumero;
  /** Largura de cada barra, em unidades do desenho. */
  barra?: number;
  className?: string;
}

const L = 700;
const A = 250;
const M = { topo: 10, dir: 10, base: 34, esq: 56 };

/**
 * Barras agrupadas, arredondadas, que crescem da base em cascata quando aparecem.
 * Passar o mouse sobre uma categoria acende a coluna e mostra os valores; o leitor
 * de tela recebe a mesma informação numa tabela.
 */
export function GraficoDeBarras({ titulo, categorias, series, formato = "inteiro", barra = 15, className }: Props) {
  const [foco, setFoco] = useState<number | null>(null);
  const maximo = Math.max(...series.flatMap((s) => s.valores));
  const marcas = marcasDoEixo(maximo);
  const y = escalaLinear([0, marcas.at(-1)!], [A - M.base, M.topo]);
  const largura = (L - M.esq - M.dir) / categorias.length;
  const vao = barra * 0.7;
  const grupo = series.length * barra + (series.length - 1) * vao;
  const rotulo = (v: number) => formatarNumero(v, formato === "moeda" ? "moeda-compacta" : formato);

  return (
    <figure className={cx("relative", className)}>
      <ul aria-hidden="true" className="mb-3 flex justify-end gap-6">
        {series.map((s) => (
          <li key={s.nome} className="flex items-center gap-2.5 text-legenda text-tinta-suave md:text-rotulo">
            <span className="size-3.5 rounded-full" style={{ background: `var(--${s.cor})` }} />
            {s.nome}
          </li>
        ))}
      </ul>
      <svg viewBox={`0 0 ${L} ${A}`} className="w-full overflow-visible" aria-hidden="true">
        {marcas.map((m) => (
          <g key={m}>
            <line x1={M.esq} x2={L - M.dir} y1={y(m)} y2={y(m)} stroke="var(--borda)" />
            <text x={M.esq - 12} y={y(m)} dy="0.35em" textAnchor="end" className="fill-tinta-suave text-[13px]">
              {rotulo(m)}
            </text>
          </g>
        ))}
        {categorias.map((c, i) => {
          const x0 = M.esq + i * largura;
          const inicio = x0 + (largura - grupo) / 2;
          return (
            <g key={c}>
              <rect
                x={x0 + 4}
                y={M.topo}
                width={largura - 8}
                height={A - M.base - M.topo}
                rx={14}
                className={cx("fill-fundo transition-opacity duration-200", foco === i ? "opacity-100" : "opacity-0")}
              />
              {series.map((s, j) => {
                const v = s.valores[i];
                const topo = y(v);
                return (
                  <motion.rect
                    key={s.nome}
                    x={inicio + j * (barra + vao)}
                    y={topo}
                    width={barra}
                    height={Math.max(y(0) - topo, 0)}
                    rx={barra / 2}
                    fill={`var(--${s.cor})`}
                    style={{ originY: 1, transformBox: "fill-box" }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "0px 0px -40px 0px" }}
                    transition={{ duration: duracao.lenta, ease: curvaSaida, delay: i * 0.06 + j * 0.04 }}
                  />
                );
              })}
              <text x={x0 + largura / 2} y={A - 8} textAnchor="middle" className="fill-tinta-suave text-[13px]">
                {c}
              </text>
              <rect
                x={x0}
                y={0}
                width={largura}
                height={A}
                fill="transparent"
                onPointerEnter={() => setFoco(i)}
                onPointerLeave={() => setFoco(null)}
              />
            </g>
          );
        })}
      </svg>
      <AnimatePresence>
        {foco !== null && (
          <motion.div
            aria-hidden="true"
            key={foco}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duracao.rapida }}
            className="pointer-events-none absolute top-8 z-10 -translate-x-1/2 rounded-campo bg-tinta px-3.5 py-2.5 text-legenda text-white shadow-cartao"
            style={{ left: `${((M.esq + (foco + 0.5) * largura) / L) * 100}%` }}
          >
            <p className="mb-1 font-semibold">{categorias[foco]}</p>
            {series.map((s) => (
              <p key={s.nome} className="flex items-center gap-2 whitespace-nowrap">
                <span className="size-2 rounded-full" style={{ background: `var(--${s.cor})` }} />
                {s.nome}: {formatarNumero(s.valores[foco], formato)}
              </p>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <table className="sr-only">
        <caption>{titulo}</caption>
        <thead>
          <tr>
            <th scope="col">Categoria</th>
            {series.map((s) => (
              <th key={s.nome} scope="col">
                {s.nome}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categorias.map((c, i) => (
            <tr key={c}>
              <th scope="row">{c}</th>
              {series.map((s) => (
                <td key={s.nome}>{formatarNumero(s.valores[i], formato)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
