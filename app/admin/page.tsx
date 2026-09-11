"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Boxes,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Package,
  Palette,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  ShoppingCart,
  Trash2,
  X
} from "lucide-react";
import { money, type Product } from "@/lib/catalog";
import { useShop } from "@/components/ShopProvider";
import type { StoreSettings, Theme } from "@/lib/store-defaults";

type Tab = "dashboard" | "products" | "orders" | "appearance" | "store";

type AdminOrder = {
  id: string;
  created_at: string;
  customer: string;
  email: string;
  phone?: string;
  payment: string;
  total: number;
  status: string;
  items: Array<{ name: string; qty: number; price: number }>;
};

const emptyProduct = (category: string): Product => ({
  id: Date.now(),
  slug: "",
  name: "",
  category: category || "Sem categoria",
  price: 0,
  image: "",
  description: "",
  stock: 0,
  active: true,
  featured: false
});

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminPage() {
  const {
    products,
    categories,
    settings,
    theme,
    saveProduct,
    deleteProduct,
    addCategory,
    deleteCategory,
    saveSettings,
    saveTheme,
    publishStore
  } = useShop();

  const [tab, setTab] = useState<Tab>("dashboard");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<Product | null>(null);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [ordersMode, setOrdersMode] = useState<"cloud" | "local">("local");
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [draftSettings, setDraftSettings] = useState<StoreSettings>(settings);
  const [draftTheme, setDraftTheme] = useState<Theme>(theme);
  const [newCategory, setNewCategory] = useState("");
  const [notice, setNotice] = useState("");
  const [publishing, setPublishing] = useState(false);

  useEffect(() => setDraftSettings(settings), [settings]);
  useEffect(() => setDraftTheme(theme), [theme]);

  async function loadOrders() {
    setLoadingOrders(true);
    try {
      const response = await fetch("/api/admin/orders", { cache: "no-store" });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Falha ao carregar pedidos.");

      setOrdersMode(payload.mode);
      if (payload.mode === "cloud") {
        setOrders(payload.orders || []);
      } else {
        setOrders(JSON.parse(localStorage.getItem("shop-local-orders") || "[]"));
      }
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Falha ao carregar pedidos.");
    } finally {
      setLoadingOrders(false);
    }
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) =>
      [product.name, product.category, product.slug].some((field) =>
        field.toLowerCase().includes(term)
      )
    );
  }, [products, query]);

  const stats = useMemo(() => {
    const paid = orders.filter((o) => !["Novo", "Cancelado"].includes(o.status));
    return {
      products: products.filter((p) => p.active).length,
      lowStock: products.filter((p) => p.active && p.stock <= 5).length,
      orders: orders.length,
      sales: paid.reduce((sum, order) => sum + Number(order.total || 0), 0)
    };
  }, [products, orders]);

  function submitProduct(e: FormEvent) {
    e.preventDefault();
    if (!editing) return;

    const clean: Product = {
      ...editing,
      name: editing.name.trim(),
      slug: slugify(editing.slug || editing.name),
      image:
        editing.image.trim() ||
        "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=900&q=80",
      price: Number(editing.price),
      oldPrice: editing.oldPrice ? Number(editing.oldPrice) : undefined,
      stock: Math.max(0, Number(editing.stock) || 0)
    };

    if (!clean.name || !clean.slug) return;

    saveProduct(clean);
    setEditing(null);
    setNotice("Produto salvo. Clique em “Publicar alterações” para enviar ao banco.");
  }

  async function publish() {
    setPublishing(true);
    setNotice("");
    try {
      const result = await publishStore();
      setNotice(result.message);
    } catch (err) {
      setNotice(err instanceof Error ? err.message : "Falha ao publicar.");
    } finally {
      setPublishing(false);
    }
  }

  async function updateOrderStatus(id: string, status: string) {
    if (ordersMode === "cloud") {
      const response = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status })
      });
      const payload = await response.json();
      if (!response.ok) {
        setNotice(payload?.message || "Falha ao atualizar pedido.");
        return;
      }
    }

    const next = orders.map((order) =>
      order.id === id ? { ...order, status } : order
    );
    setOrders(next);

    if (ordersMode === "local") {
      localStorage.setItem("shop-local-orders", JSON.stringify(next));
    }
  }

  function saveStoreForm(e: FormEvent) {
    e.preventDefault();
    saveSettings({
      ...draftSettings,
      freeShippingFrom: Number(draftSettings.freeShippingFrom) || 0
    });
    setNotice("Configurações salvas localmente. Publique para disponibilizar na loja.");
  }

  function saveThemeForm(e: FormEvent) {
    e.preventDefault();
    saveTheme(draftTheme);
    setNotice("Aparência aplicada. Publique para disponibilizar para todos.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin-login";
  }

  return (
    <main className="adminShell adminV2">
      <aside className="adminSidebar">
        <div>
          <div className="logo adminLogo">Vip SexShop</div>
          <div className="adminStoreBadge">Administração</div>
        </div>

        <nav>
          <button className={tab === "dashboard" ? "active" : ""} onClick={() => setTab("dashboard")}>
            <LayoutDashboard size={18}/> Visão geral
          </button>
          <button className={tab === "products" ? "active" : ""} onClick={() => setTab("products")}>
            <Package size={18}/> Produtos
          </button>
          <button className={tab === "orders" ? "active" : ""} onClick={() => setTab("orders")}>
            <ShoppingCart size={18}/> Pedidos
          </button>
          <button className={tab === "appearance" ? "active" : ""} onClick={() => setTab("appearance")}>
            <Palette size={18}/> Aparência
          </button>
          <button className={tab === "store" ? "active" : ""} onClick={() => setTab("store")}>
            <Settings size={18}/> Loja e atendimento
          </button>
        </nav>

        <div className="adminSidebarBottom">
          <Link href="/">← Abrir loja</Link>
          <button onClick={logout}><LogOut size={16}/> Sair</button>
        </div>
      </aside>

      <section className="adminContent">
        <header className="adminTopbar">
          <div>
            <span className="eyebrow dark">Painel administrativo</span>
            <h1>
              {tab === "dashboard" && "Visão geral"}
              {tab === "products" && "Produtos"}
              {tab === "orders" && "Pedidos"}
              {tab === "appearance" && "Aparência"}
              {tab === "store" && "Loja e atendimento"}
            </h1>
          </div>

          <div className="adminTopActions">
            <button className="ghostButton compact" onClick={() => window.open("/", "_blank")}>
              Ver loja
            </button>
            <button className="primaryButton compact" disabled={publishing} onClick={publish}>
              <Save size={16}/> {publishing ? "Publicando..." : "Publicar alterações"}
            </button>
          </div>
        </header>

        <div className="adminMobileTabs">
          {[
            ["dashboard", "Resumo"],
            ["products", "Produtos"],
            ["orders", "Pedidos"],
            ["appearance", "Cores"],
            ["store", "Loja"]
          ].map(([key, label]) => (
            <button
              key={key}
              className={tab === key ? "active" : ""}
              onClick={() => setTab(key as Tab)}
            >
              {label}
            </button>
          ))}
        </div>

        {notice && (
          <div className="adminNotice">
            {notice}
            <button onClick={() => setNotice("")}>×</button>
          </div>
        )}

        {tab === "dashboard" && (
          <>
            <div className="adminStats">
              <div><span>Produtos ativos</span><strong>{stats.products}</strong><small>do catálogo</small></div>
              <div><span>Estoque baixo</span><strong>{stats.lowStock}</strong><small>5 unidades ou menos</small></div>
              <div><span>Pedidos</span><strong>{stats.orders}</strong><small>{ordersMode === "cloud" ? "sincronizados" : "neste navegador"}</small></div>
              <div><span>Vendas registradas</span><strong>{money(stats.sales)}</strong><small>pedidos em andamento/pagos</small></div>
            </div>

            <div className="adminDashboardGrid">
              <section className="adminCard">
                <div className="adminCardTitle">
                  <div><h2>Ações rápidas</h2><p>Gerencie a operação sem editar código.</p></div>
                </div>

                <div className="quickActionsGrid">
                  <button onClick={() => { setEditing(emptyProduct(categories[0])); setTab("products"); }}>
                    <Plus/><span><strong>Novo produto</strong><small>Nome, preço, estoque e imagem</small></span><ChevronRight/>
                  </button>
                  <button onClick={() => setTab("orders")}>
                    <ShoppingCart/><span><strong>Ver pedidos</strong><small>Acompanhar e alterar status</small></span><ChevronRight/>
                  </button>
                  <button onClick={() => setTab("appearance")}>
                    <Palette/><span><strong>Alterar identidade</strong><small>Cores do tema em tempo real</small></span><ChevronRight/>
                  </button>
                  <button onClick={() => setTab("store")}>
                    <Settings/><span><strong>Configurar loja</strong><small>WhatsApp, aviso e textos da home</small></span><ChevronRight/>
                  </button>
                </div>
              </section>

              <section className="adminCard">
                <div className="adminCardTitle">
                  <div><h2>Estoque</h2><p>Produtos que precisam de atenção.</p></div>
                  <Boxes size={20}/>
                </div>
                <div className="stockList">
                  {products
                    .filter((p) => p.active)
                    .sort((a, b) => a.stock - b.stock)
                    .slice(0, 6)
                    .map((p) => (
                      <button key={p.id} onClick={() => { setEditing(p); setTab("products"); }}>
                        <span>{p.name}</span>
                        <strong className={p.stock <= 5 ? "dangerText" : ""}>{p.stock} un.</strong>
                      </button>
                    ))}
                </div>
              </section>
            </div>
          </>
        )}

        {tab === "products" && (
          <section className="adminCard">
            <div className="adminTableToolbar">
              <div className="adminSearch">
                <Search size={17}/>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar produto ou categoria..."
                />
              </div>
              <button className="primaryButton compact" onClick={() => setEditing(emptyProduct(categories[0]))}>
                <Plus size={16}/> Novo produto
              </button>
            </div>

            <div className="adminProductTable">
              <div className="adminTableHead">
                <span>Produto</span><span>Categoria</span><span>Preço</span><span>Estoque</span><span>Status</span><span></span>
              </div>

              {filteredProducts.map((product) => (
                <div className="adminTableRow" key={product.id}>
                  <button className="productCell" onClick={() => setEditing(product)}>
                    <img src={product.image} alt=""/>
                    <span><strong>{product.name}</strong><small>/{product.slug}</small></span>
                  </button>
                  <span>{product.category}</span>
                  <strong>{money(product.price)}</strong>
                  <span className={product.stock <= 5 ? "dangerText" : ""}>{product.stock}</span>
                  <span><b className={product.active ? "statusPill active" : "statusPill"}>{product.active ? "Ativo" : "Oculto"}</b></span>
                  <div className="rowActions">
                    <button onClick={() => setEditing(product)}>Editar</button>
                    <button
                      className="iconDanger"
                      title="Excluir"
                      onClick={() => {
                        if (confirm(`Excluir ${product.name}?`)) deleteProduct(product.id);
                      }}
                    >
                      <Trash2 size={16}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === "orders" && (
          <section className="adminCard">
            <div className="adminTableToolbar">
              <div>
                <h2>Pedidos recebidos</h2>
                <p>
                  {ordersMode === "cloud"
                    ? "Dados sincronizados pelo Supabase."
                    : "Modo local: configure o Supabase para sincronizar entre dispositivos."}
                </p>
              </div>
              <button className="ghostButton compact" disabled={loadingOrders} onClick={loadOrders}>
                <RefreshCw size={16}/> Atualizar
              </button>
            </div>

            {!orders.length ? (
              <div className="emptyState">
                <ShoppingCart size={32}/>
                <h3>Nenhum pedido registrado.</h3>
                <p>Os novos pedidos do checkout aparecerão aqui.</p>
              </div>
            ) : (
              <div className="ordersList">
                {orders.map((order) => (
                  <article className="orderCard" key={order.id}>
                    <div className="orderMain">
                      <div><small>Pedido</small><strong>{order.id}</strong></div>
                      <div><small>Cliente</small><strong>{order.customer}</strong><span>{order.email}</span></div>
                      <div><small>Total</small><strong>{money(Number(order.total))}</strong><span>{order.payment}</span></div>
                      <div>
                        <small>Status</small>
                        <select value={order.status} onChange={(e) => updateOrderStatus(order.id, e.target.value)}>
                          {["Novo", "Pago", "Em separação", "Enviado", "Entregue", "Cancelado"].map((status) => (
                            <option key={status}>{status}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="orderItems">
                      {order.items?.map((item, index) => (
                        <span key={index}>{item.qty}× {item.name}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {tab === "appearance" && (
          <form className="adminCard" onSubmit={saveThemeForm}>
            <div className="adminCardTitle">
              <div>
                <h2>Identidade visual</h2>
                <p>Altere as cores e visualize a mudança imediatamente após salvar.</p>
              </div>
            </div>

            <div className="colorGrid">
              <label>
                Cor principal
                <input type="color" value={draftTheme.primary} onChange={(e) => setDraftTheme({ ...draftTheme, primary: e.target.value })}/>
                <code>{draftTheme.primary}</code>
              </label>
              <label>
                Cor secundária
                <input type="color" value={draftTheme.secondary} onChange={(e) => setDraftTheme({ ...draftTheme, secondary: e.target.value })}/>
                <code>{draftTheme.secondary}</code>
              </label>
              <label>
                Cor dos botões
                <input type="color" value={draftTheme.button} onChange={(e) => setDraftTheme({ ...draftTheme, button: e.target.value })}/>
                <code>{draftTheme.button}</code>
              </label>
            </div>

            <div className="themePreview">
              <div style={{ background: draftTheme.secondary }}>
                <span style={{ color: draftTheme.primary }}>Vip SexShop</span>
                <button style={{ background: draftTheme.button }}>Comprar agora</button>
              </div>
            </div>

            <button className="primaryButton" type="submit">Aplicar aparência</button>
          </form>
        )}

        {tab === "store" && (
          <div className="adminDashboardGrid oneWide">
            <form className="adminCard" onSubmit={saveStoreForm}>
              <div className="adminCardTitle">
                <div><h2>Loja e atendimento</h2><p>Conteúdo que aparece automaticamente no site.</p></div>
              </div>

              <div className="adminFormGrid">
                <label>Nome da loja<input value={draftSettings.storeName} onChange={(e) => setDraftSettings({ ...draftSettings, storeName: e.target.value })}/></label>
                <label>WhatsApp<input value={draftSettings.whatsapp} onChange={(e) => setDraftSettings({ ...draftSettings, whatsapp: e.target.value })} placeholder="5511999999999"/></label>
                <label>Instagram<input value={draftSettings.instagram} onChange={(e) => setDraftSettings({ ...draftSettings, instagram: e.target.value })} placeholder="@perfil"/></label>
                <label>Telegram<input value={draftSettings.telegram} onChange={(e) => setDraftSettings({ ...draftSettings, telegram: e.target.value })} placeholder="@canal"/></label>
                <label>Horário de atendimento<input value={draftSettings.supportHours} onChange={(e) => setDraftSettings({ ...draftSettings, supportHours: e.target.value })}/></label>
                <label>Frete grátis acima de<input type="number" min="0" value={draftSettings.freeShippingFrom} onChange={(e) => setDraftSettings({ ...draftSettings, freeShippingFrom: Number(e.target.value) })}/></label>
                <label className="span2">Barra de ofertas<input value={draftSettings.announcement} onChange={(e) => setDraftSettings({ ...draftSettings, announcement: e.target.value })}/></label>
                <label className="span2">Título principal<textarea value={draftSettings.heroTitle} onChange={(e) => setDraftSettings({ ...draftSettings, heroTitle: e.target.value })}/></label>
                <label className="span2">Texto principal<textarea value={draftSettings.heroSubtitle} onChange={(e) => setDraftSettings({ ...draftSettings, heroSubtitle: e.target.value })}/></label>
                <label className="switchRow span2">
                  <input type="checkbox" checked={draftSettings.adultGate} onChange={(e) => setDraftSettings({ ...draftSettings, adultGate: e.target.checked })}/>
                  <span><strong>Verificação de idade 18+</strong><small>Manter bloqueio de entrada para menores.</small></span>
                </label>
              </div>

              <button className="primaryButton" type="submit">Salvar configurações</button>
            </form>

            <section className="adminCard">
              <div className="adminCardTitle">
                <div><h2>Categorias</h2><p>Adicione ou remova categorias do menu da loja.</p></div>
              </div>

              <form
                className="categoryAdminAdd"
                onSubmit={(e) => {
                  e.preventDefault();
                  addCategory(newCategory);
                  setNewCategory("");
                }}
              >
                <input value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Nova categoria"/>
                <button className="primaryButton compact"><Plus size={15}/> Adicionar</button>
              </form>

              <div className="categoryAdminList">
                {categories.map((category) => (
                  <div key={category}>
                    <span>{category}</span>
                    <button onClick={() => deleteCategory(category)}><X size={15}/></button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </section>

      {editing && (
        <div className="adminModalBackdrop" onMouseDown={() => setEditing(null)}>
          <form className="adminModal" onSubmit={submitProduct} onMouseDown={(e) => e.stopPropagation()}>
            <div className="adminModalHeader">
              <div>
                <span className="eyebrow dark">Catálogo</span>
                <h2>{products.some((p) => p.id === editing.id) ? "Editar produto" : "Novo produto"}</h2>
              </div>
              <button type="button" onClick={() => setEditing(null)}><X/></button>
            </div>

            <div className="adminFormGrid">
              <label className="span2">Nome<input required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })}/></label>
              <label>Slug<input value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="gerado-automaticamente"/></label>
              <label>Categoria<select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })}>{categories.map((c) => <option key={c}>{c}</option>)}</select></label>
              <label>Preço<input type="number" step="0.01" min="0" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })}/></label>
              <label>Preço antigo<input type="number" step="0.01" min="0" value={editing.oldPrice || ""} onChange={(e) => setEditing({ ...editing, oldPrice: e.target.value ? Number(e.target.value) : undefined })}/></label>
              <label>Estoque<input type="number" min="0" value={editing.stock} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })}/></label>
              <label>Selo<input value={editing.badge || ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value })} placeholder="Oferta, Novo..."/></label>
              <label className="span2">URL da imagem<input value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} placeholder="https://..."/></label>
              <label className="span2">Descrição<textarea rows={4} value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })}/></label>
              <label className="switchRow">
                <input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })}/>
                <span><strong>Produto ativo</strong><small>Visível na loja.</small></span>
              </label>
              <label className="switchRow">
                <input type="checkbox" checked={editing.featured} onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}/>
                <span><strong>Destaque na home</strong><small>Exibir em mais vendidos.</small></span>
              </label>
            </div>

            {editing.image && <img className="adminImagePreview" src={editing.image} alt="Prévia"/>}

            <div className="adminModalActions">
              <button type="button" className="ghostButton" onClick={() => setEditing(null)}>Cancelar</button>
              <button className="primaryButton" type="submit"><Save size={16}/> Salvar produto</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
}
