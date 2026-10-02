"use client";

import { RiCheckboxCircleFill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { forcaDaSenha, ROTULO_DA_FORCA, senhaAceitavel, type Forca } from "@/dominio/senha";
import { Alternador, Botao, Campo, cx } from "@/ui";
import { mola } from "@/ui/movimento";

type Erros = Partial<Record<"atual" | "nova" | "confirma", string>>;

export function validarTrocaDeSenha(atual: string, nova: string, confirma: string): Erros {
  const erros: Erros = {};
  if (!atual) erros.atual = "Informe a senha atual.";
  if (!senhaAceitavel(nova)) erros.nova = "Use 8 ou mais caracteres, com letras e números.";
  else if (nova === atual) erros.nova = "A nova senha precisa ser diferente da atual.";
  if (confirma !== nova) erros.confirma = "As duas senhas não são iguais.";
  return erros;
}

const COR: Record<Forca, string> = {
  0: "bg-perigo",
  1: "bg-perigo",
  2: "bg-alerta",
  3: "bg-turquesa",
  4: "bg-sucesso",
};

function Medidor({ senha }: { senha: string }) {
  const forca = forcaDaSenha(senha);
  return (
    <div className="-mt-2 flex items-center gap-3" aria-live="polite">
      <div aria-hidden="true" className="flex flex-1 gap-1.5">
        {[1, 2, 3, 4].map((n) => (
          <span key={n} className="h-1.5 flex-1 overflow-hidden rounded-full bg-borda">
            <motion.span
              className={cx("block h-full origin-left rounded-full", COR[forca])}
              animate={{ scaleX: senha && n <= Math.max(forca, 1) ? 1 : 0 }}
              transition={mola}
            />
          </span>
        ))}
      </div>
      <span className="w-24 text-right text-legenda text-tinta-suave">{senha ? ROTULO_DA_FORCA[forca] : ""}</span>
    </div>
  );
}

/**
 * Aba "Segurança": verificação em duas etapas e troca de senha com medidor de força.
 * Nada é enviado (demonstração), e os campos são apagados assim que a troca é aceita.
 */
export function Seguranca() {
  const [duasEtapas, setDuasEtapas] = useState(true);
  const [atual, setAtual] = useState("");
  const [nova, setNova] = useState("");
  const [confirma, setConfirma] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [trocada, setTrocada] = useState(false);

  function salvar(e: FormEvent) {
    e.preventDefault();
    const encontrados = validarTrocaDeSenha(atual, nova, confirma);
    setErros(encontrados);
    if (Object.keys(encontrados).length) return setTrocada(false);
    setAtual("");
    setNova("");
    setConfirma("");
    setTrocada(true);
  }

  return (
    <form onSubmit={salvar} noValidate className="flex flex-col gap-7">
      <fieldset className="flex flex-col gap-4">
        <legend className="mb-4 text-corpo font-medium text-tinta">Verificação em duas etapas</legend>
        <Alternador
          rotulo="Pedir um código além da senha ao entrar"
          ligado={duasEtapas}
          aoMudar={setDuasEtapas}
        />
      </fieldset>
      <fieldset className="flex max-w-md flex-col gap-5">
        <legend className="mb-4 text-corpo font-medium text-tinta">Trocar a senha</legend>
        <Campo rotulo="Senha atual" type="password" autoComplete="current-password" value={atual} erro={erros.atual} onChange={(e) => setAtual(e.target.value)} />
        <Campo rotulo="Nova senha" type="password" autoComplete="new-password" value={nova} erro={erros.nova} onChange={(e) => setNova(e.target.value)} />
        <Medidor senha={nova} />
        <Campo rotulo="Confirme a nova senha" type="password" autoComplete="new-password" value={confirma} erro={erros.confirma} onChange={(e) => setConfirma(e.target.value)} />
      </fieldset>
      <div className="flex flex-wrap items-center justify-end gap-4">
        <AnimatePresence>
          {trocada && (
            <motion.p
              role="status"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={mola}
              className="flex items-center gap-2 text-rotulo text-sucesso"
            >
              <RiCheckboxCircleFill aria-hidden="true" className="size-5" />
              Senha trocada — demonstração: nenhuma senha foi enviada.
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
