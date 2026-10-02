import type { MetadataRoute } from "next";

// Necessário no export estático: o manifesto é gerado no build.
export const dynamic = "force-static";

/** Instalar como app. Caminhos relativos ao manifesto, para funcionar sob o basePath do Pages. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Vitalbank",
    short_name: "Vitalbank",
    description: "Painel de banco digital — cartões, transações, contas e investimentos.",
    lang: "pt-BR",
    start_url: "./",
    scope: "./",
    display: "standalone",
    background_color: "#f5f7fa",
    theme_color: "#1814f3",
    icons: [
      { src: "icone-192.png", sizes: "192x192", type: "image/png" },
      { src: "icone-512.png", sizes: "512x512", type: "image/png" },
      { src: "icone-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
