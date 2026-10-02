import { RiHandCoinFill, RiMoneyDollarBoxFill, RiSafe2Fill, RiWallet3Fill } from "@remixicon/react";
import type { resumoDaConta } from "@/dados";
import { CartaoDeResumo } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

type Dados = Awaited<ReturnType<typeof resumoDaConta>>;

export function ResumoDaConta({ resumo }: { resumo: Dados }) {
  const cartoes = [
    { rotulo: "Meu saldo", valor: resumo.saldo, tom: "amarelo", icone: <RiWallet3Fill /> },
    { rotulo: "Receitas", valor: resumo.receitas, tom: "azul", icone: <RiHandCoinFill /> },
    { rotulo: "Despesas", valor: resumo.despesas, tom: "rosa", icone: <RiMoneyDollarBoxFill /> },
    { rotulo: "Poupança", valor: resumo.poupanca, tom: "turquesa", icone: <RiSafe2Fill /> },
  ] as const;
  return (
    <section aria-label="Resumo da conta" className="xl:col-span-2">
      <Escalonado como="ul" className="grid grid-cols-2 gap-4 md:gap-6 xl:grid-cols-4 xl:gap-[30px]">
        {cartoes.map((c) => (
          <ItemEscalonado key={c.rotulo} como="li">
            <CartaoDeResumo {...c} className="h-full" />
          </ItemEscalonado>
        ))}
      </Escalonado>
    </section>
  );
}
