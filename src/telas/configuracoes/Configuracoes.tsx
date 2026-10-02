"use client";

import type { obterPerfil } from "@/dados";
import { Abas, Bloco } from "@/ui";
import { EditarPerfil } from "./EditarPerfil";

type Perfil = Awaited<ReturnType<typeof obterPerfil>>;

/** As três abas de Configurações (kit: Edit Profile, Preferences, Security). */
export function Configuracoes({ perfil }: { perfil: Perfil }) {
  return (
    <Bloco className="md:!p-8">
      <Abas
        rotulo="Configurações"
        abas={[{ id: "perfil", rotulo: "Editar perfil", conteudo: <EditarPerfil perfil={perfil} /> }]}
      />
    </Bloco>
  );
}
