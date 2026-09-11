"use client";

import { useEffect, useState } from "react";
import { useShop } from "@/components/ShopProvider";

export function AgeGate() {
  const { settings, hydrated } = useShop();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hydrated || !settings.adultGate) {
      setOpen(false);
      return;
    }
    setOpen(localStorage.getItem("adult-confirmed") !== "yes");
  }, [hydrated, settings.adultGate]);

  if (!open) return null;

  return (
    <div className="ageOverlay" role="dialog" aria-modal="true" aria-label="Verificação de idade">
      <div className="ageCard">
        <div className="ageMark">18+</div>
        <h2>Conteúdo exclusivo para maiores de 18 anos</h2>
        <p>Ao entrar, você confirma que possui 18 anos ou mais e concorda com os Termos de Uso.</p>
        <div className="ageActions">
          <button
            className="primaryButton"
            onClick={() => {
              localStorage.setItem("adult-confirmed", "yes");
              setOpen(false);
            }}
          >
            Tenho 18 anos ou mais
          </button>
          <button className="ghostButton" onClick={() => (window.location.href = "https://www.google.com")}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
