import type { Cartao } from "@/dados";
import { AcaoDosCartoes } from "@/telas/comum/MeusCartoes";
import { CartaoDeCredito, TituloDeSecao } from "@/ui";
import { Surgir } from "@/ui/movimento";

/** Um cartão em destaque na Contas (no kit, o azul-claro). */
export function MeuCartao({ cartao }: { cartao: Cartao }) {
  return (
    <section aria-labelledby="meu-cartao" className="flex flex-col">
      <TituloDeSecao id="meu-cartao" acao={<AcaoDosCartoes href="/cartoes">Ver todos</AcaoDosCartoes>}>
        Meu cartão
      </TituloDeSecao>
      <Surgir className="flex flex-1 items-start">
        <CartaoDeCredito cartao={cartao} className="w-full" />
      </Surgir>
    </section>
  );
}
