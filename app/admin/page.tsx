"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useShop } from "@/components/ShopProvider";

export default function AdminPage() {
  const { theme, saveTheme } = useShop();
  const [form, setForm] = useState(theme);
  const [saved, setSaved] = useState(false);

  function submit(e: FormEvent) {
    e.preventDefault();
    saveTheme(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <main className="adminShell">
      <aside className="adminSidebar">
        <div className="logo adminLogo">Vip<span>SexShop</span></div>
        <nav>
          <a className="active">Visão geral</a>
          <a>Produtos</a>
          <a>Categorias</a>
          <a>Pedidos</a>
          <a>Clientes</a>
          <a>Cupons</a>
          <a>Banners</a>
          <a>Frete & pagamentos</a>
          <a>Aparência</a>
        </nav>
        <Link href="/">← Voltar para a loja</Link>
      </aside>
      <section className="adminContent">
        <div className="adminTop"><div><span className="eyebrow dark">Painel administrativo</span><h1>Configurações da loja</h1></div></div>

        <div className="adminStats">
          <div><span>Pedidos hoje</span><strong>0</strong></div>
          <div><span>Vendas</span><strong>R$ 0,00</strong></div>
          <div><span>Produtos ativos</span><strong>4</strong></div>
          <div><span>Alertas de estoque</span><strong>0</strong></div>
        </div>

        <form className="adminCard" onSubmit={submit}>
          <div className="sectionHeader">
            <div><h2>Aparência</h2><p>Você poderá trocar as cores sem mexer no código.</p></div>
          </div>
          <div className="colorGrid">
            <label>Cor principal<input type="color" value={form.primary} onChange={(e) => setForm({ ...form, primary: e.target.value })}/><code>{form.primary}</code></label>
            <label>Cor secundária<input type="color" value={form.secondary} onChange={(e) => setForm({ ...form, secondary: e.target.value })}/><code>{form.secondary}</code></label>
            <label>Cor dos botões<input type="color" value={form.button} onChange={(e) => setForm({ ...form, button: e.target.value })}/><code>{form.button}</code></label>
          </div>
          <button className="primaryButton" type="submit">Salvar aparência</button>
          {saved && <span className="savedMessage">Alterações aplicadas na loja.</span>}
        </form>

        <div className="adminCard">
          <h2>Módulos preparados</h2>
          <div className="moduleGrid">
            {["Produtos e variações","Estoque","Categorias","Banners da home","Pedidos","Cupons","Frete","Pagamentos","WhatsApp","Redes sociais","Relatórios","Rastreio"].map((x) => <div key={x}>✓ {x}</div>)}
          </div>
        </div>
      </section>
    </main>
  );
}
