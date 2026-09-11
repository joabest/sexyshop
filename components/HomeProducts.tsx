"use client";

import { ArrowRight, Gift, Heart } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/components/ShopProvider";

export function HomeProducts() {
  const { products } = useShop();
  const active = products.filter((product) => product.active);
  const featured = active.filter((product) => product.featured);
  const prioritized = [
    ...featured,
    ...active.filter((product) => !product.featured)
  ];
  const unique = Array.from(new Map(prioritized.map((p) => [p.slug, p])).values());
  const visible = unique.slice(0, 48);

  return (
    <section className="luxurySection luxuryProducts" id="destaques">
      <div className="luxurySectionTitle compactTitle">
        <span className="goldRule"/>
        <div>
          <b>PRODUTOS EM DESTAQUE</b>
          <small>{active.length} OPÇÕES NO CATÁLOGO</small>
        </div>
        <span className="goldRule"/>
      </div>

      <div className="luxuryProductLayout">
        <div className="luxuryProductGrid">
          {visible.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>

        <a className="luxuryComboCard" href="#promocoes">
          <div className="luxuryComboGlow"/>
          <span>COMBOS</span>
          <strong>QUE ELEVAM<br/>O PRAZER</strong>
          <p>Mais variedade.<br/>Mais conexão.<br/>Mais por menos.</p>
          <div className="luxuryGiftOrb"><Gift size={54}/><Heart size={26}/></div>
          <b className="luxuryComboButton">VER COMBOS <ArrowRight size={16}/></b>
        </a>
      </div>
    </section>
  );
}
