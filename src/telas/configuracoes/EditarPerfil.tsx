"use client";

import { RiCheckboxCircleFill, RiPencilFill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import type { obterPerfil } from "@/dados";
import { Avatar, Botao, Campo } from "@/ui";
import { mola } from "@/ui/movimento";

type Perfil = Awaited<ReturnType<typeof obterPerfil>>;
type Erros = Partial<Record<keyof Perfil, string>>;

export function validarPerfil(p: Perfil): Erros {
  const erros: Erros = {};
  if (p.nome.trim().length < 3) erros.nome = "Escreva seu nome.";
  if (!/^[a-z0-9._]{3,20}$/.test(p.usuario)) erros.usuario = "De 3 a 20 letras minúsculas, números, ponto ou _.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email)) erros.email = "Informe um e-mail válido.";
  if (!/^\d{5}-?\d{3}$/.test(p.cep)) erros.cep = "CEP com 8 dígitos.";
  return erros;
}

/**
 * Aba "Editar perfil". A foto escolhida aparece na hora, mas só neste navegador: é lida
 * com `URL.createObjectURL` e nunca enviada. Salvar valida e confirma (demonstração).
 */
export function EditarPerfil({ perfil }: { perfil: Perfil }) {
  const [dados, setDados] = useState<Perfil>(perfil);
  const [erros, setErros] = useState<Erros>({});
  const [salvo, setSalvo] = useState(false);
  const [foto, setFoto] = useState<string | null>(null);
  const arquivo = useRef<HTMLInputElement>(null);

  useEffect(
    () => () => {
      if (foto) URL.revokeObjectURL(foto);
    },
    [foto],
  );

  const campo = (chave: keyof Perfil) => ({
    value: dados[chave],
    erro: erros[chave],
    onChange: (e: { target: { value: string } }) => {
      setDados((d) => ({ ...d, [chave]: e.target.value }));
      setSalvo(false);
    },
  });

  function salvar(e: FormEvent) {
    e.preventDefault();
    const encontrados = validarPerfil(dados);
    setErros(encontrados);
    setSalvo(Object.keys(encontrados).length === 0);
  }

  return (
    <form onSubmit={salvar} noValidate className="flex flex-col gap-8 lg:flex-row lg:gap-14">
      <div className="relative mx-auto size-fit shrink-0 lg:mx-0">
        {foto ? (
          // eslint-disable-next-line @next/next/no-img-element -- prévia local (blob:), não passa pelo otimizador
          <img
            src={foto}
            alt={`Foto de ${dados.nome}`}
            className="size-[90px] rounded-full object-cover md:size-[130px]"
          />
        ) : (
          <Avatar nome={dados.nome} tamanho="xl" />
        )}
        <motion.button
          type="button"
          aria-label="Trocar foto"
          whileHover={{ scale: 1.1, rotate: -12 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => arquivo.current?.click()}
          className="absolute right-0 bottom-0 grid size-[30px] place-items-center rounded-full bg-primaria text-white ring-4 ring-superficie focus-visible:ring-primaria-viva focus-visible:outline-none"
        >
          <RiPencilFill aria-hidden="true" className="size-4" />
        </motion.button>
        <input
          ref={arquivo}
          type="file"
          accept="image/*"
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) setFoto(URL.createObjectURL(f));
          }}
        />
      </div>

      <div className="grid flex-1 gap-5 md:grid-cols-2 md:gap-x-7">
        <Campo rotulo="Seu nome" autoComplete="name" {...campo("nome")} />
        <Campo rotulo="Nome de usuário" autoComplete="username" {...campo("usuario")} />
        <Campo rotulo="E-mail" type="email" autoComplete="email" {...campo("email")} />
        <Campo rotulo="Data de nascimento" type="date" autoComplete="bday" {...campo("nascimento")} />
        <Campo rotulo="Endereço atual" autoComplete="street-address" {...campo("endereco")} />
        <Campo rotulo="Endereço permanente" {...campo("enderecoPermanente")} />
        <Campo rotulo="Cidade" autoComplete="address-level2" {...campo("cidade")} />
        <Campo rotulo="CEP" inputMode="numeric" autoComplete="postal-code" {...campo("cep")} />
        <Campo rotulo="País" autoComplete="country-name" {...campo("pais")} />
        <div className="flex flex-wrap items-center justify-end gap-4 md:col-span-2">
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
                Perfil salvo — demonstração: nada foi enviado.
              </motion.p>
            )}
          </AnimatePresence>
          <Botao type="submit" className="w-full sm:w-[190px]">
            Salvar
          </Botao>
        </div>
      </div>
    </form>
  );
}
