"use client";

import {
  ArrowRight,
  Gift,
  Heart,
  ShieldCheck,
  Sparkles,
  Truck
} from "lucide-react";
import { useShop } from "@/components/ShopProvider";

export function HomeHero() {
  const { settings } = useShop();

  return (
    <section className="hero luxuryHero">
      <div className="luxuryHeroGlow"/>
      <div className="heroContent luxuryHeroContent">
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

      <div className="luxuryHeroVisual" aria-hidden="true">
        <div className="luxuryFabric luxuryFabricOne"/>
        <div className="luxuryFabric luxuryFabricTwo"/>
        <div className="luxuryHeartFrame">
          <Heart size={180} strokeWidth={1.2}/>
          <div className="luxurySilhouette">
            <Sparkles size={48}/>
          </div>
        </div>
        <div className="luxuryHeroPhrase">
          <span>Mais que produtos,</span>
          <strong>é liberdade</strong>
          <Heart size={22}/>
        </div>
      </div>
    </section>
  );
}
