"use client";

import { RiCheckboxCircleFill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { Alternador, Botao, CampoDeSelecao } from "@/ui";
import { mola } from "@/ui/movimento";

const AVISOS = [
  { id: "dinheiro", rotulo: "Quando eu enviar ou receber dinheiro", inicial: true },
  { id: "lojas", rotulo: "Quando uma loja confirmar um pedido", inicial: false },
  { id: "recomendacoes", rotulo: "Recomendações para a minha conta", inicial: true },
] as const;

/** Aba "Preferências": moeda, fuso e avisos. Salvar confirma (demonstração). */
export function Preferencias() {
  const [salvo, setSalvo] = useState(false);
  const mudou = () => setSalvo(false);

  function salvar(e: FormEvent) {
    e.preventDefault();
    setSalvo(true);
  }

  return (
    <form onSubmit={salvar} className="flex flex-col gap-7">
      <div className="grid gap-5 md:grid-cols-2 md:gap-x-7">
        <CampoDeSelecao
          rotulo="Moeda"
          defaultValue="BRL"
          onChange={mudou}
          opcoes={[
            { valor: "BRL", rotulo: "Real (R$)" },
            { valor: "USD", rotulo: "Dólar americano (US$)" },
            { valor: "EUR", rotulo: "Euro (€)" },
          ]}
        />
        <CampoDeSelecao
          rotulo="Fuso horário"
          defaultValue="America/Sao_Paulo"
          onChange={mudou}
          opcoes={[
            { valor: "America/Sao_Paulo", rotulo: "(GMT-3) Brasília" },
            { valor: "America/Manaus", rotulo: "(GMT-4) Manaus" },
            { valor: "America/Rio_Branco", rotulo: "(GMT-5) Rio Branco" },
            { valor: "America/Noronha", rotulo: "(GMT-2) Fernando de Noronha" },
          ]}
        />
      </div>
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-corpo font-medium text-tinta">Avisos</legend>
        {AVISOS.map((a) => (
          <Alternador key={a.id} rotulo={a.rotulo} ligadoInicial={a.inicial} aoMudar={mudou} />
        ))}
      </fieldset>
      <div className="flex flex-wrap items-center justify-end gap-4">
        <AnimatePresence>
          {salvo && (
            <motion.p
              role="status"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={mola}
              className="flex items-center gap-2 text-rotulo text-sucesso"
            >
              <RiCheckboxCircleFill aria-hidden="true" className="size-5" />
              Preferências salvas — demonstração.
            </motion.p>
          )}
        </AnimatePresence>
        <Botao type="submit" className="w-full sm:w-[190px]">
          Salvar
        </Botao>
      </div>
    </form>
  );
}
