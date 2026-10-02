import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vitalbank",
  description: "Painel de banco digital — cartões, transações, contas e investimentos.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
