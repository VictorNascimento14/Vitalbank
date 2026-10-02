import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import { ProvedorDeMovimento } from "@/ui/movimento";
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
  title: { default: "Vitalbank", template: "%s · Vitalbank" },
  description: "Painel de banco digital — cartões, transações, contas e investimentos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: o script do <head> põe data-tema antes do React hidratar
    <html lang="pt-BR" className={`${inter.variable} ${lato.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_DO_TEMA }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ProvedorDeMovimento>{children}</ProvedorDeMovimento>
      </body>
    </html>
  );
}
