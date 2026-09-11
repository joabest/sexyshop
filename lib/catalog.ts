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
};

export const categories = [
  "Vibradores",
  "Plugs",
  "Lubrificantes",
  "Cosméticos",
  "Preservativos",
  "Fantasias & Lingerie",
  "Casais",
  "Kits & Combos"
];

export const products: Product[] = [
  {
    id: 1,
    slug: "vibrador-sense-mini",
    name: "Sense Mini",
    category: "Vibradores",
    price: 129.9,
    oldPrice: 159.9,
    image: "https://images.unsplash.com/photo-1580915411954-282cb1f2b8ce?auto=format&fit=crop&w=900&q=80",
    badge: "Mais vendido",
    description: "Produto demonstrativo. Cadastro completo, variações, estoque e fotos serão gerenciados pelo painel."
  },
  {
    id: 2,
    slug: "kit-casal-noite",
    name: "Kit Casal Noite",
    category: "Kits & Combos",
    price: 189.9,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=900&q=80",
    badge: "Combo",
    description: "Kit demonstrativo com apresentação discreta e elegante."
  },
  {
    id: 3,
    slug: "gel-massageador",
    name: "Gel Massageador",
    category: "Cosméticos",
    price: 49.9,
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=900&q=80",
    badge: "Oferta",
    description: "Produto demonstrativo para composição visual da loja."
  },
  {
    id: 4,
    slug: "lingerie-classic",
    name: "Lingerie Classic",
    category: "Fantasias & Lingerie",
    price: 119.9,
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=900&q=80",
    description: "Peça demonstrativa. Tamanhos e variações poderão ser cadastrados no painel."
  }
];

export const money = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
