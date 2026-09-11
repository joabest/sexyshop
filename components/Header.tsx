"use client";

import Link from "next/link";
import {
  ChevronDown,
  Crown,
  Heart,
  LockKeyhole,
  Menu,
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
  ["Lingeries", "/#destaques"],
  ["Bondage", "/#destaques"],
  ["Lubrificantes", "/#destaques"],
  ["Kits & Combos", "/#destaques"],
  ["Bem-estar", "/#categorias"],
  ["Marcas", "/#categorias"],
  ["Promoções", "/#promocoes"]
];

export function Header() {
  const { totalItems, settings } = useShop();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="luxuryTopBar">
        <div className="luxuryTopInner">
          <span><Truck size={14}/> FRETE DISCRETO PARA TODO O BRASIL</span>
          <span><LockKeyhole size={14}/> SUA PRIVACIDADE É A NOSSA PRIORIDADE</span>
          <span><Heart size={14}/> +10.000 CLIENTES SATISFEITOS</span>
          <b>18+</b>
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
            <Crown className="luxuryLogoCrown" size={26}/>
            <span className="luxuryLogoMain">CORDEIRO</span>
            <span className="luxuryLogoSub">DE LUXXO</span>
            <span className="luxuryLogoTag">SEX SHOP • Prazer sem limites</span>
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
              {label === "Marcas" && <ChevronDown size={13}/>}
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
