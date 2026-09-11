"use client";

import Link from "next/link";
import { Check, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import { money, type Product } from "@/lib/catalog";
import { useShop } from "@/components/ShopProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;

  function handleAdd() {
    if (soldOut) return;
    addToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1300);
  }

  return (
    <article className="productCard luxuryProductCard">
      <Link href={"/produto/" + product.slug} className="productImageWrap luxuryProductImageWrap">
        {product.badge && <span className="badge luxuryBadge">{product.badge}</span>}
        <img src={product.image} alt={product.name} className="productImage" />
        <span className="luxuryProductShine"/>
      </Link>

      <div className="productBody luxuryProductBody">
        <span className="productCategory">{product.category}</span>
        <Link href={"/produto/" + product.slug}><h3>{product.name}</h3></Link>

        <div className="luxuryRating" aria-label="5 estrelas">
          {[0,1,2,3,4].map((n) => <Star key={n} size={12} fill="currentColor"/>)}
          <small>({38 + (product.id * 13) % 240})</small>
        </div>

        <div className="luxuryPriceLine">
          <div className="price">{money(product.price)}</div>
          {product.oldPrice && <span className="oldPrice">{money(product.oldPrice)}</span>}
        </div>

        <button
          type="button"
          className={"buyButton luxuryBuyButton" + (added ? " added" : "")}
          disabled={soldOut}
          onClick={handleAdd}
        >
          {added ? <Check size={16}/> : <ShoppingCart size={16}/>}
          {soldOut ? "Sem estoque" : added ? "Adicionado!" : "Adicionar ao carrinho"}
        </button>
      </div>
    </article>
  );
}
