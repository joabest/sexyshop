"use client";

import { useEffect } from "react";
import { Header } from "@/components/Header";
import { HomeHero } from "@/components/HomeHero";
import { HomeCategories } from "@/components/HomeCategories";
import { HomeProducts } from "@/components/HomeProducts";
import {
  Facebook,
  Gift,
  Heart,
  Home as HomeIcon,
  Instagram,
  Menu,
  MessageCircle,
  ShieldCheck,
  Truck,
  UserRound,
  Youtube
} from "lucide-react";

export default function Home() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const goToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    goToTop();
    const frame = window.requestAnimationFrame(goToTop);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <main className="luxuryStore">
      <Header />
      <HomeHero />
      <HomeCategories />
      <HomeProducts />

      <section className="luxuryTrustBar" id="discricao">
        <div><Gift/><span><b>EMBALAGEM DISCRETA</b><small>Sua privacidade garantida</small></span></div>
        <div><ShieldCheck/><span><b>PAGAMENTO SEGURO</b><small>Seus dados protegidos</small></span></div>
        <div><Truck/><span><b>ENTREGA RÁPIDA</b><small>Para todo o Brasil</small></span></div>
        <div><MessageCircle/><span><b>ATENDIMENTO VIA WHATSAPP</b><small>Tire suas dúvidas em tempo real</small></span></div>
      </section>

      <section className="luxuryPromoStrip" id="promocoes">
        <div className="luxuryPromoCopy">
          <span>OFERTA ESPECIAL</span>
          <h2>Prazer, sofisticação e discrição em cada detalhe.</h2>
          <p>Cadastre promoções, cupons e combos pelo painel administrativo.</p>
        </div>
        <a href="#destaques">VER OFERTAS</a>
      </section>

      <footer className="luxuryFooter" id="atendimento">
        <div className="luxuryFooterBrand">
          <div className="footerLogoTitle">CORDEIRO</div>
          <div className="footerLogoSub">DE LUXXO • SEX SHOP</div>
          <p>Prazer sem limites ♡</p>
        </div>

        <div>
          <b>Institucional</b>
          <a href="#">Sobre nós</a>
          <a href="#">Política de privacidade</a>
          <a href="#">Trocas e devoluções</a>
          <a href="#">Termos de uso</a>
        </div>

        <div>
          <b>Ajuda</b>
          <a href="#">Central de atendimento</a>
          <a href="#">Rastrear meu pedido</a>
          <a href="#">Dúvidas frequentes</a>
          <a href="#">Fale conosco</a>
        </div>

        <div>
          <b>Formas de pagamento</b>
          <div className="paymentRow">
            <span>VISA</span><span>●●</span><span>PIX</span><span>ELO</span>
          </div>
          <b className="socialTitle">Acompanhe a gente</b>
          <div className="socialRow">
            <Instagram size={18}/><Facebook size={18}/><Youtube size={19}/>
          </div>
        </div>
      </footer>

      <nav className="luxuryMobileBottomNav" aria-label="Navegação mobile">
        <a href="/"><HomeIcon size={20}/><span>Início</span></a>
        <a href="#categorias"><Menu size={20}/><span>Categorias</span></a>
        <a className="whatsappCenter" href="#atendimento"><MessageCircle size={23}/><span>WhatsApp</span></a>
        <a href="#"><Heart size={20}/><span>Favoritos</span></a>
        <a href="/admin"><UserRound size={20}/><span>Conta</span></a>
      </nav>
    </main>
  );
}
