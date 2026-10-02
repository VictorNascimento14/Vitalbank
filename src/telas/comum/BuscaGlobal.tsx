"use client";

import { RiArrowRightLine, RiFileList3Line, RiLayoutGridLine, RiSearchLine, RiServiceLine } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { buscar, type ItemDeBusca } from "@/dominio/busca";
import { cx } from "@/ui";
import { duracao, mola } from "@/ui/movimento";

const GRUPOS: Record<ItemDeBusca["tipo"], { titulo: string; icone: ReactNode }> = {
  tela: { titulo: "Telas", icone: <RiLayoutGridLine aria-hidden="true" className="size-5" /> },
  transacao: { titulo: "Transações", icone: <RiFileList3Line aria-hidden="true" className="size-5" /> },
  servico: { titulo: "Serviços", icone: <RiServiceLine aria-hidden="true" className="size-5" /> },
};

/**
 * Busca de qualquer tela: Ctrl+K (⌘K no Mac) ou clique no campo do cabeçalho. Setas
 * escolhem, Enter vai, Esc fecha. O atalho só vale para o gatilho visível — o cabeçalho
 * desenha um no celular e outro no desktop.
 */
export function BuscaGlobal({ itens, className }: { itens: readonly ItemDeBusca[]; className?: string }) {
  const router = useRouter();
  const [aberta, setAberta] = useState(false);
  const [termo, setTermo] = useState("");
  const [ativo, setAtivo] = useState(0);
  const gatilho = useRef<HTMLButtonElement>(null);
  const id = useId();
  const sugestoes = useMemo(() => itens.filter((i) => i.tipo === "tela").slice(0, 5), [itens]);
  const resultados = termo.trim() ? buscar(itens, termo) : sugestoes;

  useEffect(() => {
    const atalho = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k" && gatilho.current?.offsetParent !== null) {
        e.preventDefault();
        setAberta(true);
      }
    };
    document.addEventListener("keydown", atalho);
    return () => document.removeEventListener("keydown", atalho);
  }, []);

  useEffect(() => {
    if (!aberta) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberta]);

  function fechar() {
    setAberta(false);
    setTermo("");
    setAtivo(0);
    gatilho.current?.focus();
  }

  function ir(item: ItemDeBusca) {
    fechar();
    router.push(item.href);
  }

  function teclado(e: React.KeyboardEvent) {
    if (e.key === "Escape") return fechar();
    if (!resultados.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAtivo((a) => (a + 1) % resultados.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAtivo((a) => (a - 1 + resultados.length) % resultados.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      ir(resultados[Math.min(ativo, resultados.length - 1)]);
    }
  }

  const modal = (
    <AnimatePresence>
      {aberta && (
        <div className="fixed inset-0 z-50 flex justify-center px-4 pt-[12vh]">
          <motion.div
            aria-hidden="true"
            onClick={fechar}
            className="absolute inset-0 bg-tinta/40 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duracao.rapida }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Buscar no Vitalbank"
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={mola}
            className="relative h-fit w-full max-w-[640px] overflow-hidden rounded-bloco bg-superficie shadow-[0_30px_80px_-20px_rgb(0_0_0/0.35)]"
          >
            <div className="flex items-center gap-3 border-b border-borda px-5">
              <RiSearchLine aria-hidden="true" className="size-5 text-tinta-suave" />
              <input
                autoFocus
                role="combobox"
                aria-expanded="true"
                aria-controls={`${id}-lista`}
                aria-activedescendant={resultados.length ? `${id}-op-${ativo}` : undefined}
                aria-label="Buscar telas, transações e serviços"
                placeholder="Buscar telas, transações e serviços"
                value={termo}
                onChange={(e) => {
                  setTermo(e.target.value);
                  setAtivo(0);
                }}
                onKeyDown={teclado}
                className="h-14 w-full bg-transparent text-corpo text-tinta-forte placeholder:text-tinta-suave/80 focus:outline-none"
              />
              <kbd className="rounded-miudo border border-borda px-1.5 py-0.5 text-legenda text-tinta-suave">Esc</kbd>
            </div>
            <div className="max-h-[50vh] overflow-y-auto p-2">
              {!termo.trim() && <p className="px-3 pt-2 pb-1 text-legenda font-medium text-tinta-suave">Ir para</p>}
              {resultados.length === 0 ? (
                <p className="px-3 py-8 text-center text-rotulo text-tinta-suave">Nada encontrado para “{termo}”.</p>
              ) : (
                <ul id={`${id}-lista`} role="listbox" aria-label="Resultados">
                  {resultados.map((r, i) => (
                    <li
                      key={`${r.tipo}-${r.titulo}-${r.detalhe}`}
                      id={`${id}-op-${i}`}
                      role="option"
                      aria-selected={i === ativo}
                      onMouseMove={() => setAtivo(i)}
                      onClick={() => ir(r)}
                      className="relative flex cursor-pointer items-center gap-3 rounded-campo px-3 py-2.5"
                    >
                      {i === ativo && (
                        <motion.span
                          layoutId={`${id}-ativo`}
                          transition={mola}
                          className="absolute inset-0 rounded-campo bg-azul-claro"
                        />
                      )}
                      <span className={cx("relative", i === ativo ? "text-primaria" : "text-tinta-suave")}>
                        {GRUPOS[r.tipo].icone}
                      </span>
                      <span className="relative min-w-0 flex-1">
                        <span className="block truncate text-rotulo font-medium text-tinta-forte">{r.titulo}</span>
                        <span className="block truncate text-legenda text-tinta-suave">
                          {GRUPOS[r.tipo].titulo} · {r.detalhe}
                        </span>
                      </span>
                      <RiArrowRightLine
                        aria-hidden="true"
                        className={cx(
                          "relative size-4 transition-[opacity,translate] duration-200",
                          i === ativo ? "translate-x-0 text-primaria opacity-100" : "-translate-x-1 opacity-0",
                        )}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        ref={gatilho}
        type="button"
        onClick={() => setAberta(true)}
        aria-haspopup="dialog"
        className={cx(
          "group flex h-[50px] w-full items-center gap-4 rounded-full bg-fundo px-6 text-left transition-colors duration-200 ease-saida hover:bg-azul-claro",
          "focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:outline-none",
          className,
        )}
      >
        <RiSearchLine
          aria-hidden="true"
          className="size-5 shrink-0 text-tinta-suave transition-transform group-hover:scale-110"
        />
        <span className="flex-1 truncate text-rotulo text-tinta-suave/80">Buscar algo</span>
        <kbd className="hidden rounded-miudo bg-superficie px-1.5 py-0.5 text-legenda text-tinta-suave md:inline">
          Ctrl K
        </kbd>
      </button>
      {typeof document !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
