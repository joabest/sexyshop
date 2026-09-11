import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { ProductBuyBox } from "@/components/ProductBuyBox";
import { products } from "@/lib/catalog";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

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
