"use client";

import { RiArrowRightSLine, RiCheckLine, RiSendPlaneFill } from "@remixicon/react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";
import { useState, type FormEvent, type ReactNode } from "react";
import type { Contato } from "@/dados";
import { formatarMoeda, paraCentavos } from "@/dominio/dinheiro";
import { Avatar, Bloco, cx, TituloDeSecao } from "@/ui";
import { duracao, mola } from "@/ui/movimento";

const VISIVEIS = 3;

type Estado = { tipo: "editando" } | { tipo: "erro"; mensagem: string } | { tipo: "enviado"; texto: string };

/** Item da fila. Enquanto anima a saída, some para o leitor de tela e para o teclado. */
function ItemDaFila({ children }: { children: ReactNode }) {
  const presente = useIsPresent();
  return (
    <motion.li
      layout
      aria-hidden={!presente || undefined}
      inert={!presente}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={mola}
    >
      {children}
    </motion.li>
  );
}

/**
 * Envio para um contato frequente. Na v1 nada sai da conta (ADR-001): o envio só
 * confirma na tela, e a confirmação diz isso.
 */
export function TransferenciaRapida({ contatos }: { contatos: readonly Contato[] }) {
  const [inicio, setInicio] = useState(0);
  const [escolhido, setEscolhido] = useState(contatos[0]?.id);
  const [valor, setValor] = useState("525,50");
  const [estado, setEstado] = useState<Estado>({ tipo: "editando" });
  const janela = (de: number) =>
    Array.from({ length: Math.min(VISIVEIS, contatos.length) }, (_, i) => contatos[(de + i) % contatos.length]);
  const visiveis = janela(inicio);
  const pessoa = contatos.find((c) => c.id === escolhido);

  /** Avança a fila; se o escolhido sair da vista, a escolha passa ao primeiro visível. */
  function avancar() {
    const proximo = (inicio + 1) % contatos.length;
    const nova = janela(proximo);
    setInicio(proximo);
    if (!nova.some((c) => c.id === escolhido)) setEscolhido(nova[0]?.id);
  }

  function enviar(e: FormEvent) {
    e.preventDefault();
    const centavos = paraCentavos(valor);
    if (!pessoa) return setEstado({ tipo: "erro", mensagem: "Escolha para quem enviar." });
    if (centavos === null || centavos <= 0)
      return setEstado({ tipo: "erro", mensagem: "Digite um valor, como 525,50." });
    setEstado({ tipo: "enviado", texto: `${formatarMoeda(centavos)} para ${pessoa.nome}` });
    window.setTimeout(() => setEstado({ tipo: "editando" }), 3200);
  }

  const enviado = estado.tipo === "enviado";
  return (
    <section aria-labelledby="transferencia-rapida" className="flex flex-col">
      <TituloDeSecao id="transferencia-rapida">Transferência rápida</TituloDeSecao>
      <Bloco className="flex flex-1 flex-col justify-center gap-7">
        <div className="flex items-center gap-2">
          <ul aria-label="Contatos frequentes" className="grid flex-1 grid-cols-3 gap-2">
            <AnimatePresence mode="popLayout" initial={false}>
              {visiveis.map((c) => {
                const ativo = c.id === escolhido;
                return (
                  <ItemDaFila key={c.id}>
                    <button
                      type="button"
                      aria-pressed={ativo}
                      onClick={() => setEscolhido(c.id)}
                      className="group flex w-full flex-col items-center gap-2 rounded-campo py-2 text-center focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:outline-none"
                    >
                      <motion.span animate={{ scale: ativo ? 1.08 : 1 }} transition={mola} className="relative">
                        <Avatar nome={c.nome} tamanho="lg" />
                        {ativo && (
                          <motion.span
                            layoutId="contato-escolhido"
                            transition={mola}
                            className="absolute -inset-1 rounded-full ring-2 ring-primaria"
                          />
                        )}
                      </motion.span>
                      <span
                        className={cx(
                          "text-legenda md:text-corpo",
                          ativo ? "font-bold text-tinta-forte" : "text-tinta-forte",
                        )}
                      >
                        {c.nome.split(" ")[0]}
                      </span>
                      <span
                        className={cx(
                          "-mt-1.5 text-legenda",
                          ativo ? "font-bold text-tinta-suave" : "text-tinta-suave",
                        )}
                      >
                        {c.cargo}
                      </span>
                    </button>
                  </ItemDaFila>
                );
              })}
            </AnimatePresence>
          </ul>
          <motion.button
            type="button"
            aria-label="Mais contatos"
            onClick={avancar}
            whileHover={{ x: 3 }}
            whileTap={{ scale: 0.9 }}
            className="grid size-[50px] shrink-0 place-items-center rounded-full bg-superficie text-tinta-suave shadow-cartao transition-colors hover:text-primaria focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:outline-none"
          >
            <RiArrowRightSLine aria-hidden="true" className="size-6" />
          </motion.button>
        </div>

        <form onSubmit={enviar} noValidate className="flex items-center gap-4 md:gap-6">
          <label
            htmlFor="valor-transferencia"
            className="hidden shrink-0 text-rotulo text-tinta-suave sm:block md:text-corpo"
          >
            Valor
          </label>
          <div className="relative flex h-[50px] flex-1 items-center rounded-full bg-fundo">
            <span className="pl-6 text-rotulo text-tinta-suave" aria-hidden="true">
              R$
            </span>
            <input
              id="valor-transferencia"
              inputMode="decimal"
              aria-label="Valor em reais"
              aria-invalid={estado.tipo === "erro" || undefined}
              aria-describedby="retorno-transferencia"
              value={valor}
              onChange={(e) => {
                setValor(e.target.value);
                if (estado.tipo === "erro") setEstado({ tipo: "editando" });
              }}
              className="h-full w-full min-w-0 rounded-full bg-transparent pr-[130px] pl-2 text-rotulo text-tinta-forte focus:outline-none md:pr-[140px]"
            />
            <motion.button
              type="submit"
              disabled={enviado}
              whileTap={{ scale: 0.95 }}
              className={cx(
                "absolute inset-y-0 right-0 flex w-[125px] items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium text-white md:w-[135px]",
                "shadow-[0_10px_24px_-10px_var(--primaria)] transition-colors focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:ring-offset-2 focus-visible:outline-none",
                enviado ? "bg-sucesso" : "bg-primaria hover:bg-primaria-viva",
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {enviado ? (
                  <motion.span
                    key="ok"
                    className="flex items-center gap-2"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <RiCheckLine aria-hidden="true" className="size-5" /> Enviado
                  </motion.span>
                ) : (
                  <motion.span
                    key="enviar"
                    className="flex items-center gap-2.5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Enviar
                    <motion.span
                      exit={{ x: 60, y: -30, rotate: -20, opacity: 0 }}
                      transition={{ duration: duracao.media }}
                    >
                      <RiSendPlaneFill aria-hidden="true" className="size-5" />
                    </motion.span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </form>
        <p
          id="retorno-transferencia"
          role="status"
          className={cx("-mt-4 min-h-5 text-legenda", estado.tipo === "erro" ? "text-perigo" : "text-tinta-suave")}
        >
          {estado.tipo === "erro" && estado.mensagem}
          {estado.tipo === "enviado" && `${estado.texto} — demonstração: nada saiu da sua conta.`}
        </p>
      </Bloco>
    </section>
  );
}
