import { listarNotificacoes } from "@/dados";
import { Notificacoes } from "@/telas/comum/Notificacoes";
import { Casca } from "@/ui";

export default async function LayoutDoPainel({ children }: LayoutProps<"/">) {
  const avisos = await listarNotificacoes();
  return (
    <Casca nomeDoCliente="Cliente Exemplo" notificacoes={<Notificacoes itens={avisos} />}>
      {children}
    </Casca>
  );
}
