"use client";

import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useShop } from "@/components/ShopProvider";

export function Header() {
  const { totalItems, settings } = useShop();

  return (
    <>
      <div className="offerBar">{settings.announcement}</div>
      <header className="header">
        <div className="headerMain">
          <Link href="/" className="logo">{settings.storeName}</Link>
          <div className="searchBox">
            <input placeholder="Digite o que você procura" aria-label="Buscar produtos" />
            <Search size={19} />
          </div>
          <nav className="quickNav">
            <Link href="#"><Heart size={19}/><span>Favoritos</span></Link>
            <Link href="/admin"><UserRound size={19}/><span>Painel</span></Link>
            <Link href="/carrinho" className="cartLink">
              <ShoppingBag size={19}/><span>Carrinho</span>
              {totalItems > 0 && <b>{totalItems}</b>}
            </Link>
          </nav>
          <button className="mobileMenu" aria-label="Abrir menu"><Menu /></button>
        </div>
        <div className="categoryNav">
          <Link href="/#categorias">Categorias</Link>
          <Link href="/#promocoes">Promoções exclusivas</Link>
          <Link href="/#destaques">Mais vendidos</Link>
          <Link href="/#discricao">Compra discreta</Link>
          <Link href="/#atendimento">Atendimento</Link>
        </div>
      </header>
    </>
  );
}
