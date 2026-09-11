"use client";

import {
  Droplets,
  Gift,
  Heart,
  Package,
  ShieldCheck,
  Sparkles,
  Star
} from "lucide-react";
import { useShop } from "@/components/ShopProvider";

const iconMap = [Sparkles, Heart, ShieldCheck, Droplets, Gift, Star, Package];

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
        {categories.slice(0, 7).map((category, index) => {
          const Icon = iconMap[index % iconMap.length];
          return (
            <a className="luxuryCategoryItem" href="#destaques" key={category}>
              <div className="luxuryCategoryCircle">
                <div className="luxuryCategoryGlow"/>
                <Icon size={42} strokeWidth={1.5}/>
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
