import type { ReactNode } from "react";
import { cx } from "../cx";
import type { FormatoDeNumero } from "@/dominio/numero";
import { NumeroAnimado } from "../movimento/NumeroAnimado";
import { PastilhaDeIcone, type Tom } from "./PastilhaDeIcone";

interface Props {
  rotulo: string;
  /** Número que conta ao aparecer; ou `texto` para valor que não é número ("Escolha o valor"). */
  valor?: number;
  texto?: string;
  formato?: FormatoDeNumero;
  tom: Tom;
  icone: ReactNode;
  className?: string;
}

/**
 * Os cartões de resumo do kit (Contas, Investimentos, Empréstimos): pastilha, rótulo e um
 * número que conta até o valor. Sobe e ganha sombra com o mouse. Abaixo de `sm`, em duas
 * colunas de ~155 px, a pastilha vai para cima do texto: "R$ 500.000,00" não cabe ao lado.
 */
export function CartaoDeResumo({ rotulo, valor, texto, formato = "moeda", tom, icone, className }: Props) {
  return (
    <div
      className={cx(
        "group flex flex-col items-start gap-3 rounded-cartao bg-superficie px-4 py-4 sm:flex-row sm:items-center md:gap-4 md:px-6 md:py-6 xl:gap-5",
        "transition-[translate,box-shadow] duration-300 ease-saida hover:-translate-y-1 hover:shadow-cartao",
        className,
      )}
    >
      <PastilhaDeIcone tom={tom} tamanho="fluido">
        {icone}
      </PastilhaDeIcone>
      <div className="min-w-0">
        <p className="truncate text-legenda text-tinta-suave md:text-rotulo xl:text-corpo">{rotulo}</p>
        <p className="valor-sensivel text-legenda font-semibold whitespace-nowrap text-tinta-forte sm:text-rotulo md:text-menu xl:text-destaque">
          {valor !== undefined ? <NumeroAnimado valor={valor} formato={formato} /> : texto}
        </p>
      </div>
    </div>
  );
}
