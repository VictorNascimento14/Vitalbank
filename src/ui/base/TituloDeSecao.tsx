import type { ReactNode } from "react";
import { cx } from "../cx";

interface Props {
  children: ReactNode;
  /** Ação à direita do título ("Ver todos", "+ Adicionar cartão"). */
  acao?: ReactNode;
  className?: string;
  id?: string;
}

/** Título de seção (Heading two do kit: 22 px, 600, `tinta`). */
export function TituloDeSecao({ children, acao, className, id }: Props) {
  return (
    <div className={cx("mb-4 flex items-center justify-between gap-4 md:mb-5", className)}>
      <h2 id={id} className="text-menu font-semibold text-tinta md:text-secao">
        {children}
      </h2>
      {acao}
    </div>
  );
}
