"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.message || "Não foi possível entrar.");
      window.location.href = "/admin";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login.");
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="adminLoginPage">
      <form className="adminLoginCard" onSubmit={submit}>
        <div className="ageMark">18+</div>
        <span className="eyebrow dark">Área restrita</span>
        <h1>Painel administrativo</h1>
        <p>Entre com a senha administrativa configurada na hospedagem.</p>
        <label>Senha
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error && <div className="formError">{error}</div>}
        <button className="primaryButton full" disabled={sending}>
          {sending ? "Entrando..." : "Entrar no painel"}
        </button>
        <small>Para ativar o acesso, configure ADMIN_PASSWORD e ADMIN_SESSION_SECRET na Vercel.</small>
      </form>
    </main>
  );
}
