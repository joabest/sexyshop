"use client";

import Link from "next/link";
import {
  ChevronDown,
  Gift,
  Heart,
  LockKeyhole,
  Menu,
  Percent,
  Search,
  ShoppingCart,
  Truck,
  UserRound,
  X
} from "lucide-react";
import { useState } from "react";
import { useShop } from "@/components/ShopProvider";

const navItems = [
  ["Início", "/"],
  ["Vibradores", "/#destaques"],
  ["Sugadores", "/#destaques"],
  ["Lingeries", "/#destaques"],
  ["Lubrificantes", "/#destaques"],
  ["Kits & Combos", "/#destaques"],
  ["Bem-estar", "/#categorias"],
  ["Mais categorias", "/#categorias"],
  ["Promoções", "/#promocoes"]
];

const offers = [
  { icon: Truck, text: "FRETE DISCRETO PARA TODO O BRASIL" },
  { icon: Percent, text: "USE O CUPOM PRIMEIRA10 E GANHE 10% OFF NA PRIMEIRA COMPRA" },
  { icon: Gift, text: "FRETE GRÁTIS EM COMPRAS ACIMA DE R$ 299" },
  { icon: LockKeyhole, text: "EMBALAGEM 100% DISCRETA E PAGAMENTO SEGURO" },
  { icon: Heart, text: "OFERTAS E COMBOS ESPECIAIS TODA SEMANA" }
];

function OfferTrack() {
  return (
    <>
      {offers.map(({ icon: Icon, text }) => (
        <span className="luxuryMarqueeItem" key={text}>
          <Icon size={14}/>
          <b>{text}</b>
        </span>
      ))}
    </>
  );
}

export function Header() {
  const { totalItems, settings } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="luxuryTopBar" aria-label={settings.announcement}>
        <div className="luxuryMarquee">
          <div className="luxuryMarqueeTrack">
            <OfferTrack />
            <OfferTrack />
          </div>
        </div>
      </div>

      <header className="header luxuryHeader">
        <div className="headerMain luxuryHeaderMain">
          <button
            className="luxuryMobileToggle"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={24}/> : <Menu size={24}/>}
          </button>

          <Link href="/" className="luxuryLogo" aria-label={settings.storeName}>
            <img className="luxuryLogoImage" src="/cordeiro-logo.webp" alt="Cordeiro Deluxxo" />
            <span className="luxuryLogoWords">
              <span className="luxuryLogoMain">CORDEIRO</span>
              <span className="luxuryLogoSub">DE LUXXO</span>
              <span className="luxuryLogoTag">SEX SHOP • Prazer sem limites</span>
            </span>
          </Link>

          <div className="searchBox luxurySearch">
            <input placeholder="O que você deseja hoje?" aria-label="Buscar produtos" />
            <button aria-label="Buscar"><Search size={20}/></button>
          </div>

          <nav className="quickNav luxuryQuickNav">
            <Link href="/admin">
              <UserRound size={20}/>
              <span>Minha conta</span>
            </Link>
            <Link href="#">
              <Heart size={20}/>
              <span>Favoritos</span>
            </Link>
            <Link href="/carrinho" className="cartLink">
              <ShoppingCart size={21}/>
              <span>Meu carrinho</span>
              {totalItems > 0 && <b>{totalItems}</b>}
            </Link>
          </nav>
        </div>

        <nav className="categoryNav luxuryCategoryNav">
          {navItems.map(([label, href], index) => (
            <Link key={label} href={href} className={index === 0 ? "active" : ""}>
              {label}
              {label === "Mais categorias" && <ChevronDown size={13}/>}
            </Link>
          ))}
        </nav>

        {mobileOpen && (
          <div className="luxuryMobileMenu">
            {navItems.map(([label, href]) => (
              <Link key={label} href={href} onClick={() => setMobileOpen(false)}>
                {label}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setMobileOpen(false)}>Minha conta</Link>
          </div>
        )}
      </header>
    </>
  );
}
