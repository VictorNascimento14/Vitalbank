"use client";

import {
  RiArrowDownLine,
  RiArrowUpLine,
  RiBillFill,
  RiNotification3Line,
  RiShieldKeyholeFill,
} from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { listarNotificacoes } from "@/dados";
import { haQuantoTempo } from "@/dominio/datas";
import { cx, PastilhaDeIcone, type Tom } from "@/ui";
import { duracao, mola } from "@/ui/movimento";

type Itens = Awaited<ReturnType<typeof listarNotificacoes>>;

const TIPO: Record<Itens[number]["tipo"], { tom: Tom; icone: ReactNode }> = {
  entrada: { tom: "turquesa", icone: <RiArrowDownLine /> },
  saida: { tom: "rosa", icone: <RiArrowUpLine /> },
  seguranca: { tom: "azul", icone: <RiShieldKeyholeFill /> },
  fatura: { tom: "amarelo", icone: <RiBillFill /> },
};

/**
 * O sino do cabeçalho e o painel de avisos. Abre num balão que cresce do sino; fecha com
 * Esc, clique fora ou no próprio sino. O ponto vermelho some quando não há aviso por ler.
 */
export function Notificacoes({ itens, className }: { itens: Itens; className?: string }) {
  const [aberto, setAberto] = useState(false);
  const [lidas, setLidas] = useState(() => new Set(itens.filter((i) => i.lida).map((i) => i.id)));
  const caixa = useRef<HTMLDivElement>(null);
  const sino = useRef<HTMLButtonElement>(null);
  const id = useId();
  const naoLidas = itens.filter((i) => !lidas.has(i.id)).length;

  useEffect(() => {
    if (!aberto) return;
    const fora = (e: MouseEvent) => {
      if (!caixa.current?.contains(e.target as Node)) setAberto(false);
    };
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        sino.current?.focus();
      }
    };
    document.addEventListener("mousedown", fora);
    document.addEventListener("keydown", tecla);
    return () => {
      document.removeEventListener("mousedown", fora);
      document.removeEventListener("keydown", tecla);
    };
  }, [aberto]);

  return (
    <div ref={caixa} className={cx("relative", className)}>
      <button
        ref={sino}
        type="button"
        aria-label={naoLidas ? `Notificações, ${naoLidas} não lidas` : "Notificações"}
        aria-expanded={aberto}
        aria-controls={id}
        onClick={() => setAberto((a) => !a)}
        className="group relative grid size-10 place-items-center rounded-full bg-fundo transition-colors duration-200 ease-saida hover:bg-azul-claro focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaria-viva lg:size-[50px]"
      >
        <RiNotification3Line
          aria-hidden="true"
          className="size-5 text-perigo group-hover:motion-safe:animate-[sacudir_0.5s_ease-in-out] lg:size-6"
        />
        <AnimatePresence>
          {naoLidas > 0 && (
            <motion.span
              aria-hidden="true"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={mola}
              className="absolute right-2 top-2 flex size-2.5 lg:right-3 lg:top-3"
            >
              <span className="absolute inline-flex size-full rounded-full bg-perigo opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-perigo ring-2 ring-fundo" />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {aberto && (
          <motion.div
            id={id}
            role="dialog"
            aria-label="Notificações"
            initial={{ opacity: 0, scale: 0.92, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: duracao.media, ease: [0.22, 1, 0.36, 1] }}
            style={{ originX: 1, originY: 0 }}
            className="absolute right-0 top-[calc(100%+12px)] z-30 w-[min(360px,calc(100vw-48px))] rounded-bloco bg-superficie p-2 shadow-[0_20px_50px_-15px_var(--sombra-cor),0_0_0_1px_var(--borda)]"
          >
            <div className="flex items-center justify-between px-3 py-2">
              <p className="text-corpo font-semibold text-tinta">Notificações</p>
              <button
                type="button"
                disabled={naoLidas === 0}
                onClick={() => setLidas(new Set(itens.map((i) => i.id)))}
                className="rounded-miudo px-2 py-1 text-legenda font-medium text-primaria-viva transition-colors hover:bg-azul-claro disabled:text-tinta-suave disabled:hover:bg-transparent"
              >
                Marcar todas como lidas
              </button>
            </div>
            <ul className="flex flex-col">
              {itens.map((n, i) => {
                const { tom, icone } = TIPO[n.tipo];
                const nova = !lidas.has(n.id);
                return (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.04 }}
                    className="group flex gap-3 rounded-campo p-3 transition-colors hover:bg-fundo"
                  >
                    <PastilhaDeIcone tom={tom} tamanho="sm" className="size-10!">
                      {icone}
                    </PastilhaDeIcone>
                    <div className="min-w-0 flex-1">
                      <p className={cx("text-rotulo text-tinta-forte", nova && "font-semibold")}>{n.titulo}</p>
                      <p className="text-legenda text-tinta-suave">{n.texto}</p>
                      <p className="mt-0.5 text-legenda text-tinta-suave/80">{haQuantoTempo(n.quando)}</p>
                    </div>
                    {nova && <span aria-label="não lida" className="mt-1.5 size-2 shrink-0 rounded-full bg-primaria" />}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
