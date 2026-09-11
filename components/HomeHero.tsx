"use client";

import { ShieldCheck } from "lucide-react";
import { useShop } from "@/components/ShopProvider";

export function HomeHero() {
  const { settings } = useShop();

  return (
    <section className="hero">
      <div className="heroContent">
        <span className="eyebrow">+18 • Privacidade em primeiro lugar</span>
        <h1>{settings.heroTitle}</h1>
        <p>{settings.heroSubtitle}</p>
        <div className="heroActions">
          <a className="primaryButton" href="#destaques">Comprar agora</a>
          <a className="ghostButton light" href="#discricao">Como funciona a entrega discreta</a>
        </div>
      </div>
      <div className="heroPanel">
        <div className="heroCard">
          <ShieldCheck size={34}/>
          <strong>Compra 100% discreta</strong>
          <span>Embalagem neutra e identificação de cobrança configurável.</span>
        </div>
      </div>
    </section>
  );
}
