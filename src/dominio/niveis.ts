/** Em que nível os pontos estão, qual é o próximo e quanto do caminho já foi feito. */
export function situacaoNoPrograma<N extends { id: string; minimo: number }>(niveis: readonly N[], pontos: number) {
  const ordenados = [...niveis].sort((a, b) => a.minimo - b.minimo);
  const indice = ordenados.findLastIndex((n) => pontos >= n.minimo);
  const atual = ordenados[Math.max(indice, 0)];
  const proximo = ordenados[indice + 1];
  if (!proximo) return { atual, proximo: undefined, faltam: 0, progresso: 1 };
  const progresso = (pontos - atual.minimo) / (proximo.minimo - atual.minimo);
  return { atual, proximo, faltam: proximo.minimo - pontos, progresso };
}

/** O benefício já vale para quem está no nível `atual`? */
export function beneficioLiberado<N extends { id: string; minimo: number }>(
  niveis: readonly N[],
  nivelDoBeneficio: string,
  atual: string,
): boolean {
  const minimo = (id: string) => niveis.find((n) => n.id === id)?.minimo ?? Infinity;
  return minimo(nivelDoBeneficio) <= minimo(atual);
}
