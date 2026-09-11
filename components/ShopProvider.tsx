"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";
import {
  defaultStoreData,
  type StoreData,
  type StoreSettings,
  type Theme
} from "@/lib/store-defaults";

type CartItem = Product & { qty: number };

type PublishResult = {
  ok: boolean;
  mode: "cloud" | "local";
  message: string;
};

type ShopContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  theme: Theme;
  settings: StoreSettings;
  categories: string[];
  products: Product[];
  hydrated: boolean;
  saveTheme: (theme: Theme) => void;
  saveSettings: (settings: StoreSettings) => void;
  saveProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  addCategory: (name: string) => void;
  deleteCategory: (name: string) => void;
  publishStore: () => Promise<PublishResult>;
};

const ShopContext = createContext<ShopContextType | null>(null);
const STORE_CACHE_KEY = "shop-store-cache-v3";
const CART_KEY = "shop-cart-v2";

function normalizeProduct(product: Product): Product {
  return {
    ...product,
    stock: typeof product.stock === "number" ? product.stock : 0,
    active: typeof product.active === "boolean" ? product.active : true,
    featured: typeof product.featured === "boolean" ? product.featured : false
  };
}

function mergeProducts(rawProducts?: Product[]) {
  const defaults = defaultStoreData.products.map(normalizeProduct);
  if (!Array.isArray(rawProducts) || rawProducts.length === 0) return defaults;

  const savedBySlug = new Map(rawProducts.map((p) => [p.slug, normalizeProduct(p)]));
  const merged = defaults.map((fallback) => {
    const saved = savedBySlug.get(fallback.slug);
    return saved ? { ...fallback, ...saved } : fallback;
  });

  const defaultSlugs = new Set(defaults.map((p) => p.slug));
  const custom = rawProducts
    .filter((p) => !defaultSlugs.has(p.slug))
    .map(normalizeProduct);

  return [...merged, ...custom];
}

function normalizeStore(raw?: Partial<StoreData> | null): StoreData {
  const rawCategories = Array.isArray(raw?.categories) ? raw!.categories! : [];
  const categories = Array.from(
    new Set([...defaultStoreData.categories, ...rawCategories].filter(Boolean))
  );

  return {
    theme: { ...defaultStoreData.theme, ...(raw?.theme || {}) },
    settings: { ...defaultStoreData.settings, ...(raw?.settings || {}) },
    categories,
    products: mergeProducts(raw?.products as Product[] | undefined)
  };
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [theme, setTheme] = useState<Theme>(defaultStoreData.theme);
  const [settings, setSettings] = useState<StoreSettings>(defaultStoreData.settings);
  const [categories, setCategories] = useState<string[]>(defaultStoreData.categories);
  const [products, setProducts] = useState<Product[]>(defaultStoreData.products);
  const [hydrated, setHydrated] = useState(false);
  const [cartHydrated, setCartHydrated] = useState(false);

  const applyStore = (data: StoreData) => {
    const normalized = normalizeStore(data);
    setTheme(normalized.theme);
    setSettings(normalized.settings);
    setCategories(normalized.categories);
    setProducts(normalized.products);
  };

  useEffect(() => {
    let cancelled = false;

    try {
      const savedCart = localStorage.getItem(CART_KEY) || localStorage.getItem("shop-cart");
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) setCart(parsed);
      }
    } catch {}
    setCartHydrated(true);

    try {
      const cached =
        localStorage.getItem(STORE_CACHE_KEY) ||
        localStorage.getItem("shop-store-cache");
      if (cached) applyStore(JSON.parse(cached));
    } catch {}

    (async () => {
      try {
        const response = await fetch("/api/store", { cache: "no-store" });
        const payload = await response.json();
        if (!cancelled && response.ok && payload?.data) {
          // Mesmo em modo local, normalizamos com o catálogo novo para impedir
          // que caches antigos reduzam a quantidade de produtos.
          applyStore(payload.data);
        }
      } catch {
      } finally {
        if (!cancelled) setHydrated(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secondary", theme.secondary);
    document.documentElement.style.setProperty("--button", theme.button);
  }, [theme]);

  useEffect(() => {
    if (!cartHydrated) return;
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, cartHydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORE_CACHE_KEY,
      JSON.stringify({ theme, settings, categories, products })
    );
  }, [hydrated, theme, settings, categories, products]);

  const addToCart = (product: Product) => {
    if (!product.active || product.stock <= 0) return;

    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      if (found) {
        return items.map((item) =>
          item.id === product.id
            ? { ...item, qty: Math.min(item.qty + 1, Math.max(product.stock, 1)) }
            : item
        );
      }
      return [...items, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((items) => items.filter((item) => item.id !== id));

  const clearCart = () => setCart([]);

  const saveProduct = (product: Product) => {
    setProducts((items) => {
      const exists = items.some((item) => item.id === product.id);
      return exists
        ? items.map((item) => (item.id === product.id ? product : item))
        : [product, ...items];
    });
  };

  const deleteProduct = (id: number) =>
    setProducts((items) => items.filter((item) => item.id !== id));

  const addCategory = (name: string) => {
    const clean = name.trim();
    if (!clean) return;
    setCategories((items) =>
      items.some((item) => item.toLowerCase() === clean.toLowerCase())
        ? items
        : [...items, clean]
    );
  };

  const deleteCategory = (name: string) =>
    setCategories((items) => items.filter((item) => item !== name));

  const publishStore = async (): Promise<PublishResult> => {
    const response = await fetch("/api/admin/store", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme, settings, categories, products })
    });

    const payload = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(payload?.message || "Não foi possível publicar as alterações.");
    }

    return payload;
  };

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      totalItems: cart.reduce((n, i) => n + i.qty, 0),
      subtotal: cart.reduce((n, i) => n + i.price * i.qty, 0),
      theme,
      settings,
      categories,
      products,
      hydrated,
      saveTheme: setTheme,
      saveSettings: setSettings,
      saveProduct,
      deleteProduct,
      addCategory,
      deleteCategory,
      publishStore
    }),
    [cart, theme, settings, categories, products, hydrated]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop deve ser usado dentro de ShopProvider");
  return context;
}
