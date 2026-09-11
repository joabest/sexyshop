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

const illustration = (title: string, accent = "#ff0a78") =>
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 900">
      <defs>
        <radialGradient id="bg" cx="50%" cy="40%" r="75%">
          <stop offset="0" stop-color="${accent}" stop-opacity=".52"/>
          <stop offset=".46" stop-color="#280714"/>
          <stop offset="1" stop-color="#050304"/>
        </radialGradient>
        <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#fff0a8"/>
          <stop offset=".48" stop-color="#d5a044"/>
          <stop offset="1" stop-color="#8b531d"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="12" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <rect width="900" height="900" fill="url(#bg)"/>
      <circle cx="450" cy="385" r="245" fill="none" stroke="url(#gold)" stroke-width="8"/>
      <circle cx="450" cy="385" r="220" fill="#0b0608" fill-opacity=".76" stroke="#ff2b91" stroke-width="3"/>
      <path d="M450 532C320 452 282 379 300 317c18-62 98-89 150-27 52-62 132-35 150 27 18 62-20 135-150 215Z"
        fill="none" stroke="#ff2b91" stroke-width="14" filter="url(#glow)"/>
      <text x="450" y="697" text-anchor="middle" fill="url(#gold)"
        font-family="Georgia,serif" font-size="48" font-weight="700">${title}</text>
      <text x="450" y="756" text-anchor="middle" fill="#ff4fa7"
        font-family="Arial,sans-serif" font-size="22" letter-spacing="7">CORDEIRO DELUXXO</text>
    </svg>
  `);

export const defaultCategories = [
  "Vibradores",
  "Sugadores",
  "Plugs",
  "Lingeries",
  "Fantasias",
  "Lubrificantes",
  "Cosméticos",
  "Bondage",
  "Massageadores",
  "Kits para Casais",
  "Acessórios",
  "Preservativos",
  "Óleos & Géis",
  "Bem-estar",
  "Presentes",
  "Promoções"
];

type Seed = {
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  accent?: string;
};

const seeds: Seed[] = [
  { name:"Rabbit Luxxo", category:"Vibradores", price:159.9, oldPrice:199.9, badge:"-20%" },
  { name:"Classic Touch", category:"Vibradores", price:119.9, oldPrice:149.9, badge:"Mais vendido", accent:"#d90b72" },
  { name:"Velvet Mini", category:"Vibradores", price:99.9, badge:"Novo", accent:"#ff4d9f" },
  { name:"Diamond Pro", category:"Vibradores", price:219.9, oldPrice:259.9, badge:"Premium", accent:"#a70c54" },

  { name:"Air Kiss", category:"Sugadores", price:189.9, oldPrice:229.9, badge:"Novo", accent:"#ff3b91" },
  { name:"Pulse Mini", category:"Sugadores", price:149.9, oldPrice:179.9, badge:"-17%", accent:"#c51162" },
  { name:"Sweet Air", category:"Sugadores", price:169.9, badge:"Destaque", accent:"#ef177d" },
  { name:"Air Touch Pro", category:"Sugadores", price:239.9, oldPrice:279.9, badge:"Premium", accent:"#930748" },

  { name:"Crystal Pink", category:"Plugs", price:69.9, oldPrice:89.9, badge:"-22%", accent:"#ff5aa7" },
  { name:"Deluxxo Black", category:"Plugs", price:79.9, badge:"Destaque", accent:"#8c0d4b" },
  { name:"Crystal Gold", category:"Plugs", price:89.9, oldPrice:109.9, badge:"Luxxo", accent:"#be7b2a" },
  { name:"Soft Mini", category:"Plugs", price:59.9, badge:"Iniciante", accent:"#f0318b" },

  { name:"Noite Rubi", category:"Lingeries", price:129.9, oldPrice:159.9, badge:"-19%", accent:"#e1196d" },
  { name:"Renda Premium", category:"Lingeries", price:139.9, badge:"Novo", accent:"#b40b5e" },
  { name:"Black Desire", category:"Lingeries", price:149.9, oldPrice:179.9, badge:"Destaque", accent:"#84083f" },
  { name:"Pink Secret", category:"Lingeries", price:119.9, badge:"Favorito", accent:"#ff478d" },

  { name:"Secret Night", category:"Fantasias", price:169.9, oldPrice:199.9, badge:"-15%", accent:"#db166f" },
  { name:"Luxxo Glam", category:"Fantasias", price:179.9, badge:"Destaque", accent:"#ff227f" },
  { name:"Night Queen", category:"Fantasias", price:189.9, oldPrice:219.9, badge:"Novo", accent:"#9c0b4e" },
  { name:"Red Fantasy", category:"Fantasias", price:159.9, badge:"Oferta", accent:"#d7195e" },

  { name:"Lubrificante Premium 60ml", category:"Lubrificantes", price:49.9, oldPrice:62.9, badge:"-20%", accent:"#ff4a9d" },
  { name:"Sensual 100ml", category:"Lubrificantes", price:59.9, badge:"Mais vendido", accent:"#ce0c68" },
  { name:"Silk Touch 120ml", category:"Lubrificantes", price:69.9, oldPrice:79.9, badge:"Premium", accent:"#d42c80" },
  { name:"Fresh Love 60ml", category:"Lubrificantes", price:44.9, badge:"Novo", accent:"#ee6aa8" },

  { name:"Gel Massageador Hot", category:"Cosméticos", price:54.9, oldPrice:69.9, badge:"-21%", accent:"#ee2c85" },
  { name:"Óleo Beijo Doce", category:"Cosméticos", price:39.9, badge:"Novo", accent:"#ff609f" },
  { name:"Gel Ice Sensation", category:"Cosméticos", price:49.9, badge:"Destaque", accent:"#c62479" },
  { name:"Creme Deluxxo", category:"Cosméticos", price:64.9, oldPrice:79.9, badge:"Premium", accent:"#a6155f" },

  { name:"Algemas Luxxo", category:"Bondage", price:59.9, oldPrice:79.9, badge:"-25%", accent:"#a80853" },
  { name:"Kit Bondage Iniciante", category:"Bondage", price:149.9, oldPrice:189.9, badge:"Combo", accent:"#790b41" },
  { name:"Venda Soft Black", category:"Bondage", price:39.9, badge:"Novo", accent:"#620733" },
  { name:"Kit Premium 5 Peças", category:"Bondage", price:219.9, oldPrice:269.9, badge:"Premium", accent:"#4d0528" },

  { name:"Relax Mini", category:"Massageadores", price:139.9, oldPrice:169.9, badge:"-18%", accent:"#e7247d" },
  { name:"Touch Pro", category:"Massageadores", price:189.9, badge:"Premium", accent:"#bc125e" },
  { name:"Body Wave", category:"Massageadores", price:169.9, oldPrice:199.9, badge:"Destaque", accent:"#f03c90" },
  { name:"Mini Relax Pocket", category:"Massageadores", price:109.9, badge:"Novo", accent:"#d31c71" },

  { name:"Kit Primeira Noite", category:"Kits para Casais", price:199.9, oldPrice:249.9, badge:"-20%", accent:"#f51b7b" },
  { name:"Kit Deluxxo Completo", category:"Kits para Casais", price:299.9, oldPrice:379.9, badge:"-21%", accent:"#9d0b4f" },
  { name:"Kit Casal Essencial", category:"Kits para Casais", price:179.9, badge:"Mais vendido", accent:"#d60b68" },
  { name:"Kit Romance Premium", category:"Kits para Casais", price:259.9, oldPrice:319.9, badge:"Presente", accent:"#b30b59" },

  { name:"Necessaire Discreta", category:"Acessórios", price:69.9, badge:"Novo", accent:"#d00c68" },
  { name:"Higienizador Premium", category:"Acessórios", price:44.9, badge:"Essencial", accent:"#ff3b8f" },
  { name:"Porta Acessórios Luxxo", category:"Acessórios", price:79.9, oldPrice:99.9, badge:"-20%", accent:"#a91a61" },
  { name:"Bolsa Discreta Black", category:"Acessórios", price:89.9, badge:"Premium", accent:"#71103d" },

  { name:"Preservativo Premium 12un", category:"Preservativos", price:34.9, badge:"Oferta", accent:"#c91162" },
  { name:"Ultra Sensitive 12un", category:"Preservativos", price:39.9, badge:"Destaque", accent:"#e32e82" },
  { name:"Texturizado 6un", category:"Preservativos", price:29.9, badge:"Novo", accent:"#ab0d57" },
  { name:"Kit Proteção 24un", category:"Preservativos", price:59.9, oldPrice:69.9, badge:"Combo", accent:"#850946" },

  { name:"Óleo de Massagem Velvet", category:"Óleos & Géis", price:69.9, badge:"Premium", accent:"#e52d82" },
  { name:"Gel Sweet Kiss", category:"Óleos & Géis", price:49.9, oldPrice:59.9, badge:"-16%", accent:"#f34d98" },
  { name:"Óleo Warm Night", category:"Óleos & Géis", price:74.9, badge:"Novo", accent:"#c41c69" },
  { name:"Gel Love Touch", category:"Óleos & Géis", price:54.9, badge:"Favorito", accent:"#f92e88" },

  { name:"Vela de Massagem", category:"Bem-estar", price:79.9, badge:"Relax", accent:"#b87332" },
  { name:"Spray Aromático Luxxo", category:"Bem-estar", price:59.9, badge:"Novo", accent:"#c73a7a" },
  { name:"Sais de Banho Romance", category:"Bem-estar", price:49.9, badge:"Bem-estar", accent:"#d45c91" },
  { name:"Kit Spa a Dois", category:"Bem-estar", price:149.9, oldPrice:179.9, badge:"Combo", accent:"#ad456f" },

  { name:"Box Presente Deluxxo", category:"Presentes", price:189.9, badge:"Presente", accent:"#cf9d42" },
  { name:"Box Romance", category:"Presentes", price:159.9, oldPrice:199.9, badge:"-20%", accent:"#dc2b79" },
  { name:"Gift Card R$ 100", category:"Presentes", price:100, badge:"Gift Card", accent:"#b88830" },
  { name:"Gift Card R$ 200", category:"Presentes", price:200, badge:"Gift Card", accent:"#d2a442" },

  { name:"Combo Oferta Deluxxo", category:"Promoções", price:149.9, oldPrice:229.9, badge:"-35%", accent:"#ff0878" },
  { name:"Seleção 2 por 1", category:"Promoções", price:129.9, oldPrice:199.9, badge:"2 por 1", accent:"#d90867" },
  { name:"Combo Semana Luxxo", category:"Promoções", price:179.9, oldPrice:259.9, badge:"-30%", accent:"#bd0758" },
  { name:"Oferta Surpresa", category:"Promoções", price:99.9, oldPrice:149.9, badge:"-33%", accent:"#f50b75" }
];

const slugify = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const defaultProducts: Product[] = seeds.map((seed, index) => ({
  id: index + 1,
  slug: slugify(seed.name),
  name: seed.name,
  category: seed.category,
  price: seed.price,
  oldPrice: seed.oldPrice,
  image: illustration(seed.name, seed.accent),
  badge: seed.badge,
  description:
    "Produto ilustrativo da Cordeiro Deluxxo para composição do catálogo. Fotos, descrição, preço, estoque e variações podem ser alterados no painel administrativo.",
  stock: 8 + ((index * 7) % 35),
  active: true,
  featured: index < 24 || index % 5 === 0
}));

export const money = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
