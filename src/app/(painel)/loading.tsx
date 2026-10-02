import { Bloco, Esqueleto } from "@/ui";

/** Enquanto a tela carrega: a forma de uma tela comum, com o brilho correndo. */
export default function Carregando() {
  return (
    <div role="status" aria-live="polite" className="grid grid-cols-1 gap-6 lg:gap-[30px] xl:grid-cols-[minmax(0,73fr)_minmax(0,35fr)]">
      <span className="sr-only">Carregando…</span>
      <div className="flex flex-col gap-4">
        <Esqueleto className="h-7 w-40" />
        <div className="grid gap-6 md:grid-cols-2">
          <Esqueleto className="aspect-[350/235] rounded-cartao" />
          <Esqueleto className="hidden aspect-[350/235] rounded-cartao md:block" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <Esqueleto className="h-7 w-48" />
        <Bloco className="flex flex-1 flex-col gap-5">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-4">
              <Esqueleto className="size-[45px] shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Esqueleto className="h-3.5 w-3/4" />
                <Esqueleto className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </Bloco>
      </div>
      <Esqueleto className="h-72 rounded-cartao xl:col-span-2" />
    </div>
  );
}
