"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Header } from "@/components/Header";
import { ProductBuyBox } from "@/components/ProductBuyBox";
import { useShop } from "@/components/ShopProvider";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const { products, hydrated } = useShop();
  const product = products.find((p) => p.slug === params.slug && p.active);

  if (!product) {
    return (
      <main>
        <Header />
        <section className="section">
          <div className="emptyState">
            <h1>{hydrated ? "Produto não encontrado" : "Carregando produto..."}</h1>
            {hydrated && <Link className="primaryButton" href="/">Voltar para a loja</Link>}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Header />
      <section className="section productDetail">
        <div className="detailGallery"><img src={product.image} alt={product.name}/></div>
        <ProductBuyBox product={product}/>
      </section>
    </main>
  );
}
