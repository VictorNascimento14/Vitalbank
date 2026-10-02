import { obterPerfil } from "@/dados";
import { Configuracoes as Abas } from "@/telas/configuracoes/Configuracoes";

export default async function Configuracoes() {
  const perfil = await obterPerfil();
  return <Abas perfil={perfil} />;
}
