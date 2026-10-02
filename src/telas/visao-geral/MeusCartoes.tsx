import Link from "next/link";
import type { Cartao } from "@/dados";
import { CartaoDeCredito, TituloDeSecao } from "@/ui";
import { Escalonado, ItemEscalonado } from "@/ui/movimento";

/**
 * Os dois primeiros cartões, lado a lado. No celular viram uma fila que rola na
 * horizontal e para em cada cartão (scroll-snap), como no kit mobile.
 */
export function MeusCartoes({ cartoes }: { cartoes: readonly Cartao[] }) {
  return (
    <section aria-labelledby="meus-cartoes">
      <TituloDeSecao
        id="meus-cartoes"
        acao={
          <Link
            href="/cartoes"
            className="rounded-miudo px-2 py-1 text-rotulo font-semibold text-tinta transition-colors hover:text-primaria-viva focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primaria-viva md:text-menu"
          >
            Ver todos
          </Link>
        }
      >
        Meus cartões
      </TituloDeSecao>
      <Escalonado
        como="ul"
        intervalo={0.12}
        className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 pt-1 md:mx-0 md:gap-[30px] md:overflow-visible md:px-0 [scrollbar-width:none]"
      >
        {cartoes.slice(0, 2).map((c) => (
          <ItemEscalonado key={c.id} como="li" className="w-[265px] shrink-0 snap-start md:w-auto md:flex-1">
            <CartaoDeCredito cartao={c} />
          </ItemEscalonado>
        ))}
      </Escalonado>
    </section>
  );
}
