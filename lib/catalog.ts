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
          <stop offset="0" stop-color="${accent}" stop-opacity=".48"/>
          <stop offset=".46" stop-color="#2a0717"/>
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
      <circle cx="450" cy="390" r="245" fill="none" stroke="url(#gold)" stroke-width="8"/>
      <circle cx="450" cy="390" r="220" fill="#0b0608" fill-opacity=".72" stroke="#ff2b91" stroke-width="3"/>
      <path d="M450 535C320 455 282 382 300 320c18-62 98-89 150-27 52-62 132-35 150 27 18 62-20 135-150 215Z"
        fill="none" stroke="#ff2b91" stroke-width="14" filter="url(#glow)"/>
      <text x="450" y="700" text-anchor="middle" fill="url(#gold)"
        font-family="Georgia,serif" font-size="54" font-weight="700">${title}</text>
      <text x="450" y="756" text-anchor="middle" fill="#ff4fa7"
        font-family="Arial,sans-serif" font-size="24" letter-spacing="7">CORDEIRO DELUXXO</text>
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
  "Promoções"
];

export const defaultProducts: Product[] = [
  { id:1, slug:"vibrador-rabbit-luxxo", name:"Rabbit Luxxo", category:"Vibradores", price:159.9, oldPrice:199.9, image:illustration("Rabbit Luxxo"), badge:"-20%", description:"Produto ilustrativo para composição do catálogo. Edite todos os dados no painel administrativo.", stock:18, active:true, featured:true },
  { id:2, slug:"vibrador-classic-touch", name:"Classic Touch", category:"Vibradores", price:119.9, oldPrice:149.9, image:illustration("Classic Touch","#d90b72"), badge:"Mais vendido", description:"Produto ilustrativo com apresentação premium e embalagem discreta.", stock:22, active:true, featured:true },
  { id:3, slug:"sugador-air-kiss", name:"Air Kiss", category:"Sugadores", price:189.9, oldPrice:229.9, image:illustration("Air Kiss","#ff3b91"), badge:"Novo", description:"Produto ilustrativo para demonstrar a categoria e o visual da loja.", stock:14, active:true, featured:true },
  { id:4, slug:"sugador-pulse-mini", name:"Pulse Mini", category:"Sugadores", price:149.9, oldPrice:179.9, image:illustration("Pulse Mini","#c51162"), badge:"-17%", description:"Produto ilustrativo. Fotos reais podem ser cadastradas depois pelo painel.", stock:16, active:true, featured:true },
  { id:5, slug:"plug-crystal-pink", name:"Crystal Pink", category:"Plugs", price:69.9, oldPrice:89.9, image:illustration("Crystal Pink","#ff5aa7"), badge:"-22%", description:"Produto ilustrativo para o catálogo.", stock:28, active:true, featured:true },
  { id:6, slug:"plug-deluxxo-black", name:"Deluxxo Black", category:"Plugs", price:79.9, image:illustration("Deluxxo Black","#8c0d4b"), badge:"Destaque", description:"Produto ilustrativo para o catálogo.", stock:19, active:true, featured:true },
  { id:7, slug:"lingerie-noite-rubi", name:"Noite Rubi", category:"Lingeries", price:129.9, oldPrice:159.9, image:illustration("Noite Rubi","#e1196d"), badge:"-19%", description:"Lingerie ilustrativa para demonstrar o layout dos produtos.", stock:17, active:true, featured:true },
  { id:8, slug:"lingerie-renda-premium", name:"Renda Premium", category:"Lingeries", price:139.9, image:illustration("Renda Premium","#b40b5e"), badge:"Novo", description:"Produto ilustrativo para composição visual.", stock:11, active:true, featured:true },
  { id:9, slug:"fantasia-secret-night", name:"Secret Night", category:"Fantasias", price:169.9, oldPrice:199.9, image:illustration("Secret Night","#db166f"), badge:"-15%", description:"Produto ilustrativo para demonstrar variedade.", stock:9, active:true, featured:false },
  { id:10, slug:"fantasia-luxxo-glam", name:"Luxxo Glam", category:"Fantasias", price:179.9, image:illustration("Luxxo Glam","#ff227f"), badge:"Destaque", description:"Produto ilustrativo para composição visual.", stock:8, active:true, featured:false },
  { id:11, slug:"lubrificante-premium-60", name:"Lubrificante Premium 60ml", category:"Lubrificantes", price:49.9, oldPrice:62.9, image:illustration("Lub Premium","#ff4a9d"), badge:"-20%", description:"Produto ilustrativo para composição do catálogo.", stock:31, active:true, featured:true },
  { id:12, slug:"lubrificante-sensual-100", name:"Sensual 100ml", category:"Lubrificantes", price:59.9, image:illustration("Sensual 100ml","#ce0c68"), badge:"Mais vendido", description:"Produto ilustrativo para composição do catálogo.", stock:26, active:true, featured:false },
  { id:13, slug:"gel-massageador-hot", name:"Gel Massageador Hot", category:"Cosméticos", price:54.9, oldPrice:69.9, image:illustration("Gel Hot","#ee2c85"), badge:"-21%", description:"Produto ilustrativo para composição do catálogo.", stock:24, active:true, featured:true },
  { id:14, slug:"oleo-beijo-doce", name:"Óleo Beijo Doce", category:"Cosméticos", price:39.9, image:illustration("Beijo Doce","#ff609f"), badge:"Novo", description:"Produto ilustrativo para composição do catálogo.", stock:34, active:true, featured:false },
  { id:15, slug:"algemas-pelucia-luxxo", name:"Algemas Luxxo", category:"Bondage", price:59.9, oldPrice:79.9, image:illustration("Algemas Luxxo","#a80853"), badge:"-25%", description:"Produto ilustrativo para composição do catálogo.", stock:24, active:true, featured:true },
  { id:16, slug:"kit-bondage-iniciante", name:"Kit Bondage Iniciante", category:"Bondage", price:149.9, oldPrice:189.9, image:illustration("Bondage Kit","#790b41"), badge:"Combo", description:"Produto ilustrativo para composição do catálogo.", stock:10, active:true, featured:false },
  { id:17, slug:"massageador-relax-mini", name:"Relax Mini", category:"Massageadores", price:139.9, oldPrice:169.9, image:illustration("Relax Mini","#e7247d"), badge:"-18%", description:"Produto ilustrativo para composição do catálogo.", stock:15, active:true, featured:true },
  { id:18, slug:"massageador-touch-pro", name:"Touch Pro", category:"Massageadores", price:189.9, image:illustration("Touch Pro","#bc125e"), badge:"Premium", description:"Produto ilustrativo para composição do catálogo.", stock:13, active:true, featured:false },
  { id:19, slug:"kit-casal-primeira-noite", name:"Kit Primeira Noite", category:"Kits para Casais", price:199.9, oldPrice:249.9, image:illustration("Kit Casal","#f51b7b"), badge:"-20%", description:"Kit ilustrativo para composição do catálogo.", stock:12, active:true, featured:true },
  { id:20, slug:"kit-deluxxo-completo", name:"Kit Deluxxo Completo", category:"Kits para Casais", price:299.9, oldPrice:379.9, image:illustration("Kit Deluxxo","#9d0b4f"), badge:"-21%", description:"Kit ilustrativo para composição do catálogo.", stock:7, active:true, featured:true },
  { id:21, slug:"necessaire-discreta", name:"Necessaire Discreta", category:"Acessórios", price:69.9, image:illustration("Necessaire","#d00c68"), badge:"Novo", description:"Acessório ilustrativo para composição do catálogo.", stock:27, active:true, featured:false },
  { id:22, slug:"higienizador-premium", name:"Higienizador Premium", category:"Acessórios", price:44.9, image:illustration("Higienizador","#ff3b8f"), badge:"Essencial", description:"Produto ilustrativo para composição do catálogo.", stock:36, active:true, featured:false },
  { id:23, slug:"preservativo-premium-12", name:"Preservativo Premium 12un", category:"Preservativos", price:34.9, image:illustration("Premium 12un","#c91162"), badge:"Oferta", description:"Produto ilustrativo para composição do catálogo.", stock:42, active:true, featured:false },
  { id:24, slug:"combo-promocional-deluxxo", name:"Combo Promocional Deluxxo", category:"Promoções", price:149.9, oldPrice:229.9, image:illustration("Combo Oferta","#ff0878"), badge:"-35%", description:"Combo ilustrativo em promoção.", stock:20, active:true, featured:true }
];

export const money = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);
