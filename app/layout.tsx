import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Di Lorenzo | Advocacia",
  description: "Estratégia, clareza e presença para decisões importantes.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
