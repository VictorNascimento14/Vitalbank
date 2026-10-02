import { cx } from "../cx";

/** Pares de token para o gradiente. A pessoa sempre cai no mesmo par (hash do nome). */
const PARES = [
  ["--primaria", "--azul"],
  ["--turquesa", "--sucesso"],
  ["--rosa", "--perigo"],
  ["--alerta", "--laranja"],
  ["--tinta", "--tinta-suave"],
  ["--azul", "--turquesa"],
] as const;

const TAMANHOS = {
  sm: "size-10 text-legenda",
  md: "size-[50px] text-rotulo",
  lg: "size-[70px] text-menu",
  xl: "size-[90px] text-secao md:size-[130px] md:text-titulo",
} as const;

export function iniciais(nome: string): string {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toLocaleUpperCase("pt-BR");
}

export function parDoNome(nome: string): (typeof PARES)[number] {
  let h = 0;
  for (const c of nome) h = (h * 31 + c.codePointAt(0)!) >>> 0;
  return PARES[h % PARES.length];
}

interface Props {
  nome: string;
  tamanho?: keyof typeof TAMANHOS;
  className?: string;
}

/**
 * Avatar desenhado com as iniciais sobre um gradiente de tokens. O app não usa foto de
 * pessoa (ADR-002): retrato de banco de imagens parece dado de cliente real.
 */
export function Avatar({ nome, tamanho = "md", className }: Props) {
  const [a, b] = parDoNome(nome);
  return (
    <span
      role="img"
      aria-label={nome}
      className={cx(
        "inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white select-none",
        TAMANHOS[tamanho],
        className,
      )}
      style={{ backgroundImage: `linear-gradient(135deg, var(${a}), var(${b}))` }}
    >
      <span aria-hidden="true">{iniciais(nome)}</span>
    </span>
  );
}
