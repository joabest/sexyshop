"use client";

import {
  ArrowRight,
  Gift,
  ShieldCheck,
  Truck
} from "lucide-react";
import { useShop } from "@/components/ShopProvider";

export function HomeHero() {
  const { settings } = useShop();

  return (
    <section className="hero luxuryHero" style={{ position: "relative", overflow: "hidden" }}>
      <img
        src="https://unsplash.com/photos/NcxKjRwRIQg/download?force=true&w=1600"
        alt=""
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 35%",
          opacity: 0.05,
          filter: "blur(7px)",
          transform: "scale(1.06)",
          pointerEvents: "none",
          zIndex: 0
        }}
      />
      <div className="luxuryHeroGlow" style={{ position: "relative", zIndex: 1 }}/>
      <div className="heroContent luxuryHeroContent" style={{ position: "relative", zIndex: 2 }}>
        <span className="luxuryHeroKicker">DESCUBRA UM</span>
        <h1>
          <span>MUNDO DE PRAZER</span>
          <em>Sem limites</em>
        </h1>
        <p>{settings.heroSubtitle}</p>

        <div className="luxuryHeroTrust">
          <div><Gift size={21}/><span>Embalagem<br/><b>100% discreta</b></span></div>
          <div><ShieldCheck size={21}/><span>Compra<br/><b>segura</b></span></div>
          <div><Truck size={21}/><span>Entrega para<br/><b>todo o Brasil</b></span></div>
          <div><span className="adultRound">18+</span><span>Prazer com<br/><b>responsabilidade</b></span></div>
        </div>

        <a className="primaryButton luxuryCta" href="#destaques">
          QUERO EXPLORAR AGORA <ArrowRight size={18}/>
        </a>
      </div>

      <div className="luxuryHeroVisual" style={{ position: "relative", zIndex: 2 }}>
        <div className="luxuryHeroPhotoFrame">
          <img
            className="luxuryHeroPhoto"
            src="/cordeiro-hero.webp"
            alt="Visual Cordeiro Deluxxo"
          />
        </div>
      </div>
    </section>
  );
}
