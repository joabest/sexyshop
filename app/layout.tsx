import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/components/ShopProvider";
import { AgeGate } from "@/components/AgeGate";

export const metadata: Metadata = {
  title: "Vip SexShop",
  description: "Loja adulta com compra e entrega discretas."
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
