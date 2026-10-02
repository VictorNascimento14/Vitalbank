import { Casca } from "@/ui";

export default function LayoutDoPainel({ children }: LayoutProps<"/">) {
  return <Casca nomeDoCliente="Cliente Exemplo">{children}</Casca>;
}
