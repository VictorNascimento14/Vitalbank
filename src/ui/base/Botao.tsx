"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";
import { cx } from "../cx";
import { duracao } from "../movimento/ritmo";

type Variante = "solido" | "contorno" | "fantasma";
type Tamanho = "md" | "sm";
type Forma = "campo" | "pilula";

interface Props extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  variante?: Variante;
  tamanho?: Tamanho;
  forma?: Forma;
  /** Ícone depois do texto (a seta do "Enviar", por exemplo). */
  icone?: ReactNode;
}

const variantes: Record<Variante, string> = {
  solido: "bg-primaria text-white shadow-[0_8px_20px_-8px_var(--primaria)] hover:bg-primaria-viva",
  contorno: "border border-tinta text-tinta hover:border-primaria hover:bg-primaria hover:text-white",
  fantasma: "text-primaria-viva hover:bg-azul-claro",
};

const tamanhos: Record<Tamanho, string> = {
  md: "h-12 px-8 text-rotulo md:text-menu",
  sm: "h-9 px-5 text-legenda md:text-rotulo",
};

/**
 * Botão do app. `type="button"` por padrão: sem isso, dentro de um `<form>` ele viraria
 * `submit`. Quem envia formulário passa `type="submit"`.
 */
export function Botao({
  children,
  variante = "solido",
  tamanho = "md",
  forma = "campo",
  icone,
  className,
  type = "button",
  disabled,
  ...resto
}: Props) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={{ duration: duracao.rapida }}
      className={cx(
        "inline-flex items-center justify-center gap-2.5 font-medium whitespace-nowrap select-none",
        "transition-colors duration-200 ease-saida",
        "focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:ring-offset-2 focus-visible:outline-none",
        "disabled:cursor-not-allowed disabled:opacity-50",
        forma === "pilula" ? "rounded-full" : "rounded-campo",
        variantes[variante],
        tamanhos[tamanho],
        className,
      )}
      {...resto}
    >
      {children}
      {icone}
    </motion.button>
  );
}
