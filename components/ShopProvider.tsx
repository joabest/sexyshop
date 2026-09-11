"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/catalog";

type Theme = {
  primary: string;
  secondary: string;
  button: string;
};

type CartItem = Product & { qty: number };

type ShopContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  totalItems: number;
  subtotal: number;
  theme: Theme;
  saveTheme: (theme: Theme) => void;
};

const defaultTheme: Theme = {
  primary: "#ff2f68",
  secondary: "#111111",
  button: "#ff2f68"
};

const ShopContext = createContext<ShopContextType | null>(null);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [theme, setTheme] = useState<Theme>(defaultTheme);

  useEffect(() => {
    const savedTheme = localStorage.getItem("shop-theme");
    if (savedTheme) setTheme(JSON.parse(savedTheme));

    const savedCart = localStorage.getItem("shop-cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--secondary", theme.secondary);
    document.documentElement.style.setProperty("--button", theme.button);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("shop-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((items) => {
      const found = items.find((item) => item.id === product.id);
      return found
        ? items.map((item) => item.id === product.id ? { ...item, qty: item.qty + 1 } : item)
        : [...items, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) => setCart((items) => items.filter((item) => item.id !== id));

  const saveTheme = (next: Theme) => {
    setTheme(next);
    localStorage.setItem("shop-theme", JSON.stringify(next));
  };

  const value = useMemo(() => ({
    cart,
    addToCart,
    removeFromCart,
    totalItems: cart.reduce((n, i) => n + i.qty, 0),
    subtotal: cart.reduce((n, i) => n + i.price * i.qty, 0),
    theme,
    saveTheme
  }), [cart, theme]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop deve ser usado dentro de ShopProvider");
  return context;
}
