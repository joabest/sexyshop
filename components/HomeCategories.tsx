"use client";

import { useShop } from "@/components/ShopProvider";

export function HomeCategories() {
  const { categories } = useShop();

  return (
    <section className="section" id="categorias">
      <div className="sectionHeader">
        <div><span className="eyebrow dark">Explore</span><h2>Categorias</h2></div>
        <p>Organização clara para encontrar o produto ideal sem perder tempo.</p>
      </div>
      <div className="categoryGrid">
        {categories.map((category, index) => (
          <a className="categoryTile" href="#destaques" key={category}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{category}</strong>
          </a>
        ))}
      </div>
    </section>
  );
}
