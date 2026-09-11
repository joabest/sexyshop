import { NextResponse } from "next/server";
import { hasSupabase, supabaseRest } from "@/lib/supabase-rest";

type IncomingOrder = {
  customer: string;
  email: string;
  phone?: string;
  cep?: string;
  address?: string;
  number?: string;
  complement?: string;
  payment: string;
  total: number;
  items: Array<{ productId: number; name: string; qty: number; price: number }>;
};

export async function POST(request: Request) {
  const body = (await request.json()) as IncomingOrder;

  if (
    !body.customer ||
    !body.email ||
    !body.payment ||
    !Array.isArray(body.items) ||
    !body.items.length ||
    !Number.isFinite(Number(body.total))
  ) {
    return NextResponse.json({ message: "Dados do pedido incompletos." }, { status: 400 });
  }

  const baseOrder = {
    customer: body.customer.trim().slice(0, 120),
    email: body.email.trim().slice(0, 160),
    phone: (body.phone || "").trim().slice(0, 40),
    cep: (body.cep || "").trim().slice(0, 20),
    address: (body.address || "").trim().slice(0, 200),
    number: (body.number || "").trim().slice(0, 30),
    complement: (body.complement || "").trim().slice(0, 120),
    payment: body.payment.trim().slice(0, 40),
    total: Number(body.total),
    status: "Novo",
    items: body.items,
    created_at: new Date().toISOString()
  };

  if (!hasSupabase()) {
    return NextResponse.json({
      mode: "local",
      order: { id: `LOCAL-${Date.now()}`, ...baseOrder }
    });
  }

  try {
    const rows = await supabaseRest<Array<Record<string, unknown>>>("orders", {
      method: "POST",
      headers: { Prefer: "return=representation" },
      body: JSON.stringify([baseOrder])
    });

    return NextResponse.json({ mode: "cloud", order: rows[0] });
  } catch (error) {
    console.error("orders POST", error);
    return NextResponse.json({ message: "Não foi possível registrar o pedido." }, { status: 500 });
  }
}
