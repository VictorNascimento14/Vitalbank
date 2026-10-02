/**
 * A fronteira dos dados (ADR-001). As telas leem só por aqui; hoje as funções devolvem
 * as sementes, e são `async` porque é essa a forma que terão quando o backend chegar.
 */
import { ATIVIDADE_SEMANAL } from "./sementes/atividade";
import { CARTOES } from "./sementes/cartoes";
import { RESUMO_DA_CONTA } from "./sementes/conta";
import { CONTATOS } from "./sementes/contatos";
import { DEBITO_E_CREDITO } from "./sementes/debitoCredito";
import { DESPESAS_POR_CATEGORIA } from "./sementes/despesas";
import { DESPESAS_MENSAIS } from "./sementes/despesasMensais";
import { HISTORICO_DE_SALDO } from "./sementes/saldo";
import { TRANSACOES } from "./sementes/transacoes";
import type { Cartao, Contato, Transacao } from "./tipos";

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

export async function despesasPorCategoria() {
  return DESPESAS_POR_CATEGORIA;
}

export async function listarContatos(): Promise<readonly Contato[]> {
  return CONTATOS;
}

/** Saldo de fim de mês, do mais antigo ao mais recente. */
export async function historicoDeSaldo() {
  return HISTORICO_DE_SALDO;
}

/** Total gasto por mês, seis meses, do mais antigo ao atual. */
export async function despesasMensais() {
  return DESPESAS_MENSAIS;
}

/** Saldo, receitas e despesas do mês e o total poupado. */
export async function resumoDaConta() {
  return RESUMO_DA_CONTA;
}

/** Débitos e créditos por dia, últimos 7 dias. */
export async function debitoECredito() {
  return DEBITO_E_CREDITO;
}
