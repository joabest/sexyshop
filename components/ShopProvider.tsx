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

function normalizeStore(raw?: Partial<StoreData> | null): StoreData {
  return {
    theme: { ...defaultStoreData.theme, ...(raw?.theme || {}) },
    settings: { ...defaultStoreData.settings, ...(raw?.settings || {}) },
    categories: Array.isArray(raw?.categories) && raw!.categories!.length
      ? raw!.categories!
      : defaultStoreData.categories,
    products: Array.isArray(raw?.products) && raw!.products!.length
      ? raw!.products!.map((p) => ({
          stock: 0,
          active: true,
          featured: false,
          ...p
        }))
      : defaultStoreData.products
  };
}

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [theme, setTheme] = useState<Theme>(defaultStoreData.theme);
  const [settings, setSettings] = useState<StoreSettings>(defaultStoreData.settings);
  const [categories, setCategories] = useState<string[]>(defaultStoreData.categories);
  const [products, setProducts] = useState<Product[]>(defaultStoreData.products);
  const [hydrated, setHydrated] = useState(false);

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
      const savedCart = localStorage.getItem("shop-cart");
      if (savedCart) setCart(JSON.parse(savedCart));

      const cached = localStorage.getItem("shop-store-cache");
      if (cached) applyStore(JSON.parse(cached));
    } catch {}

    (async () => {
      try {
        const response = await fetch("/api/store", { cache: "no-store" });
        const payload = await response.json();
        if (!cancelled && response.ok && payload?.mode === "cloud" && payload?.data) {
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
    localStorage.setItem("shop-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      "shop-store-cache",
      JSON.stringify({ theme, settings, categories, products })
    );
  }, [hydrated, theme, settings, categories, products]);

  const addToCart = (product: Product) => {
    if (!product.active || product.stock <= 0) return;
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      return found
        ? items.map((item) =>
            item.id === product.id
              ? { ...item, qty: Math.min(item.qty + 1, product.stock) }
              : item
          )
        : [...items, { ...product, qty: 1 }];
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
