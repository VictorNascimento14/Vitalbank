import { metadadosDaTela } from "@/ui/casca/navegacao";
import { emprestimosAtivos, linhasDeCredito } from "@/dados";
import { EmprestimosAtivos } from "@/telas/emprestimos/EmprestimosAtivos";
import { LinhasDeCredito } from "@/telas/emprestimos/LinhasDeCredito";

export const metadata = metadadosDaTela("/emprestimos");

export default async function Emprestimos() {
  const [linhas, emprestimos] = await Promise.all([linhasDeCredito(), emprestimosAtivos()]);
  return (
    <div className="grid grid-cols-1 gap-6 lg:gap-[30px]">
      <LinhasDeCredito linhas={linhas} />
      <EmprestimosAtivos emprestimos={emprestimos} />
    </div>
  );
}
