"use client";

import { RiErrorWarningFill, RiRefreshLine } from "@remixicon/react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { Bloco, Botao, PastilhaDeIcone } from "@/ui";
import { Surgir } from "@/ui/movimento";

/**
 * Quando uma tela quebra, a casca continua de pé e o miolo mostra isto. "Tentar de novo"
 * chama o `retry` do Next 16 (nas versões anteriores, `reset`).
 */
export default function ErroNaTela({ error, retry }: { error: Error & { digest?: string }; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Surgir>
      <Bloco role="alert" className="flex flex-col items-center gap-4 py-16 text-center">
        <motion.span
          initial={{ rotate: -12, scale: 0.6 }}
          animate={{ rotate: [0, -10, 10, -6, 0], scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <PastilhaDeIcone tom="rosa" tamanho="lg">
            <RiErrorWarningFill />
          </PastilhaDeIcone>
        </motion.span>
        <p className="text-menu font-semibold text-tinta">Algo deu errado nesta tela</p>
        <p className="max-w-sm text-rotulo text-tinta-suave">
          O resto do app continua funcionando. Tente carregar esta parte de novo.
        </p>
        {error.digest && <p className="text-legenda text-tinta-suave/80">Código do erro: {error.digest}</p>}
        <Botao onClick={retry} icone={<RiRefreshLine aria-hidden="true" className="size-5" />}>
          Tentar de novo
        </Botao>
      </Bloco>
    </Surgir>
  );
}
