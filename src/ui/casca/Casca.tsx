"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { duracao, mola } from "../movimento/ritmo";
import { Cabecalho } from "./Cabecalho";
import { ColunaLateral } from "./ColunaLateral";

interface Props {
  children: ReactNode;
  nomeDoCliente: string;
}

/**
 * A casca do painel, montada uma vez pelo layout: só o miolo troca ao navegar.
 * A partir de `lg` a coluna fica fixa à esquerda; abaixo disso ela mora numa gaveta.
 */
export function Casca({ children, nomeDoCliente }: Props) {
  const [aberta, setAberta] = useState(false);
  const gaveta = useRef<HTMLDivElement>(null);
  const fechar = () => setAberta(false);

  useEffect(() => {
    if (!aberta) return;
    const anterior = document.activeElement as HTMLElement | null;
    gaveta.current?.querySelector<HTMLElement>("a[href]")?.focus();
    const tecla = (e: KeyboardEvent) => e.key === "Escape" && setAberta(false);
    document.addEventListener("keydown", tecla);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = "";
      anterior?.focus();
    };
  }, [aberta]);

  return (
    <div className="flex min-h-dvh">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-campo focus:bg-superficie focus:px-4 focus:py-2 focus:shadow-cartao"
      >
        Pular para o conteúdo
      </a>

      <div className="sticky top-0 hidden h-dvh shrink-0 lg:block">
        <ColunaLateral />
      </div>

      <AnimatePresence>
        {aberta && (
          <div className="fixed inset-0 z-40 lg:hidden">
            <motion.div
              aria-hidden="true"
              onClick={fechar}
              className="absolute inset-0 bg-tinta/40 backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: duracao.media }}
            />
            <motion.div
              ref={gaveta}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-y-0 left-0 shadow-cartao"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={mola}
            >
              <ColunaLateral aoNavegar={fechar} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <Cabecalho nomeDoCliente={nomeDoCliente} aoAbrirMenu={() => setAberta(true)} />
        <main id="conteudo" tabIndex={-1} className="flex-1 px-6 py-6 focus:outline-none md:px-8 lg:px-10 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
