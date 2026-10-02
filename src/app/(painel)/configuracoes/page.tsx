import { metadadosDaTela } from "@/ui/casca/navegacao";
import { obterPerfil } from "@/dados";
import { Configuracoes as Abas } from "@/telas/configuracoes/Configuracoes";

export const metadata = metadadosDaTela("/configuracoes");

export default async function Configuracoes() {
  const perfil = await obterPerfil();
  return <Abas perfil={perfil} />;
}
