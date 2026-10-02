/** "Ocultar valores": `data-ocultar` no <html> + escolha guardada neste navegador. */
export const CHAVE_DE_OCULTAR = "vitalbank-ocultar";

export function valoresOcultos(): boolean {
  return document.documentElement.hasAttribute("data-ocultar");
}

export function assinarOcultar(aviso: () => void): () => void {
  const observador = new MutationObserver(aviso);
  observador.observe(document.documentElement, { attributes: true, attributeFilter: ["data-ocultar"] });
  return () => observador.disconnect();
}

export function definirOcultar(ocultar: boolean) {
  document.documentElement.toggleAttribute("data-ocultar", ocultar);
  try {
    if (ocultar) localStorage.setItem(CHAVE_DE_OCULTAR, "sim");
    else localStorage.removeItem(CHAVE_DE_OCULTAR);
  } catch {
    /* sem armazenamento: vale só nesta página */
  }
}

/** Roda no <head>, antes da primeira pintura: o saldo não pode aparecer nem por um quadro. */
export const SCRIPT_DE_OCULTAR = `try{if(localStorage.getItem("${CHAVE_DE_OCULTAR}")==="sim")document.documentElement.setAttribute("data-ocultar","")}catch(e){}`;
