/** Serviços do banco (kit: "Bank Services List"); os atributos substituem o "Lorem Ipsum" do kit. */
export const SERVICOS: readonly {
  id: string;
  nome: string;
  resumo: string;
  icone: "emprestimo" | "conta" | "poupanca" | "cartao" | "seguro";
  atributos: readonly { rotulo: string; valor: string }[];
  descricao: string;
}[] = [
  {
    id: "sv1",
    nome: "Crédito para empresas",
    resumo: "Capital de giro sem burocracia",
    icone: "emprestimo",
    atributos: [
      { rotulo: "Taxa", valor: "a partir de 1,2% a.m." },
      { rotulo: "Prazo", valor: "até 48 meses" },
      { rotulo: "Aprovação", valor: "em 24 horas" },
    ],
    descricao: "Dinheiro para o caixa da empresa, com parcelas fixas e a primeira para até 90 dias.",
  },
  {
    id: "sv2",
    nome: "Conta corrente",
    resumo: "Sem tarifa de manutenção",
    icone: "conta",
    atributos: [
      { rotulo: "Mensalidade", valor: "R$ 0" },
      { rotulo: "Pix", valor: "ilimitado" },
      { rotulo: "Saques", valor: "4 grátis por mês" },
    ],
    descricao: "Conta para o dia a dia, com Pix, boleto e transferências sem custo.",
  },
  {
    id: "sv3",
    nome: "Poupança",
    resumo: "Rende todo dia",
    icone: "poupanca",
    atributos: [
      { rotulo: "Rendimento", valor: "100% do CDI" },
      { rotulo: "Resgate", valor: "a qualquer hora" },
      { rotulo: "Mínimo", valor: "R$ 1" },
    ],
    descricao: "Guarde dinheiro com rendimento diário e resgate quando precisar.",
  },
  {
    id: "sv4",
    nome: "Cartões de débito e crédito",
    resumo: "Anuidade zero no primeiro ano",
    icone: "cartao",
    atributos: [
      { rotulo: "Anuidade", valor: "R$ 0 no 1º ano" },
      { rotulo: "Cashback", valor: "até 1%" },
      { rotulo: "Virtual", valor: "na hora" },
    ],
    descricao: "Cartão físico e virtual, com bloqueio pelo app e aviso a cada compra.",
  },
  {
    id: "sv5",
    nome: "Seguro de vida",
    resumo: "Proteção para quem você ama",
    icone: "seguro",
    atributos: [
      { rotulo: "A partir de", valor: "R$ 9,90/mês" },
      { rotulo: "Cobertura", valor: "até R$ 500 mil" },
      { rotulo: "Carência", valor: "sem carência" },
    ],
    descricao: "Cobertura por morte e invalidez, com assistência funeral incluída.",
  },
  {
    id: "sv6",
    nome: "Crédito pessoal",
    resumo: "Dinheiro na conta no mesmo dia",
    icone: "emprestimo",
    atributos: [
      { rotulo: "Taxa", valor: "a partir de 1,9% a.m." },
      { rotulo: "Prazo", valor: "até 24 meses" },
      { rotulo: "Liberação", valor: "no mesmo dia" },
    ],
    descricao: "Empréstimo pessoal simulado no app, com o valor da parcela antes de contratar.",
  },
];
