/**
 * Datas do Vitalbank são `AAAA-MM-DD` (dia) ou `AAAA-MM-DDTHH:mm` (momento), sempre no
 * horário local. Nunca `toISOString()` para "hoje": à noite no Brasil ele já devolve o
 * dia seguinte, porque converte para UTC.
 */
export type DiaISO = string;

const FORMATO_DIA = /^(\d{4})-(\d{2})-(\d{2})(?:T(\d{2}):(\d{2}))?$/;

/** Lê a data no horário local (o construtor `new Date("2021-01-28")` lê em UTC). */
export function lerData(texto: DiaISO): Date {
  const m = FORMATO_DIA.exec(texto);
  if (!m) throw new RangeError(`data fora do formato AAAA-MM-DD: ${texto}`);
  const [, a, me, d, h = "0", mi = "0"] = m;
  return new Date(Number(a), Number(me) - 1, Number(d), Number(h), Number(mi));
}

export function diaISO(data: Date): DiaISO {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${data.getFullYear()}-${p(data.getMonth() + 1)}-${p(data.getDate())}`;
}

const longa = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric" });
const curta = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" });
const hora = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" });
const mes = new Intl.DateTimeFormat("pt-BR", { month: "short" });
const semana = new Intl.DateTimeFormat("pt-BR", { weekday: "short" });

const semPonto = (texto: string) => texto.replace(".", "");

/** "28 de janeiro de 2021" */
export function formatarDataLonga(texto: DiaISO): string {
  return longa.format(lerData(texto));
}

const media = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" });

/** "28 set 2026" — cabe numa linha de lista estreita. */
export function formatarDataMedia(texto: DiaISO): string {
  return media
    .format(lerData(texto.slice(0, 10)))
    .replace(/ de /g, " ")
    .replace(".", "");
}

/** "28 jan, 12:30" — a hora só aparece quando o texto traz hora. */
export function formatarDataCurta(texto: DiaISO): string {
  const data = lerData(texto);
  const dia = semPonto(curta.format(data)).replace(" de ", " ");
  return texto.includes("T") ? `${dia}, ${hora.format(data)}` : dia;
}

/** "jan" — rótulo de eixo de gráfico. */
export function mesCurto(texto: DiaISO): string {
  return semPonto(mes.format(lerData(texto)));
}

/** "sáb" — rótulo de eixo de gráfico. */
export function diaDaSemanaCurto(texto: DiaISO): string {
  return semPonto(semana.format(lerData(texto)));
}

const relativo = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" });

/** "hoje", "ontem", "há 5 dias" — contando dias de calendário, não 24 horas. */
export function haQuantoTempo(texto: DiaISO, hoje: Date = new Date()): string {
  const a = lerData(texto.slice(0, 10));
  const b = lerData(diaISO(hoje));
  const dias = Math.round((b.getTime() - a.getTime()) / 86_400_000);
  return relativo.format(-dias, "day");
}
