-- Execute no SQL Editor do Supabase uma única vez.
create extension if not exists pgcrypto;

create table if not exists public.store_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  customer text not null,
  email text not null,
  phone text,
  cep text,
  address text,
  number text,
  complement text,
  payment text not null,
  total numeric(12,2) not null default 0,
  status text not null default 'Novo',
  items jsonb not null default '[]'::jsonb
);

alter table public.store_state enable row level security;
alter table public.orders enable row level security;

-- Nenhuma policy pública é criada.
-- As rotas server-side usam a service role e ela nunca deve ser exposta no navegador.
