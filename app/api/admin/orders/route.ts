import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { hasSupabase, supabaseRest } from "@/lib/supabase-rest";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  if (!hasSupabase()) {
    return NextResponse.json({ mode: "local", orders: [] });
  }

  try {
    const orders = await supabaseRest<Array<Record<string, unknown>>>(
      "orders?select=*&order=created_at.desc&limit=250"
    );
    return NextResponse.json({ mode: "cloud", orders });
  } catch (error) {
    console.error("admin orders GET", error);
    return NextResponse.json({ message: "Falha ao carregar pedidos." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Não autorizado." }, { status: 401 });
  }

  const { id, status } = await request.json();
  const allowed = ["Novo", "Pago", "Em separação", "Enviado", "Entregue", "Cancelado"];

  if (!id || !allowed.includes(status)) {
    return NextResponse.json({ message: "Atualização inválida." }, { status: 400 });
  }

  if (!hasSupabase()) {
    return NextResponse.json({ ok: true, mode: "local" });
  }

  try {
    await supabaseRest(`orders?id=eq.${encodeURIComponent(id)}`, {
      method: "PATCH",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ status })
    });
    return NextResponse.json({ ok: true, mode: "cloud" });
  } catch (error) {
    console.error("admin orders PATCH", error);
    return NextResponse.json({ message: "Falha ao atualizar pedido." }, { status: 500 });
  }
}
