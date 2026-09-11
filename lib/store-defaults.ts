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
    primary: "#ff0a78",
    secondary: "#070305",
    button: "#f20a6b"
  },
  settings: {
    storeName: "Cordeiro Deluxxo",
    announcement: "Frete discreto para todo o Brasil • Sua privacidade é a nossa prioridade",
    whatsapp: "",
    telegram: "",
    instagram: "",
    supportHours: "Seg. a Sex. das 09h às 18h",
    freeShippingFrom: 299,
    heroTitle: "Descubra um mundo de prazer sem limites",
    heroSubtitle: "Produtos selecionados para uma vida mais intensa, livre e prazerosa — sempre com discrição.",
    adultGate: true
  },
  categories: defaultCategories,
  products: defaultProducts
};
