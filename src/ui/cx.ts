/** Junta classes, ignorando as falsas: `cx("a", cond && "b")`. */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
