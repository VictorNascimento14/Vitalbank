import type { ReactNode } from "react";
import { cx } from "../cx";

export type Tom = "amarelo" | "azul" | "turquesa" | "rosa" | "primaria" | "laranja";

const TONS: Record<Tom, string> = {
  amarelo: "bg-amarelo-claro text-alerta",
  azul: "bg-azul-claro text-azul",
  turquesa: "bg-turquesa-clara text-turquesa",
  rosa: "bg-rosa-claro text-rosa",
  primaria: "bg-azul-claro text-primaria",
  laranja: "bg-amarelo-claro text-laranja",
};

const TAMANHOS = {
  sm: "size-[45px] [&>svg]:size-5",
  md: "size-[55px] [&>svg]:size-6",
  lg: "size-[60px] [&>svg]:size-7 md:size-[70px] md:[&>svg]:size-8",
} as const;

interface Props {
  tom: Tom;
  tamanho?: keyof typeof TAMANHOS;
  /** O ícone (Remix Icon). É decorativo: o texto ao lado diz o que ele significa. */
  children: ReactNode;
  className?: string;
}

/**
 * O círculo de fundo claro com ícone colorido que abre as linhas do kit (transações,
 * resumos, serviços). Dentro de um `group`, gira e cresce de leve quando a linha recebe o mouse.
 */
export function PastilhaDeIcone({ tom, tamanho = "md", children, className }: Props) {
  return (
    <span
      aria-hidden="true"
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        "transition-transform duration-300 ease-saida group-hover:-rotate-6 group-hover:scale-110",
        TONS[tom],
        TAMANHOS[tamanho],
        className,
      )}
    >
      {children}
    </span>
  );
}
