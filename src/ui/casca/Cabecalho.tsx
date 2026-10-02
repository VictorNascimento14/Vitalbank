"use client";

import { RiMenuLine, RiSettings5Line } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Avatar } from "../base/Avatar";
import { cx } from "../cx";
import { itemAtivo } from "./navegacao";

interface Props {
  /** Abre a gaveta de navegação (celular e tablet). */
  aoAbrirMenu?: () => void;
  nomeDoCliente: string;
  /** O sino de avisos (vem da tela, com os dados). */
  notificacoes?: ReactNode;
  /** A busca (vem da tela, com o índice). Ocupa a largura do lugar onde é posta. */
  busca?: ReactNode;
}

const botaoRedondo = cx(
  "group grid size-[50px] shrink-0 place-items-center rounded-full bg-fundo",
  "transition-colors duration-200 ease-saida hover:bg-azul-claro",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaria-viva",
);

/**
 * Faixa de cima (101 px no desktop): título da tela, busca, atalhos e a pessoa logada.
 * No celular vira menu + título + avatar, com a busca numa segunda linha.
 */
export function Cabecalho({ aoAbrirMenu, nomeDoCliente, notificacoes, busca }: Props) {
  const titulo = itemAtivo(usePathname())?.titulo ?? "Vitalbank";
  return (
    <header className="border-b border-borda bg-superficie px-6 pb-5 pt-6 lg:flex lg:h-cabecalho lg:items-center lg:gap-6 lg:px-10 lg:py-0">
      <div className="flex items-center justify-between gap-4 lg:flex-1">
        <button
          type="button"
          onClick={aoAbrirMenu}
          aria-label="Abrir menu"
          className="grid size-10 place-items-center rounded-miudo text-tinta transition-colors hover:bg-fundo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaria-viva lg:hidden"
        >
          <RiMenuLine aria-hidden="true" className="size-6" />
        </button>
        <h1 className="text-menu font-semibold text-tinta md:text-secao lg:text-titulo">{titulo}</h1>
        <span className="flex items-center gap-3 lg:hidden">
          {notificacoes}
          <Avatar nome={nomeDoCliente} tamanho="sm" />
        </span>
      </div>
      {busca && <div className="mt-5 lg:hidden">{busca}</div>}
      <div className="hidden items-center gap-7 lg:flex">
        {busca && <div className="w-[255px]">{busca}</div>}
        <Link href="/configuracoes" aria-label="Configurações" className={botaoRedondo}>
          <RiSettings5Line
            aria-hidden="true"
            className="size-6 text-tinta-suave transition-transform duration-500 ease-saida group-hover:rotate-90"
          />
        </Link>
        {notificacoes}
        <Avatar nome={nomeDoCliente} tamanho="lg" className="size-[60px]! text-corpo!" />
      </div>
    </header>
  );
}
