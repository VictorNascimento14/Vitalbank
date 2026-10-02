import type { HTMLAttributes } from "react";
import { cx } from "../cx";

interface Props extends HTMLAttributes<HTMLDivElement> {
  /** Sem respiro interno — para tabela e lista que vão até a borda. */
  colado?: boolean;
}

/** A superfície branca de canto 25 px que segura quase todo conteúdo do app. */
export function Bloco({ colado, className, ...resto }: Props) {
  return (
    <div
      className={cx(
        "rounded-cartao bg-superficie",
        !colado && "p-5 md:p-6",
        className,
      )}
      {...resto}
    />
  );
}
