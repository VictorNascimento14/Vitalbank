import { listarCartoes } from "@/dados";
import { MeusCartoes } from "@/telas/visao-geral/MeusCartoes";

export default async function VisaoGeral() {
  const cartoes = await listarCartoes();
  return (
    <div className="grid gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <MeusCartoes cartoes={cartoes} />
    </div>
  );
}
