export type Product = {
  id: number;
  slug: string;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  image: string;
  badge?: string;
  description: string;
  stock: number;
  active: boolean;
  featured: boolean;
};

export const defaultCategories = [
  "Vibradores",
  "Lingeries",
  "Bondage",
  "Lubrificantes",
  "Kits & Combos",
  "Bem-estar",
  "Acessórios"
];

export const defaultProducts: Product[] = [
  {
    id: 1,
    slug: "vibrador-rabbit-luxxo",
    name: "Vibrador Rabbit Luxxo",
    category: "Vibradores",
    price: 159.9,
    oldPrice: 199.9,
    image: "https://images.unsplash.com/photo-1580915411954-282cb1f2b8ce?auto=format&fit=crop&w=900&q=85",
    badge: "-20%",
    description: "Design premium, acabamento sofisticado e embalagem totalmente discreta.",
    stock: 18,
    active: true,
    featured: true
  },
  {
    id: 2,
    slug: "conjunto-seducao-deluxxo",
    name: "Conjunto Sedução Deluxxo",
    category: "Lingeries",
    price: 129.9,
    oldPrice: 152.9,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=85",
    badge: "-15%",
    description: "Lingerie elegante com visual sofisticado e caimento pensado para valorizar o corpo.",
    stock: 12,
    active: true,
    featured: true
  },
  {
    id: 3,
    slug: "algemas-em-pelucia",
    name: "Algemas em Pelúcia",
    category: "Bondage",
    price: 59.9,
    oldPrice: 79.9,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=85",
    badge: "-25%",
    description: "Acessório de casal com acabamento macio, elegante e embalagem neutra.",
    stock: 24,
    active: true,
    featured: true
  },
  {
    id: 4,
    slug: "lubrificante-premium-60ml",
    name: "Lubrificante Premium 60ml",
    category: "Lubrificantes",
    price: 49.9,
    oldPrice: 62.9,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=85",
    badge: "-20%",
    description: "Textura confortável e apresentação premium para momentos de bem-estar e intimidade.",
    stock: 31,
    active: true,
    featured: true
  },
  {
    id: 5,
    slug: "kit-prazer-deluxxo",
    name: "Kit Prazer Deluxxo",
    category: "Kits & Combos",
    price: 199.9,
    oldPrice: 289.9,
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
    badge: "-30%",
    description: "Seleção especial de itens para presentear ou experimentar novas sensações com discrição.",
    stock: 15,
    active: true,
    featured: true
  }
];

export const money = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
