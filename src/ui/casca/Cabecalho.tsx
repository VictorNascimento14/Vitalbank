"use client";

import { RiMenuLine, RiNotification3Line, RiSearchLine, RiSettings5Line } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar } from "../base/Avatar";
import { cx } from "../cx";
import { itemAtivo } from "./navegacao";

interface Props {
  /** Abre a gaveta de navegação (celular e tablet). */
  aoAbrirMenu?: () => void;
  nomeDoCliente: string;
}

const botaoRedondo = cx(
  "group grid size-[50px] shrink-0 place-items-center rounded-full bg-fundo",
  "transition-colors duration-200 ease-saida hover:bg-azul-claro",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaria-viva",
);

function Busca({ className }: { className?: string }) {
  return (
    <label
      className={cx(
        "group flex h-[50px] items-center gap-4 rounded-full bg-fundo px-6",
        "transition-shadow duration-200 ease-saida focus-within:ring-2 focus-within:ring-primaria-viva/40",
        className,
      )}
    >
      <RiSearchLine aria-hidden="true" className="size-5 shrink-0 text-tinta-suave" />
      <span className="sr-only">Buscar</span>
      <input
        type="search"
        placeholder="Buscar algo"
        className="w-full bg-transparent text-rotulo text-tinta-forte placeholder:text-tinta-suave/80 focus:outline-none"
      />
    </label>
  );
}

/**
 * Faixa de cima (101 px no desktop): título da tela, busca, atalhos e a pessoa logada.
 * No celular vira menu + título + avatar, com a busca numa segunda linha.
 */
export function Cabecalho({ aoAbrirMenu, nomeDoCliente }: Props) {
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
        <span className="lg:hidden">
          <Avatar nome={nomeDoCliente} tamanho="sm" />
        </span>
      </div>
      <Busca className="mt-5 lg:hidden" />
      <div className="hidden items-center gap-7 lg:flex">
        <Busca className="w-[255px]" />
        <Link href="/configuracoes" aria-label="Configurações" className={botaoRedondo}>
          <RiSettings5Line
            aria-hidden="true"
            className="size-6 text-tinta-suave transition-transform duration-500 ease-saida group-hover:rotate-90"
          />
        </Link>
        <button type="button" aria-label="Notificações" className={cx(botaoRedondo, "relative")}>
          <RiNotification3Line
            aria-hidden="true"
            className="size-6 text-perigo group-hover:motion-safe:animate-[sacudir_0.5s_ease-in-out]"
          />
          <span className="absolute right-3 top-3 flex size-2.5">
            <span className="absolute inline-flex size-full rounded-full bg-perigo opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2.5 rounded-full bg-perigo ring-2 ring-fundo" />
          </span>
        </button>
        <Avatar nome={nomeDoCliente} tamanho="lg" className="size-[60px]! text-corpo!" />
      </div>
    </header>
  );
}
