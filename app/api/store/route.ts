import { NextResponse } from "next/server";
import { defaultStoreData, type StoreData } from "@/lib/store-defaults";
import { hasSupabase, supabaseRest } from "@/lib/supabase-rest";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!hasSupabase()) {
    return NextResponse.json({ mode: "local", data: defaultStoreData });
  }

  try {
    const rows = await supabaseRest<Array<{ data: StoreData }>>(
      "store_state?select=data&id=eq.main&limit=1"
    );

    return NextResponse.json({
      mode: "cloud",
      data: rows?.[0]?.data || defaultStoreData
    });
  } catch (error) {
    console.error("store GET", error);
    return NextResponse.json({ mode: "local", data: defaultStoreData });
  }
}
