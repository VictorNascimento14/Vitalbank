import { linhasDeCredito } from "@/dados";
import { LinhasDeCredito } from "@/telas/emprestimos/LinhasDeCredito";

export default async function Emprestimos() {
  const linhas = await linhasDeCredito();
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px]">
      <LinhasDeCredito linhas={linhas} />
    </div>
  );
}
