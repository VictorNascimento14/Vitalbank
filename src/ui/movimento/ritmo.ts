/**
 * O ritmo do app: as mesmas durações e curvas em todo lugar (ADR-003).
 * Espelhadas no CSS como `--ease-saida` para transição de hover.
 */
export const duracao = {
  rapida: 0.15,
  media: 0.3,
  lenta: 0.6,
} as const;

/** Sai rápido e pousa devagar — a curva padrão de entrada. */
export const curvaSaida = [0.22, 1, 0.36, 1] as const;

/** Mola para o que responde a gesto (marcador, cartão inclinado). */
export const mola = { type: "spring", stiffness: 380, damping: 32, mass: 0.8 } as const;
