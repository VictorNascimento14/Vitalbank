"use client";

import { motion } from "motion/react";
import { useId, useState, type ReactNode } from "react";
import { cx } from "../cx";
import { mola } from "../movimento/ritmo";

interface Props {
  rotulo: ReactNode;
  /** Controlado: o estado mora em quem usa. */
  ligado?: boolean;
  /** Não controlado: estado inicial. */
  ligadoInicial?: boolean;
  aoMudar?: (ligado: boolean) => void;
  disabled?: boolean;
  className?: string;
}

/** Interruptor liga/desliga (`role="switch"`), com a bolinha deslizando em mola. */
export function Alternador({
  rotulo,
  ligado,
  ligadoInicial = false,
  aoMudar,
  disabled,
  className,
}: Props) {
  const id = useId();
  const [interno, setInterno] = useState(ligadoInicial);
  const atual = ligado ?? interno;

  function alternar() {
    const novo = !atual;
    if (ligado === undefined) setInterno(novo);
    aoMudar?.(novo);
  }

  return (
    <div className={cx("flex items-center gap-4", className)}>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={atual}
        disabled={disabled}
        onClick={alternar}
        className={cx(
          "relative flex h-[31px] w-14 shrink-0 cursor-pointer items-center rounded-full p-[3px]",
          "transition-colors duration-300 ease-saida",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          atual ? "justify-end bg-turquesa" : "justify-start bg-borda-campo",
        )}
      >
        <motion.span
          layout
          transition={mola}
          className="size-[25px] rounded-full bg-superficie shadow-bolinha"
        />
      </button>
      <label htmlFor={id} className="cursor-pointer text-rotulo text-tinta-forte md:text-corpo">
        {rotulo}
      </label>
    </div>
  );
}
