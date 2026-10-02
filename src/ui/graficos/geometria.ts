/** Geometria de setores circulares (pizza e rosca). Ângulos em radianos, 0 = 12 horas. */

export function noCirculo(cx: number, cy: number, r: number, angulo: number) {
  return { x: cx + r * Math.sin(angulo), y: cy - r * Math.cos(angulo) };
}

/**
 * Caminho SVG de um setor entre `a0` e `a1`. Com `raioInterno` > 0, vira um arco de
 * rosca. Setor de volta inteira é desenhado em duas metades (um arco de 360° some).
 */
export function setor(cx: number, cy: number, r: number, a0: number, a1: number, raioInterno = 0): string {
  if (a1 - a0 >= Math.PI * 2 - 1e-9) {
    const meio = a0 + Math.PI;
    return setor(cx, cy, r, a0, meio, raioInterno) + " " + setor(cx, cy, r, meio, a1, raioInterno);
  }
  const f = (v: number) => Math.round(v * 100) / 100;
  const grande = a1 - a0 > Math.PI ? 1 : 0;
  const p0 = noCirculo(cx, cy, r, a0);
  const p1 = noCirculo(cx, cy, r, a1);
  if (raioInterno <= 0) {
    return `M${f(cx)},${f(cy)} L${f(p0.x)},${f(p0.y)} A${r},${r} 0 ${grande} 1 ${f(p1.x)},${f(p1.y)} Z`;
  }
  const q1 = noCirculo(cx, cy, raioInterno, a1);
  const q0 = noCirculo(cx, cy, raioInterno, a0);
  return (
    `M${f(p0.x)},${f(p0.y)} A${r},${r} 0 ${grande} 1 ${f(p1.x)},${f(p1.y)} ` +
    `L${f(q1.x)},${f(q1.y)} A${raioInterno},${raioInterno} 0 ${grande} 0 ${f(q0.x)},${f(q0.y)} Z`
  );
}

/** Divide a volta proporcionalmente aos valores: [{ a0, a1, meio }]. */
export function fatias(valores: readonly number[]) {
  const total = valores.reduce((a, b) => a + b, 0) || 1;
  let a = 0;
  return valores.map((v) => {
    const a0 = a;
    a += (v / total) * Math.PI * 2;
    return { a0, a1: a, meio: (a0 + a) / 2, fracao: v / total };
  });
}
