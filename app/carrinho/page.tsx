"use client";

import Link from "next/link";
import { Header } from "@/components/Header";
import { money } from "@/lib/catalog";
import { useShop } from "@/components/ShopProvider";

export default function CartPage() {
  const { cart, removeFromCart, subtotal } = useShop();
  const shipping = subtotal >= 299 ? 0 : 19.9;

  return (
    <main>
      <Header />
      <section className="section">
        <div className="sectionHeader"><div><span className="eyebrow dark">Seu pedido</span><h1>Carrinho</h1></div></div>
        {cart.length === 0 ? (
          <div className="emptyState">
            <h2>Seu carrinho está vazio.</h2>
            <p>Adicione produtos para continuar.</p>
            <Link className="primaryButton" href="/">Voltar para a loja</Link>
          </div>
        ) : (
          <div className="cartLayout">
            <div className="cartItems">
              {cart.map((item) => (
                <div className="cartItem" key={item.id}>
                  <img src={item.image} alt={item.name}/>
                  <div><strong>{item.name}</strong><span>Quantidade: {item.qty}</span><span>{money(item.price * item.qty)}</span></div>
                  <button onClick={() => removeFromCart(item.id)}>Remover</button>
                </div>
              ))}
            </div>
            <aside className="summaryCard">
              <h2>Resumo</h2>
              <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div><span>Frete</span><strong>{shipping === 0 ? "Grátis" : money(shipping)}</strong></div>
              <hr/>
              <div className="totalLine"><span>Total</span><strong>{money(subtotal + shipping)}</strong></div>
              <Link className="primaryButton full" href="/checkout">Ir para o checkout</Link>
              <small>Embalagem externa neutra e sem identificação do conteúdo.</small>
            </aside>
          </div>
        )}
      </section>
    </main>
  );
}
