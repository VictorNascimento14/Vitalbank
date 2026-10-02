"use client";

import { useState } from "react";
import type { Transacao } from "@/dados";
import { Abas, Bloco, Paginacao, TituloDeSecao } from "@/ui";
import { BaixarRecibo } from "./BaixarRecibo";
import { TabelaDeTransacoes } from "./TabelaDeTransacoes";

const POR_PAGINA = 5;

const FILTROS = {
  todas: { rotulo: "Todas", filtro: () => true },
  entradas: { rotulo: "Entradas", filtro: (t: Transacao) => t.valor > 0 },
  saidas: { rotulo: "Saídas", filtro: (t: Transacao) => t.valor < 0 },
} as const;

type Filtro = keyof typeof FILTROS;

/** O extrato com abas (todas, entradas, saídas) e paginação de 5 em 5. */
export function Extrato({ transacoes }: { transacoes: readonly Transacao[] }) {
  const [aba, setAba] = useState<Filtro>("todas");
  const [pagina, setPagina] = useState(1);
  const filtradas = transacoes.filter(FILTROS[aba].filtro);
  const total = Math.max(1, Math.ceil(filtradas.length / POR_PAGINA));
  const atual = Math.min(pagina, total);
  const pedaco = filtradas.slice((atual - 1) * POR_PAGINA, atual * POR_PAGINA);

  return (
    <section aria-labelledby="extrato" className="xl:col-span-2">
      <TituloDeSecao id="extrato">Transações recentes</TituloDeSecao>
      <Abas
        rotulo="Filtrar transações"
        ativa={aba}
        aoMudar={(id) => {
          setAba(id as Filtro);
          setPagina(1);
        }}
        abas={(Object.keys(FILTROS) as Filtro[]).map((id) => ({
          id,
          rotulo: FILTROS[id].rotulo,
          conteudo: (
            <>
              <Bloco>
                <TabelaDeTransacoes
                  key={`${id}-${atual}`}
                  transacoes={pedaco}
                  acao={(t) => <BaixarRecibo transacao={t} />}
                />
              </Bloco>
              <Paginacao className="mt-6" pagina={atual} total={total} aoMudar={setPagina} />
            </>
          ),
        }))}
      />
    </section>
  );
}
