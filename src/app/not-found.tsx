import type { Metadata } from "next";
import Link from "next/link";
import { SimboloVitalbank } from "@/ui";
import { Surgir } from "@/ui/movimento";

export const metadata: Metadata = { title: "Página não encontrada · Vitalbank" };

export default function NaoEncontrada() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-16 text-center">
      <Surgir>
        <SimboloVitalbank className="mx-auto size-20 motion-safe:animate-[pairar_4s_ease-in-out_infinite]" />
      </Surgir>
      <Surgir atraso={0.1}>
        <p className="bg-(image:--gradiente-cartao-escuro) bg-clip-text text-[96px] leading-none font-extrabold text-transparent md:text-[140px]">
          404
        </p>
      </Surgir>
      <Surgir atraso={0.2} className="flex flex-col items-center gap-3">
        <h1 className="text-secao font-semibold text-tinta">Esta página não existe</h1>
        <p className="max-w-sm text-rotulo text-tinta-suave md:text-corpo">
          O endereço pode ter mudado, ou foi digitado com algum erro.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex h-12 items-center rounded-campo bg-primaria px-8 font-medium text-white shadow-[0_8px_20px_-8px_var(--primaria)] transition-colors hover:bg-primaria-viva focus-visible:ring-2 focus-visible:ring-primaria-viva focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          Voltar para a visão geral
        </Link>
      </Surgir>
    </main>
  );
}
