"use client";

import { ProductCard } from "@/components/ProductCard";
import { useShop } from "@/components/ShopProvider";

export function HomeProducts() {
  const { products } = useShop();
  const active = products.filter((product) => product.active);
  const featured = active.filter((product) => product.featured);
  const visible = (featured.length ? featured : active).slice(0, 8);

  return (
    <section className="section softSection" id="destaques">
      <div className="sectionHeader">
        <div><span className="eyebrow dark">Seleção especial</span><h2>Mais vendidos</h2></div>
        <span className="mutedText">{active.length} produtos ativos</span>
      </div>
      {visible.length ? (
        <div className="productGrid">
          {visible.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="emptyState">
          <h3>Nenhum produto ativo no momento.</h3>
          <p>Ative produtos no painel administrativo.</p>
        </div>
      )}
    </section>
  );
}
