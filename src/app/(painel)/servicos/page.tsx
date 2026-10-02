import { metadadosDaTela } from "@/ui/casca/navegacao";
import { listarServicos } from "@/dados";
import { DestaquesDeServicos } from "@/telas/servicos/DestaquesDeServicos";
import { ListaDeServicos } from "@/telas/servicos/ListaDeServicos";

export const metadata = metadadosDaTela("/servicos");

export default async function Servicos() {
  const servicos = await listarServicos();
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px]">
      <DestaquesDeServicos />
      <ListaDeServicos servicos={servicos} />
    </div>
  );
}
