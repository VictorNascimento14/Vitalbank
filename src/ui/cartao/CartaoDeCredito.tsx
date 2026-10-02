"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import type { PointerEvent } from "react";
import type { Cartao } from "@/dados";
import { mascararCartao } from "@/dominio/cartao";
import { formatarMoeda } from "@/dominio/dinheiro";
import { cx } from "../cx";

const FACES = {
  escuro: {
    fundo: "bg-(image:--gradiente-cartao-escuro) text-white",
    rotulo: "text-white/70",
    faixa: "bg-(image:--faixa-cartao)",
    chip: "text-white",
    bandeira: "bg-white/50",
  },
  azul: {
    fundo: "bg-(image:--gradiente-cartao-azul) text-white",
    rotulo: "text-white/70",
    faixa: "bg-(image:--faixa-cartao)",
    chip: "text-white",
    bandeira: "bg-white/50",
  },
  claro: {
    fundo: "border border-borda bg-superficie text-tinta",
    rotulo: "text-tinta-suave",
    faixa: "border-t border-borda",
    chip: "text-tinta",
    bandeira: "bg-tinta-suave/50",
  },
} as const;

function Chip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 35 35" fill="none" aria-hidden="true" className={className}>
      <rect x="1.5" y="5" width="32" height="25" rx="5" stroke="currentColor" strokeWidth="2.2" />
      <path
        d="M12 5v7.5M12 22.5V30M23 5v7.5M23 22.5V30M1.5 12.5h8.5M25 12.5h8.5M1.5 22.5h8.5M25 22.5h8.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="10" y="12.5" width="15" height="10" rx="2.5" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

/** Inclinação máxima, em graus. */
const INCLINACAO = 10;

/**
 * O cartão de crédito do kit (350 × 235). Com o mouse em cima, inclina em 3D acompanhando
 * o ponteiro e um reflexo de luz anda pela face. Com movimento reduzido, fica parado.
 */
export function CartaoDeCredito({ cartao, className }: { cartao: Cartao; className?: string }) {
  const face = FACES[cartao.variante];
  const reduzido = useReducedMotion();
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const rotX = useSpring(useTransform(y, [0, 1], [INCLINACAO, -INCLINACAO]), { stiffness: 220, damping: 20 });
  const rotY = useSpring(useTransform(x, [0, 1], [-INCLINACAO, INCLINACAO]), { stiffness: 220, damping: 20 });
  const luzX = useTransform(x, (v) => `${v * 100}%`);
  const luzY = useTransform(y, (v) => `${v * 100}%`);
  const reflexo = useMotionTemplate`radial-gradient(circle at ${luzX} ${luzY}, rgb(255 255 255 / 0.35), transparent 55%)`;
  const brilho = useMotionValue(0);
  const opacidadeDoReflexo = useSpring(brilho, { stiffness: 200, damping: 30 });

  function mover(e: PointerEvent<HTMLDivElement>) {
    if (reduzido || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
    brilho.set(1);
  }

  function sair() {
    x.set(0.5);
    y.set(0.5);
    brilho.set(0);
  }

  const saldo = formatarMoeda(cartao.saldo);
  return (
    <div className={cx("[perspective:1000px]", className)}>
      <motion.article
        aria-label={`Cartão ${cartao.tipo} com final ${cartao.final}, saldo ${saldo}`}
        onPointerMove={mover}
        onPointerLeave={sair}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        whileHover={reduzido ? undefined : { y: -4 }}
        className={cx(
          "relative flex aspect-[350/235] w-full min-w-[265px] flex-col overflow-hidden rounded-cartao font-cartao",
          "shadow-cartao transition-shadow duration-300 hover:shadow-[0_24px_40px_-18px_var(--primaria)]",
          face.fundo,
        )}
      >
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 mix-blend-soft-light"
          style={{ backgroundImage: reflexo, opacity: opacidadeDoReflexo }}
        />
        <div className="flex flex-1 flex-col justify-between px-6 pt-5 pb-4 md:px-7 md:pt-6">
          <div className="flex items-start justify-between">
            <div>
              <p className={cx("text-[11px] md:text-legenda", face.rotulo)}>Saldo</p>
              <p className="text-corpo font-semibold md:text-destaque">{saldo}</p>
            </div>
            <Chip className={cx("size-[29px] md:size-[35px]", face.chip)} />
          </div>
          <dl className="flex gap-12 md:gap-16">
            <div>
              <dt className={cx("text-[10px] uppercase tracking-wide md:text-[12px]", face.rotulo)}>Titular</dt>
              <dd className="text-legenda font-semibold md:text-rotulo">{cartao.titular}</dd>
            </div>
            <div>
              <dt className={cx("text-[10px] uppercase tracking-wide md:text-[12px]", face.rotulo)}>Validade</dt>
              <dd className="text-legenda font-semibold md:text-rotulo">{cartao.validade}</dd>
            </div>
          </dl>
        </div>
        <div className={cx("flex h-[30%] items-center justify-between px-6 md:px-7", face.faixa)}>
          <p className="text-corpo font-semibold tracking-wide md:text-[22px]">
            {mascararCartao(cartao.final, cartao.inicio)}
          </p>
          <span aria-hidden="true" className="flex">
            <span className={cx("size-[27px] rounded-full md:size-[30px]", face.bandeira)} />
            <span className={cx("-ml-3 size-[27px] rounded-full md:size-[30px]", face.bandeira)} />
          </span>
        </div>
      </motion.article>
    </div>
  );
}
