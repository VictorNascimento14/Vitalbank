"use client";

import { useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cx } from "../cx";

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  rotulo: ReactNode;
  /** Mensagem de erro: pinta a borda e é anunciada junto do campo. */
  erro?: string;
  /** Texto de apoio abaixo do campo. */
  dica?: string;
}

/** Campo de texto com rótulo (padrão do kit: borda 1 px `borda-campo`, canto 15 px). */
export function Campo({ rotulo, erro, dica, className, ...resto }: Props) {
  const id = useId();
  const idApoio = `${id}-apoio`;
  const apoio = erro ?? dica;
  return (
    <div className={cx("flex flex-col gap-2.5", className)}>
      <label htmlFor={id} className="text-rotulo text-tinta-forte md:text-corpo">
        {rotulo}
      </label>
      <input
        id={id}
        aria-invalid={erro ? true : undefined}
        aria-describedby={apoio ? idApoio : undefined}
        className={cx(
          "h-12 rounded-campo border bg-superficie px-5 text-rotulo text-tinta-suave",
          "transition-[border-color,box-shadow] duration-200 ease-saida placeholder:text-tinta-suave/60",
          "focus:border-primaria-viva focus:ring-4 focus:ring-primaria-viva/15 focus:outline-none",
          erro ? "border-perigo" : "border-borda-campo hover:border-tinta-suave/50",
        )}
        {...resto}
      />
      {apoio && (
        <p id={idApoio} className={cx("text-legenda", erro ? "text-perigo" : "text-tinta-suave")}>
          {apoio}
        </p>
      )}
    </div>
  );
}
