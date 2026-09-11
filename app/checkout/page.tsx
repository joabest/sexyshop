"use client";

import { FormEvent, useState } from "react";
import { Header } from "@/components/Header";
import { money } from "@/lib/catalog";
import { useShop } from "@/components/ShopProvider";

export default function CheckoutPage() {
  const { subtotal } = useShop();
  const [done, setDone] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    setDone(true);
  }

  return (
    <main>
      <Header />
      <section className="section">
        <div className="sectionHeader"><div><span className="eyebrow dark">Finalização discreta</span><h1>Checkout</h1></div></div>
        {done ? (
          <div className="emptyState">
            <h2>Pedido demonstrativo recebido.</h2>
            <p>A integração real de Pix, cartão, boleto, frete e e-mail será ligada às credenciais da loja.</p>
          </div>
        ) : (
          <form className="checkoutGrid" onSubmit={submit}>
            <div className="formCard">
              <h2>Dados de entrega</h2>
              <div className="fieldGrid">
                <label>Nome completo<input required /></label>
                <label>E-mail<input type="email" required /></label>
                <label>Telefone<input required /></label>
                <label>CEP<input required /></label>
                <label className="span2">Endereço<input required /></label>
                <label>Número<input required /></label>
                <label>Complemento<input /></label>
              </div>
              <h2>Pagamento</h2>
              <div className="paymentOptions">
                <label><input type="radio" name="pay" defaultChecked /> Pix</label>
                <label><input type="radio" name="pay" /> Cartão de crédito</label>
                <label><input type="radio" name="pay" /> Boleto</label>
              </div>
            </div>
            <aside className="summaryCard">
              <h2>Resumo</h2>
              <div><span>Produtos</span><strong>{money(subtotal)}</strong></div>
              <div><span>Frete</span><strong>A calcular</strong></div>
              <hr/>
              <button className="primaryButton full" type="submit">Finalizar pedido</button>
              <small>Checkout demonstrativo até a configuração do gateway e do frete.</small>
            </aside>
          </form>
        )}
      </section>
    </main>
  );
}
