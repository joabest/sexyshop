"use client";

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";
import { money, type Product } from "@/lib/catalog";
import { useShop } from "@/components/ShopProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const soldOut = product.stock <= 0;

  return (
    <article className="productCard luxuryProductCard">
      <Link href={"/produto/" + product.slug} className="productImageWrap luxuryProductImageWrap">
        {product.badge && <span className="badge luxuryBadge">{product.badge}</span>}
        <img src={product.image} alt={product.name} className="productImage" />
        <span className="luxuryProductShine"/>
      </Link>

      <div className="productBody luxuryProductBody">
        <Link href={"/produto/" + product.slug}><h3>{product.name}</h3></Link>

        <div className="luxuryRating" aria-label="5 estrelas">
          {[0,1,2,3,4].map((n) => <Star key={n} size={12} fill="currentColor"/>)}
          <small>({90 + product.id * 17})</small>
        </div>

        <div className="luxuryPriceLine">
          <div className="price">{money(product.price)}</div>
          {product.oldPrice && <span className="oldPrice">{money(product.oldPrice)}</span>}
        </div>

        <button className="buyButton luxuryBuyButton" disabled={soldOut} onClick={() => addToCart(product)}>
          <ShoppingCart size={16}/> {soldOut ? "Sem estoque" : "Adicionar"}
        </button>
      </div>
    </article>
  );
}
