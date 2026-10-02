import {
  RiBriefcase4Fill,
  RiMusic2Fill,
  RiPaypalFill,
  RiShoppingBag3Fill,
  RiToolsFill,
  RiUserFill,
} from "@remixicon/react";
import type { ReactNode } from "react";
import type { CategoriaDeTransacao } from "@/dados";
import type { Tom } from "@/ui";

/** Rótulo de cada categoria, como aparece na coluna "Tipo". */
export const TIPO: Record<CategoriaDeTransacao, string> = {
  compra: "Compras",
  transferencia: "Transferência",
  servico: "Serviço",
  assinatura: "Assinatura",
  deposito: "Depósito",
  salario: "Salário",
};

/** Tom e ícone de cada categoria — o mesmo em toda tela que lista transações. */
export const ICONE_DA_CATEGORIA: Record<CategoriaDeTransacao, { tom: Tom; icone: ReactNode }> = {
  assinatura: { tom: "turquesa", icone: <RiMusic2Fill /> },
  compra: { tom: "amarelo", icone: <RiShoppingBag3Fill /> },
  servico: { tom: "azul", icone: <RiToolsFill /> },
  transferencia: { tom: "rosa", icone: <RiUserFill /> },
  deposito: { tom: "azul", icone: <RiPaypalFill /> },
  salario: { tom: "turquesa", icone: <RiBriefcase4Fill /> },
};
