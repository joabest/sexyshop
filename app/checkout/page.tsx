"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { money } from "@/lib/catalog";
import { useShop } from "@/components/ShopProvider";

export default function CheckoutPage() {
  const { subtotal, cart, totalItems, clearCart } = useShop();
  const [orderId, setOrderId] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cart.length) return;

    setSending(true);
    setError("");

    const form = new FormData(e.currentTarget);
    const order = {
      customer: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      cep: String(form.get("cep") || ""),
      address: String(form.get("address") || ""),
      number: String(form.get("number") || ""),
      complement: String(form.get("complement") || ""),
      payment: String(form.get("payment") || "Pix"),
      total: subtotal,
      items: cart.map((item) => ({
        productId: item.id,
        name: item.name,
        qty: item.qty,
        price: item.price
      }))
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order)
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Falha ao registrar pedido.");

      if (payload.mode === "local") {
        const previous = JSON.parse(localStorage.getItem("shop-local-orders") || "[]");
        localStorage.setItem(
          "shop-local-orders",
          JSON.stringify([payload.order, ...previous])
        );
      }

      setOrderId(payload.order.id);
      clearCart();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível finalizar o pedido.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      <Header />
      <section className="section">
        <div className="sectionHeader">
          <div><span className="eyebrow dark">Finalização discreta</span><h1>Checkout</h1></div>
        </div>

        {orderId ? (
          <div className="emptyState">
            <h2>Pedido recebido.</h2>
            <p>Número do pedido: <strong>{orderId}</strong></p>
            <Link className="primaryButton" href="/">Continuar comprando</Link>
          </div>
        ) : !cart.length ? (
          <div className="emptyState">
            <h2>Seu carrinho está vazio.</h2>
            <Link className="primaryButton" href="/">Voltar para a loja</Link>
          </div>
        ) : (
          <form className="checkoutGrid" onSubmit={submit}>
            <div className="formCard">
              <h2>Dados de entrega</h2>
              <div className="fieldGrid">
                <label>Nome completo<input name="name" required /></label>
                <label>E-mail<input name="email" type="email" required /></label>
                <label>Telefone<input name="phone" required /></label>
                <label>CEP<input name="cep" required /></label>
                <label className="span2">Endereço<input name="address" required /></label>
                <label>Número<input name="number" required /></label>
                <label>Complemento<input name="complement" /></label>
              </div>
              <h2>Pagamento</h2>
              <div className="paymentOptions">
                <label><input type="radio" name="payment" value="Pix" defaultChecked /> Pix</label>
                <label><input type="radio" name="payment" value="Cartão" /> Cartão de crédito</label>
                <label><input type="radio" name="payment" value="Boleto" /> Boleto</label>
              </div>
            </div>
            <aside className="summaryCard">
              <h2>Resumo</h2>
              <div><span>Itens</span><strong>{totalItems}</strong></div>
              <div><span>Produtos</span><strong>{money(subtotal)}</strong></div>
              <div><span>Frete</span><strong>A calcular</strong></div>
              <hr/>
              {error && <div className="formError">{error}</div>}
              <button className="primaryButton full" disabled={sending} type="submit">
                {sending ? "Registrando..." : "Finalizar pedido"}
              </button>
              <small>Embalagem externa neutra e sem identificação do conteúdo.</small>
            </aside>
          </form>
        )}
      </section>
    </main>
  );
}
