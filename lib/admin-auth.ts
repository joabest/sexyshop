import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "vipsexshop_admin";

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "";
}

export function adminAuthConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD && secret());
}

export function createAdminToken() {
  if (!secret()) return "";
  return createHmac("sha256", secret()).update("vipsexshop-admin-v1").digest("base64url");
}

export function verifyAdminToken(token?: string | null) {
  if (!token || !secret()) return false;
  const expected = createAdminToken();
  const a = Buffer.from(token);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function verifyPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || !password) return false;
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function isAdminAuthenticated() {
  if (!adminAuthConfigured()) return false;
  const store = await cookies();
  return verifyAdminToken(store.get(ADMIN_COOKIE)?.value);
}
