"use client";

import { RiCheckboxCircleFill } from "@remixicon/react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type FormEvent } from "react";
import { agruparDigitos, passaNoLuhn, somenteDigitos, validadeEmDia } from "@/dominio/cartao";
import { Bloco, Botao, Campo, CampoDeSelecao, TituloDeSecao } from "@/ui";
import { mola } from "@/ui/movimento";

type Erros = Partial<Record<"nome" | "numero" | "validade", string>>;

/** "1228" → "12/28" enquanto a pessoa digita. */
export function mascararValidade(texto: string): string {
  const d = somenteDigitos(texto).slice(0, 4);
  return d.length > 2 ? `${d.slice(0, 2)}/${d.slice(2)}` : d;
}

export function validarNovoCartao(dados: { nome: string; numero: string; validade: string }, hoje = new Date()): Erros {
  const erros: Erros = {};
  if (dados.nome.trim().length < 3) erros.nome = "Escreva o nome como está no cartão.";
  if (!somenteDigitos(dados.numero)) erros.numero = "Informe o número do cartão.";
  else if (!passaNoLuhn(dados.numero)) erros.numero = "Confira o número: algum dígito parece trocado.";
  if (!dados.validade) erros.validade = "Informe a validade (MM/AA).";
  else if (!validadeEmDia(dados.validade, hoje)) erros.validade = "Use MM/AA, com mês e ano que ainda não passaram.";
  return erros;
}

/**
 * Formulário de novo cartão. Na v1 nada é guardado (ADR-001): ao validar, o número
 * digitado é descartado e só o final aparece na confirmação.
 */
export function AdicionarCartao() {
  const [tipo, setTipo] = useState("classico");
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [adicionado, setAdicionado] = useState<string | null>(null);

  function enviar(e: FormEvent) {
    e.preventDefault();
    const encontrados = validarNovoCartao({ nome, numero, validade });
    setErros(encontrados);
    if (Object.keys(encontrados).length) return;
    setAdicionado(somenteDigitos(numero).slice(-4));
    setNumero("");
    setValidade("");
  }

  return (
    <section aria-labelledby="novo-cartao" id="novo-cartao" className="flex scroll-mt-28 flex-col">
      <TituloDeSecao id="novo-cartao-titulo">Adicionar novo cartão</TituloDeSecao>
      <Bloco className="flex-1">
        <p className="mb-6 max-w-2xl text-rotulo leading-relaxed text-tinta-suave md:text-corpo">
          Cartão de crédito é um cartão emitido por um banco para quem tem conta, com um limite que pode ser usado para
          comprar produtos e serviços ou sacar dinheiro.
        </p>
        <form onSubmit={enviar} noValidate className="grid gap-5 md:grid-cols-2 md:gap-x-7">
          <CampoDeSelecao
            rotulo="Tipo do cartão"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            opcoes={[
              { valor: "classico", rotulo: "Clássico" },
              { valor: "gold", rotulo: "Gold" },
              { valor: "platinum", rotulo: "Platinum" },
            ]}
          />
          <Campo rotulo="Nome no cartão" placeholder="Cliente Exemplo" value={nome} erro={erros.nome} onChange={(e) => setNome(e.target.value)} autoComplete="off" />
          <Campo
            rotulo="Número do cartão"
            placeholder="•••• •••• •••• ••••"
            inputMode="numeric"
            autoComplete="off"
            value={numero}
            erro={erros.numero}
            onChange={(e) => setNumero(agruparDigitos(e.target.value))}
          />
          <Campo
            rotulo="Validade"
            placeholder="MM/AA"
            inputMode="numeric"
            autoComplete="off"
            value={validade}
            erro={erros.validade}
            onChange={(e) => setValidade(mascararValidade(e.target.value))}
          />
          <div className="flex flex-wrap items-center gap-5 md:col-span-2">
            <Botao type="submit" className="w-full sm:w-auto">
              Adicionar cartão
            </Botao>
            <AnimatePresence>
              {adicionado && (
                <motion.p
                  role="status"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={mola}
                  className="flex items-center gap-2 text-rotulo text-sucesso"
                >
                  <motion.span initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={mola}>
                    <RiCheckboxCircleFill aria-hidden="true" className="size-5" />
                  </motion.span>
                  Cartão final {adicionado} adicionado — demonstração: nada foi guardado.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </form>
      </Bloco>
    </section>
  );
}
