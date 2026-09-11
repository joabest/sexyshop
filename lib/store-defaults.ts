import { defaultCategories, defaultProducts, type Product } from "@/lib/catalog";

export type Theme = {
  primary: string;
  secondary: string;
  button: string;
};

export type StoreSettings = {
  storeName: string;
  announcement: string;
  whatsapp: string;
  telegram: string;
  instagram: string;
  supportHours: string;
  freeShippingFrom: number;
  heroTitle: string;
  heroSubtitle: string;
  adultGate: boolean;
};

export type StoreData = {
  theme: Theme;
  settings: StoreSettings;
  categories: string[];
  products: Product[];
};

export const defaultStoreData: StoreData = {
  theme: {
    primary: "#ff2f68",
    secondary: "#111111",
    button: "#ff2f68"
  },
  settings: {
    storeName: "Vip SexShop",
    announcement: "Frete grátis em compras acima de R$ 299 • Embalagem 100% discreta",
    whatsapp: "",
    telegram: "",
    instagram: "",
    supportHours: "Seg. a Sex. das 09h às 18h",
    freeShippingFrom: 299,
    heroTitle: "Prazer, bem-estar e discrição em uma experiência elegante.",
    heroSubtitle: "Produtos selecionados, pagamento seguro e embalagem neutra. Nada na caixa revela o conteúdo da compra.",
    adultGate: true
  },
  categories: defaultCategories,
  products: defaultProducts
};
