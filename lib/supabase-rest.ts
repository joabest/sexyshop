function config() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return { url: url.replace(/\/$/, ""), key };
}

export function hasSupabase() {
  const { url, key } = config();
  return Boolean(url && key);
}

export async function supabaseRest<T>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const { url, key } = config();
  if (!url || !key) throw new Error("Supabase não configurado.");

  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(init.headers || {})
    }
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Supabase ${response.status}: ${detail}`);
  }

  if (response.status === 204) return null as T;
  const text = await response.text();
  return (text ? JSON.parse(text) : null) as T;
}
