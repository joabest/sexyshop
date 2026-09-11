import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { hasSupabase, supabaseRest } from "@/lib/supabase-rest";
import type { StoreData } from "@/lib/store-defaults";

export async function PUT(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ message: "Sessão administrativa inválida." }, { status: 401 });
  }

  const body = (await request.json()) as StoreData;
  if (!body || !Array.isArray(body.products) || !Array.isArray(body.categories)) {
    return NextResponse.json({ message: "Dados da loja inválidos." }, { status: 400 });
  }

  if (!hasSupabase()) {
    return NextResponse.json({
      ok: true,
      mode: "local",
      message: "Alterações salvas neste navegador. Configure o Supabase para publicar para todos os visitantes."
    });
  }

  try {
    await supabaseRest("store_state?on_conflict=id", {
      method: "POST",
      headers: { Prefer: "resolution=merge-duplicates,return=minimal" },
      body: JSON.stringify([
        { id: "main", data: body, updated_at: new Date().toISOString() }
      ])
    });

    return NextResponse.json({
      ok: true,
      mode: "cloud",
      message: "Alterações publicadas no banco e disponíveis para a loja."
    });
  } catch (error) {
    console.error("store PUT", error);
    return NextResponse.json({ message: "Falha ao publicar no Supabase." }, { status: 500 });
  }
}
