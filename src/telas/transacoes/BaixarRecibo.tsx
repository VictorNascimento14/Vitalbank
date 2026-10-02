"use client";

import { RiCheckLine, RiDownloadLine } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Transacao } from "@/dados";
import { nomeDoRecibo, textoDoRecibo } from "@/dominio/recibo";
import { Botao } from "@/ui";
import { TIPO } from "@/telas/comum/categoria";

/** Gera o recibo em texto no próprio navegador e baixa; o botão confirma com ✓ por um instante. */
export function BaixarRecibo({ transacao }: { transacao: Transacao }) {
  const [baixado, setBaixado] = useState(false);

  function baixar() {
    const blob = new Blob([textoDoRecibo(transacao, TIPO[transacao.categoria])], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nomeDoRecibo(transacao);
    a.click();
    URL.revokeObjectURL(url);
    setBaixado(true);
    window.setTimeout(() => setBaixado(false), 1800);
  }

  return (
    <Botao
      variante="contorno"
      tamanho="sm"
      forma="pilula"
      onClick={baixar}
      aria-label={`Baixar recibo de ${transacao.descricao}`}
      className="w-[110px]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={baixado ? "ok" : "baixar"}
          className="flex items-center gap-1.5"
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 8, opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {baixado ? <RiCheckLine aria-hidden="true" className="size-4" /> : <RiDownloadLine aria-hidden="true" className="size-4" />}
          {baixado ? "Pronto" : "Baixar"}
        </motion.span>
      </AnimatePresence>
    </Botao>
  );
}
