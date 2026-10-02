"use client";

import { RiArrowDownSLine } from "@remixicon/react";
import { useId, type SelectHTMLAttributes } from "react";
import { cx } from "../cx";

interface Props extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> {
  rotulo: string;
  opcoes: readonly { valor: string; rotulo: string }[];
}

/**
 * Seleção nativa (`<select>`) com a aparência do `Campo`: teclado, leitor de tela e a lista
 * do sistema no celular vêm de graça. A seta gira quando o campo está em foco.
 */
export function CampoDeSelecao({ rotulo, opcoes, className, ...resto }: Props) {
  const id = useId();
  return (
    <div className={cx("flex flex-col gap-2.5", className)}>
      <label htmlFor={id} className="text-rotulo text-tinta-forte md:text-corpo">
        {rotulo}
      </label>
      <div className="group relative">
        <select
          id={id}
          className={cx(
            "h-12 w-full appearance-none rounded-campo border border-borda-campo bg-superficie pl-5 pr-12 text-rotulo text-tinta-suave",
            "transition-[border-color,box-shadow] duration-200 ease-saida hover:border-tinta-suave/50",
            "focus:border-primaria-viva focus:outline-none focus:ring-4 focus:ring-primaria-viva/15",
          )}
          {...resto}
        >
          {opcoes.map((o) => (
            <option key={o.valor} value={o.valor}>
              {o.rotulo}
            </option>
          ))}
        </select>
        <RiArrowDownSLine
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-tinta-suave transition-transform duration-300 ease-saida group-focus-within:rotate-180"
        />
      </div>
    </div>
  );
}
