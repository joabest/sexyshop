import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { categories, products } from "@/lib/catalog";
import { CreditCard, LockKeyhole, PackageCheck, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Header />

      <section className="hero">
        <div className="heroContent">
          <span className="eyebrow">+18 • Privacidade em primeiro lugar</span>
          <h1>Prazer, bem-estar e discrição em uma experiência elegante.</h1>
          <p>Produtos selecionados, pagamento seguro e embalagem neutra. Nada na caixa revela o conteúdo da compra.</p>
          <div className="heroActions">
            <a className="primaryButton" href="#destaques">Comprar agora</a>
            <a className="ghostButton light" href="#discricao">Como funciona a entrega discreta</a>
          </div>
        </div>
        <div className="heroPanel">
          <div className="heroCard">
            <ShieldCheck size={34}/>
            <strong>Compra 100% discreta</strong>
            <span>Embalagem neutra e identificação de cobrança configurável.</span>
          </div>
        </div>
      </section>

      <section className="benefits" id="discricao">
        <div><CreditCard/><span><strong>Até 12x</strong> no cartão</span></div>
        <div><Truck/><span><strong>Frete rápido</strong> com rastreio</span></div>
        <div><LockKeyhole/><span><strong>Pagamento seguro</strong> e LGPD</span></div>
        <div><PackageCheck/><span><strong>Embalagem neutra</strong> e discreta</span></div>
      </section>

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

      <section className="section softSection" id="destaques">
        <div className="sectionHeader">
          <div><span className="eyebrow dark">Seleção especial</span><h2>Mais vendidos</h2></div>
          <a href="#">Ver todos os produtos →</a>
        </div>
        <div className="productGrid">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="promoStrip" id="promocoes">
        <div>
          <span className="eyebrow">Oferta do mês</span>
          <h2>Primeira compra com desconto</h2>
          <p>Estrutura preparada para cupons, timer de promoção, kits e campanhas sazonais.</p>
        </div>
        <a className="primaryButton whiteButton" href="#destaques">Ver promoções</a>
      </section>

      <section className="section" id="atendimento">
        <div className="trustBox">
          <div>
            <span className="eyebrow dark">Atendimento discreto</span>
            <h2>Dúvidas? Fale sem constrangimento.</h2>
            <p>O tema está preparado para WhatsApp, Telegram, Instagram, FAQ, rastreio de pedido e páginas institucionais.</p>
          </div>
          <div className="trustList">
            <span>✓ Remetente discreto nos e-mails</span>
            <span>✓ Política de privacidade e LGPD</span>
            <span>✓ Trocas seguindo regras de higiene</span>
            <span>✓ Checkout como convidado</span>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div><strong>Vip SexShop</strong><p>Loja demonstrativa • Venda exclusiva para maiores de 18 anos.</p></div>
        <div><strong>Institucional</strong><a href="#">Privacidade</a><a href="#">Termos</a><a href="#">Trocas</a></div>
        <div><strong>Atendimento</strong><a href="#">WhatsApp</a><a href="#">FAQ</a><a href="#">Rastrear pedido</a></div>
      </footer>
    </main>
  );
}
