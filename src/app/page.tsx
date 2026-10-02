import { Marca } from "@/ui";
import { Surgir } from "@/ui/movimento";

export default function Inicio() {
  return (
    <main className="flex flex-1 items-center justify-center p-10">
      <Surgir>
        <section className="rounded-cartao bg-superficie p-8 shadow-cartao">
          <h1>
            <Marca />
          </h1>
          <p className="mt-2 text-rotulo text-tinta-suave">Seu dinheiro, de relance.</p>
        </section>
      </Surgir>
    </main>
  );
}
