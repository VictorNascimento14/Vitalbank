/**
 * A fronteira dos dados (ADR-001). As telas leem só por aqui; hoje as funções devolvem
 * as sementes, e são `async` porque é essa a forma que terão quando o backend chegar.
 */
import { ATIVIDADE_SEMANAL } from "./sementes/atividade";
import { CARTOES } from "./sementes/cartoes";
import { TRANSACOES } from "./sementes/transacoes";
import type { Cartao, Transacao } from "./tipos";

export type * from "./tipos";

export async function listarCartoes(): Promise<readonly Cartao[]> {
  return CARTOES;
}

export async function listarTransacoes(opcoes: { limite?: number } = {}): Promise<readonly Transacao[]> {
  return opcoes.limite === undefined ? TRANSACOES : TRANSACOES.slice(0, opcoes.limite);
}

export async function atividadeSemanal() {
  return ATIVIDADE_SEMANAL;
}
