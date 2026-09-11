"use client";

import {
  Circle,
  Droplets,
  Flame,
  Gift,
  Heart,
  LockKeyhole,
  Package,
  Percent,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  Zap
} from "lucide-react";
import { useShop } from "@/components/ShopProvider";

const iconMap = [
  Sparkles,
  Zap,
  Circle,
  Heart,
  Star,
  Droplets,
  Sparkles,
  LockKeyhole,
  Flame,
  Gift,
  Package,
  ShoppingBag,
  Percent,
  ShieldCheck
];

export function HomeCategories() {
  const { categories } = useShop();

  return (
    <section className="luxurySection luxuryCategories" id="categorias">
      <div className="luxurySectionTitle">
        <span className="goldRule"/>
        <div>
          <b>NOSSAS CATEGORIAS</b>
          <small>EXPLORE O SEU PRAZER</small>
        </div>
        <span className="goldRule"/>
      </div>

      <div className="luxuryCategoryGrid">
        {categories.map((category, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <a className="luxuryCategoryItem" href="#destaques" key={category}>
              <div className="luxuryCategoryCircle">
                <div className="luxuryCategoryGlow"/>
                <Icon size={38} strokeWidth={1.55}/>
              </div>
              <strong>{category}</strong>
              <span>Ver produtos →</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
