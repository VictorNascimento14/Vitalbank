"use client";

import { useId } from "react";
import { cx } from "../cx";

/**
 * O símbolo: dois cartões sobrepostos, o da frente com a tarja.
 * O id do gradiente é único por instância: com id fixo, a segunda marca da página
 * (a da gaveta) aponta para o gradiente da primeira — e se a primeira estiver em
 * `display: none` (a coluna do desktop no celular), o gradiente não pinta.
 */
export function SimboloVitalbank({ className }: { className?: string }) {
  const gradiente = `vb-frente-${useId().replace(/:/g, "")}`;
  return (
    <svg viewBox="0 0 36 36" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id={gradiente} x1="4" y1="10" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="var(--primaria)" />
          <stop offset="1" stopColor="var(--azul)" />
        </linearGradient>
      </defs>
      <rect x="9" y="4" width="24" height="17" rx="4" stroke="var(--tinta)" strokeWidth="2.5" />
      <rect x="3" y="12" width="26" height="19" rx="4.5" fill={`url(#${gradiente})`} />
      <rect x="3" y="17" width="26" height="3.5" fill="var(--superficie)" opacity="0.85" />
      <rect x="7" y="24.5" width="7" height="2.5" rx="1.25" fill="var(--superficie)" opacity="0.9" />
    </svg>
  );
}

/** Símbolo + nome. O ponto final vem do kit ("BankDash.") e virou parte da marca. */
export function Marca({ className, compacta }: { className?: string; compacta?: boolean }) {
  return (
    <span className={cx("inline-flex items-center gap-2.5", className)}>
      <SimboloVitalbank className="size-9 shrink-0" />
      {!compacta && (
        <span className="text-[25px] font-extrabold tracking-tight text-tinta">
          Vitalbank<span className="text-primaria">.</span>
        </span>
      )}
    </span>
  );
}
