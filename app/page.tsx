import { Header } from "@/components/Header";
import { HomeHero } from "@/components/HomeHero";
import { HomeCategories } from "@/components/HomeCategories";
import { HomeProducts } from "@/components/HomeProducts";
import { CreditCard, LockKeyhole, PackageCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <main>
      <Header />
      <HomeHero />

      <section className="benefits" id="discricao">
        <div><CreditCard/><span><strong>Até 12x</strong> no cartão</span></div>
        <div><Truck/><span><strong>Frete rápido</strong> com rastreio</span></div>
        <div><LockKeyhole/><span><strong>Pagamento seguro</strong> e LGPD</span></div>
        <div><PackageCheck/><span><strong>Embalagem neutra</strong> e discreta</span></div>
      </section>

      <HomeCategories />
      <HomeProducts />

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
            <p>WhatsApp, Telegram, Instagram, FAQ, rastreio de pedido e páginas institucionais podem ser configurados pelo painel.</p>
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
        <div><strong>Vip SexShop</strong><p>Venda exclusiva para maiores de 18 anos.</p></div>
        <div><strong>Institucional</strong><a href="#">Privacidade</a><a href="#">Termos</a><a href="#">Trocas</a></div>
        <div><strong>Atendimento</strong><a href="#">WhatsApp</a><a href="#">FAQ</a><a href="#">Rastrear pedido</a></div>
      </footer>
    </main>
  );
}
