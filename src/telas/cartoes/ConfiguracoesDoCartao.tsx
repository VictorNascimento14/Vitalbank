"use client";

import {
  RiAppleFill,
  RiCheckLine,
  RiGoogleFill,
  RiLock2Fill,
  RiNotification3Fill,
  RiStore2Fill,
} from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";
import { Alternador, Bloco, cx, PastilhaDeIcone, TituloDeSecao, type Tom } from "@/ui";
import { Escalonado, ItemEscalonado, mola } from "@/ui/movimento";

function Linha({
  tom,
  icone,
  titulo,
  detalhe,
  children,
}: {
  tom: Tom;
  icone: ReactNode;
  titulo: string;
  detalhe: string;
  children: ReactNode;
}) {
  return (
    <ItemEscalonado como="li" className="group flex items-center gap-4 py-2.5">
      <PastilhaDeIcone tom={tom} tamanho="sm">
        {icone}
      </PastilhaDeIcone>
      <div className="min-w-0 flex-1">
        <p className="truncate text-rotulo font-medium text-tinta-forte">{titulo}</p>
        <p className="truncate text-legenda text-tinta-suave">{detalhe}</p>
      </div>
      {children}
    </ItemEscalonado>
  );
}

function BotaoDeCarteira({ nome }: { nome: string }) {
  const [feito, setFeito] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setFeito(true)}
      disabled={feito}
      aria-label={feito ? `Adicionado ao ${nome}` : `Adicionar ao ${nome}`}
      className={cx(
        "grid h-9 min-w-[92px] shrink-0 place-items-center rounded-full px-3 text-legenda font-medium transition-colors focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:outline-none",
        feito
          ? "bg-turquesa-clara text-sucesso"
          : "border border-primaria-viva text-primaria-viva hover:bg-primaria-viva hover:text-white",
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={String(feito)}
          className="flex items-center gap-1"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={mola}
        >
          {feito ? (
            <>
              <RiCheckLine aria-hidden="true" className="size-4" /> Pronto
            </>
          ) : (
            "Adicionar"
          )}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/** Ajustes do cartão: bloquear na hora, avisos e carteiras digitais (demonstração). */
export function ConfiguracoesDoCartao() {
  const [bloqueado, setBloqueado] = useState(false);
  return (
    <section aria-labelledby="configuracoes-do-cartao" className="flex flex-col">
      <TituloDeSecao id="configuracoes-do-cartao">Configurações do cartão</TituloDeSecao>
      <Bloco className="flex-1">
        <Escalonado como="ul" className="flex flex-col divide-y divide-borda">
          <Linha
            tom="amarelo"
            icone={<RiLock2Fill />}
            titulo="Bloquear cartão"
            detalhe={bloqueado ? "Bloqueado: compras recusadas" : "Bloqueie na hora"}
          >
            <Alternador
              rotulo={<span className="sr-only">Bloquear cartão</span>}
              ligado={bloqueado}
              aoMudar={setBloqueado}
            />
          </Linha>
          <Linha tom="azul" icone={<RiNotification3Fill />} titulo="Avisos de compra" detalhe="A cada compra">
            <Alternador rotulo={<span className="sr-only">Avisos de compra</span>} ligadoInicial />
          </Linha>
          <Linha tom="rosa" icone={<RiGoogleFill />} titulo="Google Pay" detalhe="Pague por aproximação">
            <BotaoDeCarteira nome="Google Pay" />
          </Linha>
          <Linha tom="turquesa" icone={<RiAppleFill />} titulo="Apple Pay" detalhe="Pague no iPhone">
            <BotaoDeCarteira nome="Apple Pay" />
          </Linha>
          <Linha tom="laranja" icone={<RiStore2Fill />} titulo="Lojas de apps" detalhe="Em aplicativos">
            <BotaoDeCarteira nome="perfil das lojas" />
          </Linha>
        </Escalonado>
      </Bloco>
    </section>
  );
}
