import { listarNotificacoes, listarServicos, listarTransacoes } from "@/dados";
import type { ItemDeBusca } from "@/dominio/busca";
import { formatarMoeda } from "@/dominio/dinheiro";
import { BuscaGlobal } from "@/telas/comum/BuscaGlobal";
import { Notificacoes } from "@/telas/comum/Notificacoes";
import { Casca, NAVEGACAO } from "@/ui";

export default async function LayoutDoPainel({ children }: LayoutProps<"/">) {
  const [avisos, transacoes, servicos] = await Promise.all([listarNotificacoes(), listarTransacoes(), listarServicos()]);
  const indice: ItemDeBusca[] = [
    ...NAVEGACAO.map((n) => ({ tipo: "tela" as const, titulo: n.titulo, detalhe: "Abrir a tela", href: n.rota })),
    ...transacoes.map((t) => ({
      tipo: "transacao" as const,
      titulo: t.descricao,
      detalhe: `${t.codigo} · ${formatarMoeda(t.valor, { sinal: true })}`,
      href: "/transacoes",
    })),
    ...servicos.map((s) => ({ tipo: "servico" as const, titulo: s.nome, detalhe: s.resumo, href: "/servicos" })),
  ];
  return (
    <Casca
      nomeDoCliente="Cliente Exemplo"
      notificacoes={<Notificacoes itens={avisos} />}
      busca={<BuscaGlobal itens={indice} />}
    >
      {children}
    </Casca>
  );
}
