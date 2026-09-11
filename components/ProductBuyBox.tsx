"use client";

import Link from "next/link";
import { money, type Product } from "@/lib/catalog";
import { useShop } from "@/components/ShopProvider";

export function ProductBuyBox({ product }: { product: Product }) {
  const { addToCart } = useShop();
  const soldOut = product.stock <= 0;

  return (
    <div className="buyBox">
      <span className="productCategory">{product.category}</span>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <div className="price big">{money(product.price)}</div>
      <span className="pixText">5% de desconto no Pix</span>
      <div className={soldOut ? "stockBadge danger" : "stockBadge"}>
        {soldOut ? "Indisponível" : `${product.stock} unidades em estoque`}
      </div>
      <label>Variação
        <select defaultValue="padrao"><option value="padrao">Padrão</option></select>
      </label>
      <div className="productActions">
        <button className="primaryButton" disabled={soldOut} onClick={() => addToCart(product)}>
          {soldOut ? "Produto indisponível" : "Adicionar ao carrinho"}
        </button>
        <Link className="ghostButton" href="/carrinho">Ver carrinho</Link>
      </div>
      <div className="discreetNote">🔒 Compra discreta: embalagem neutra e proteção dos seus dados.</div>
    </div>
  );
}
