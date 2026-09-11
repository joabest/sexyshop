import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  adminAuthConfigured,
  createAdminToken,
  verifyPassword
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  if (!adminAuthConfigured()) {
    return NextResponse.json(
      { message: "Defina ADMIN_PASSWORD e ADMIN_SESSION_SECRET nas variáveis de ambiente." },
      { status: 503 }
    );
  }

  const { password } = await request.json();
  if (!verifyPassword(String(password || ""))) {
    return NextResponse.json({ message: "Senha incorreta." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createAdminToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 12
  });
  return response;
}
