"use client";

import { ArrowRight, Gift, Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/components/ShopProvider";

export function HomeProducts() {
  const { products } = useShop();
  const active = products.filter((product) => product.active);
  const featured = active.filter((product) => product.featured);
  const visible = (featured.length >= 8 ? featured : active).slice(0, 20);

  return (
    <section className="luxurySection luxuryProducts" id="destaques">
      <div className="luxurySectionTitle compactTitle">
        <span className="goldRule"/>
        <div>
          <b>MAIS VENDIDOS</b>
          <small>OS FAVORITOS DOS NOSSOS CLIENTES</small>
        </div>
        <span className="goldRule"/>
      </div>

      <div className="luxuryProductLayout">
        <div className="luxuryProductGrid">
          {visible.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>

        <a className="luxuryComboCard" href="#promocoes">
          <div className="luxuryComboGlow"/>
          <span>COMBOS</span>
          <strong>QUE ELEVAM<br/>O PRAZER</strong>
          <p>Mais felicidade.<br/>Mais conexão.<br/>Mais por menos.</p>
          <div className="luxuryGiftOrb"><Gift size={54}/><Heart size={26}/></div>
          <b className="luxuryComboButton">VER COMBOS <ArrowRight size={16}/></b>
        </a>
      </div>
    </section>
  );
}
