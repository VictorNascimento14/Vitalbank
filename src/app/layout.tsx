import type { Metadata, Viewport } from "next";
import { Inter, Lato } from "next/font/google";
import { ProvedorDeMovimento } from "@/ui/movimento";
import { SCRIPT_DE_OCULTAR } from "@/ui/privacidade/ocultar";
import { SCRIPT_DO_TEMA } from "@/ui/tema/tema";
import "./globals.css";

// Inter é a família do kit; Lato aparece só nos cartões de crédito.
const inter = Inter({ subsets: ["latin"], variable: "--fonte-inter", display: "swap" });
const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--fonte-lato",
  display: "swap",
});

export const metadata: Metadata = {
  // Endereço público, para links absolutos (imagem de compartilhamento). O Pages passa URL_DO_SITE.
  metadataBase: new URL(process.env.URL_DO_SITE ?? "http://localhost:3000"),
  title: { default: "Vitalbank", template: "%s · Vitalbank" },
  description: "Painel de banco digital — cartões, transações, contas e investimentos.",
};

/** Cor da barra do navegador no celular, acompanhando o tema do sistema. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1020" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script do <head> põe data-tema/data-ocultar antes do React hidratar
    <html lang="pt-BR" className={`${inter.variable} ${lato.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_DO_TEMA + SCRIPT_DE_OCULTAR }} />
      </head>
      <body className="flex min-h-full flex-col">
        <ProvedorDeMovimento>{children}</ProvedorDeMovimento>
      </body>
    </html>
  );
}
