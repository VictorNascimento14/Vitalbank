/** Busca do app: sem acento, sem diferença de maiúscula, todas as palavras precisam aparecer. */

export interface ItemDeBusca {
  tipo: "tela" | "transacao" | "servico";
  titulo: string;
  detalhe: string;
  href: string;
}

export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/**
 * Itens em que todas as palavras do termo aparecem (no título ou no detalhe). Título que
 * começa com o termo vem antes; depois, título que contém; por último, só o detalhe.
 */
export function buscar(itens: readonly ItemDeBusca[], termo: string, limite = 8): ItemDeBusca[] {
  const palavras = normalizar(termo).split(/\s+/).filter(Boolean);
  if (palavras.length === 0) return [];
  const pontuados = itens
    .map((item) => {
      const titulo = normalizar(item.titulo);
      const tudo = `${titulo} ${normalizar(item.detalhe)}`;
      if (!palavras.every((p) => tudo.includes(p))) return null;
      const pontos = titulo.startsWith(palavras[0]) ? 0 : palavras.every((p) => titulo.includes(p)) ? 1 : 2;
      return { item, pontos };
    })
    .filter((x): x is { item: ItemDeBusca; pontos: number } => x !== null);
  return pontuados
    .sort((a, b) => a.pontos - b.pontos)
    .slice(0, limite)
    .map((x) => x.item);
}
