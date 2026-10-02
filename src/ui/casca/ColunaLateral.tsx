"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "../cx";
import { mola } from "../movimento/ritmo";
import { Marca } from "./Marca";
import { itemAtivo, NAVEGACAO } from "./navegacao";

interface Props {
  /** Chamado ao escolher um item — a gaveta do celular usa para fechar. */
  aoNavegar?: () => void;
  className?: string;
}

/**
 * A coluna de navegação (250 px). O item ativo ganha a barra azul na borda esquerda, que
 * desliza em mola até o item novo — a coluna não pisca nem remonta ao trocar de tela.
 */
export function ColunaLateral({ aoNavegar, className }: Props) {
  const ativo = itemAtivo(usePathname());
  return (
    <aside
      className={cx("flex h-full w-coluna flex-col border-r border-borda bg-superficie", className)}
    >
      <div className="flex h-cabecalho shrink-0 items-center px-9">
        <Link href="/" aria-label="Vitalbank — visão geral" onClick={aoNavegar}>
          <Marca />
        </Link>
      </div>
      <nav aria-label="Principal" className="flex-1 overflow-y-auto py-2">
        <ul className="flex flex-col gap-1">
          {NAVEGACAO.map((item) => {
            const atual = item === ativo;
            return (
              <li key={item.rota} className="relative">
                {atual && (
                  <motion.span
                    layoutId="coluna-marcador"
                    transition={mola}
                    className="absolute inset-y-0 left-0 w-1.5 rounded-r-miudo bg-primaria"
                  />
                )}
                <Link
                  href={item.rota}
                  aria-current={atual ? "page" : undefined}
                  onClick={aoNavegar}
                  className={cx(
                    "group flex h-[60px] items-center gap-5 whitespace-nowrap pl-10 pr-4 text-menu font-medium",
                    "transition-colors duration-200 ease-saida",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primaria-viva",
                    atual ? "text-primaria" : "text-tinta-apagada hover:text-tinta",
                  )}
                >
                  <item.Icone
                    aria-hidden="true"
                    className="size-6 shrink-0 transition-transform duration-300 ease-saida group-hover:scale-110"
                  />
                  <span className="transition-transform duration-300 ease-saida group-hover:translate-x-1">
                    {item.rotulo}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
