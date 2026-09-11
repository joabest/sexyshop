"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { money, type Product } from "@/lib/catalog";
import { useShop } from "@/components/ShopProvider";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const soldOut = product.stock <= 0;

  return (
    <article className="productCard">
      <Link href={"/produto/" + product.slug} className="productImageWrap">
        {product.badge && <span className="badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} className="productImage" />
      </Link>
      <div className="productBody">
        <span className="productCategory">{product.category}</span>
        <Link href={"/produto/" + product.slug}><h3>{product.name}</h3></Link>
        {product.oldPrice && <span className="oldPrice">{money(product.oldPrice)}</span>}
        <div className="price">{money(product.price)}</div>
        <div className="pixText">{soldOut ? "Indisponível" : "ou 5% de desconto no Pix"}</div>
        <button className="buyButton" disabled={soldOut} onClick={() => addToCart(product)}>
          <ShoppingBag size={17}/> {soldOut ? "Sem estoque" : "Adicionar"}
        </button>
      </div>
    </article>
  );
}
