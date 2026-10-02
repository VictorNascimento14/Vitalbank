import { metadadosDaTela } from "@/ui/casca/navegacao";
import { programaDePontos } from "@/dados";
import { Beneficios } from "@/telas/privilegios/Beneficios";
import { NivelAtual } from "@/telas/privilegios/NivelAtual";

export const metadata = metadadosDaTela("/privilegios");

export default async function MeusPrivilegios() {
  const programa = await programaDePontos();
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px]">
      <NivelAtual programa={programa} />
      <Beneficios programa={programa} />
    </div>
  );
}
