/**
 * Tema escolhido pela pessoa, guardado só neste navegador (conveniência, não dado). Sem
 * escolha, vale o do sistema. `localStorage` pode falhar (janela privada, bloqueio): por
 * isso todo acesso vai em try/catch.
 */
export type Tema = "claro" | "escuro";

export const CHAVE_DO_TEMA = "vitalbank-tema";

export function temaSalvo(): Tema | null {
  try {
    const t = localStorage.getItem(CHAVE_DO_TEMA);
    return t === "claro" || t === "escuro" ? t : null;
  } catch {
    return null;
  }
}

export function temaEmUso(): Tema {
  const marcado = document.documentElement.dataset.tema;
  if (marcado === "claro" || marcado === "escuro") return marcado;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro";
}

/** Avisa quando o tema em uso muda: `data-tema` no <html> ou a preferência do sistema. */
export function assinarTema(aviso: () => void): () => void {
  const observador = new MutationObserver(aviso);
  observador.observe(document.documentElement, { attributes: true, attributeFilter: ["data-tema"] });
  const sistema = window.matchMedia("(prefers-color-scheme: dark)");
  sistema.addEventListener("change", aviso);
  return () => {
    observador.disconnect();
    sistema.removeEventListener("change", aviso);
  };
}

export function aplicarTema(tema: Tema) {
  document.documentElement.dataset.tema = tema;
  try {
    localStorage.setItem(CHAVE_DO_TEMA, tema);
  } catch {
    /* sem armazenamento: vale só nesta página */
  }
}

/** Roda no <head>, antes da primeira pintura: sem isso a página pisca no tema errado. */
export const SCRIPT_DO_TEMA = `try{var t=localStorage.getItem("${CHAVE_DO_TEMA}");if(t==="claro"||t==="escuro")document.documentElement.dataset.tema=t}catch(e){}`;
