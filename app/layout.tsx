import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/components/ShopProvider";
import { AgeGate } from "@/components/AgeGate";

export const metadata: Metadata = {
  title: "Cordeiro Deluxxo | Sex Shop",
  description: "Cordeiro Deluxxo — prazer sem limites, compra segura e entrega discreta para todo o Brasil."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <ShopProvider>
          <AgeGate />
          {children}
        </ShopProvider>
      </body>
    </html>
  );
}
