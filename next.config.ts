import type { NextConfig } from "next";

/**
 * Export estático para o GitHub Pages (ADR-001: sem servidor). O site mora em
 * `/<repositório>/`, então o CI passa `CAMINHO_BASE=/Vitalbank`; localmente fica na raiz.
 */
const caminhoBase = process.env.CAMINHO_BASE ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: caminhoBase,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
