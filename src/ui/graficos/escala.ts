/** Matemática dos gráficos: escalas, marcas de eixo e curva suave. Sem React. */

export interface Ponto {
  x: number;
  y: number;
}

/** Função que leva o intervalo `dominio` para o intervalo `faixa`, em linha reta. */
export function escalaLinear([d0, d1]: [number, number], [f0, f1]: [number, number]) {
  const k = d1 === d0 ? 0 : (f1 - f0) / (d1 - d0);
  return (v: number) => f0 + (v - d0) * k;
}

/**
 * Marcas "redondas" de 0 até cobrir `maximo`, em cerca de `quantas` passos:
 * 480 → [0, 100, 200, 300, 400, 500]. O passo é 1, 2, 2,5 ou 5 × potência de 10.
 */
export function marcasDoEixo(maximo: number, quantas = 5): number[] {
  if (maximo <= 0) return [0, 1];
  const bruto = maximo / quantas;
  const potencia = 10 ** Math.floor(Math.log10(bruto));
  const passo = [1, 2, 2.5, 5, 10].map((m) => m * potencia).find((p) => p >= bruto)!;
  const topo = Math.ceil(maximo / passo) * passo;
  const marcas: number[] = [];
  for (let v = 0; v <= topo + passo / 2; v += passo) marcas.push(Math.round(v * 1e6) / 1e6);
  return marcas;
}

/**
 * Caminho SVG suave passando por todos os pontos (interpolação monotônica de
 * Fritsch–Carlson): não passa do pico nem do vale — a curva nunca sugere um valor
 * que os dados não têm.
 */
export function caminhoSuave(pontos: readonly Ponto[]): string {
  const n = pontos.length;
  if (n === 0) return "";
  if (n === 1) return `M${pontos[0].x},${pontos[0].y}`;
  const dx = pontos.slice(1).map((p, i) => p.x - pontos[i].x);
  const inc = pontos.slice(1).map((p, i) => (p.y - pontos[i].y) / dx[i]);
  const tg = pontos.map((_, i) => {
    if (i === 0) return inc[0];
    if (i === n - 1) return inc[n - 2];
    return inc[i - 1] * inc[i] <= 0 ? 0 : (inc[i - 1] + inc[i]) / 2;
  });
  for (let i = 0; i < n - 1; i++) {
    if (inc[i] === 0) {
      tg[i] = tg[i + 1] = 0;
      continue;
    }
    const a = tg[i] / inc[i];
    const b = tg[i + 1] / inc[i];
    const s = a * a + b * b;
    if (s > 9) {
      const t = 3 / Math.sqrt(s);
      tg[i] = t * a * inc[i];
      tg[i + 1] = t * b * inc[i];
    }
  }
  const r = (v: number) => Math.round(v * 100) / 100;
  let d = `M${r(pontos[0].x)},${r(pontos[0].y)}`;
  for (let i = 0; i < n - 1; i++) {
    const p = pontos[i];
    const q = pontos[i + 1];
    const h = dx[i] / 3;
    d += ` C${r(p.x + h)},${r(p.y + tg[i] * h)} ${r(q.x - h)},${r(q.y - tg[i + 1] * h)} ${r(q.x)},${r(q.y)}`;
  }
  return d;
}
