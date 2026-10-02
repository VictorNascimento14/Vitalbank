import { cx } from "../cx";

/**
 * Bloco de carregamento com um brilho que corre da esquerda para a direita. O brilho só
 * anima com `motion-safe`; com movimento reduzido, fica o bloco parado.
 */
export function Esqueleto({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cx(
        "relative overflow-hidden rounded-campo bg-borda/70",
        "after:absolute after:inset-0 after:-translate-x-full after:bg-(image:--brilho-esqueleto) motion-safe:after:animate-[brilhar_1.4s_ease-in-out_infinite]",
        className,
      )}
    />
  );
}
