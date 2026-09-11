# Vip SexShop

E-commerce em Next.js 16 + React 19, com loja pública e painel administrativo.

## Painel administrativo

A rota `/admin` agora é protegida por login e permite:

- dashboard com produtos, estoque, pedidos e vendas;
- cadastrar, editar e excluir produtos;
- controlar preço, preço promocional, estoque, categoria, imagem, status e destaque na home;
- acompanhar pedidos e alterar status;
- editar categorias;
- alterar cores do tema;
- editar nome da loja, barra de ofertas, WhatsApp, Instagram, Telegram e horário de atendimento;
- editar título e texto principal da home;
- ativar/desativar o gate 18+;
- publicar as configurações no Supabase.

As mudanças também ficam em cache local para facilitar desenvolvimento e preview.

## Segurança do painel

Configure na Vercel:

```env
ADMIN_PASSWORD=uma-senha-forte
ADMIN_SESSION_SECRET=uma-chave-longa-e-aleatoria
```

Sem essas variáveis, o painel não libera o acesso.

## Supabase

1. Crie um projeto no Supabase.
2. Execute `supabase/schema.sql` no SQL Editor.
3. Configure na Vercel:

```env
SUPABASE_URL=https://SEU-PROJETO.supabase.co
SUPABASE_SERVICE_ROLE_KEY=SUA_SERVICE_ROLE_KEY
```

A service role é usada apenas em rotas server-side e nunca deve ser exposta no navegador.

Sem Supabase, o projeto funciona em **modo local**: produtos/configurações/pedidos ficam apenas no navegador usado para administrar/testar. Com Supabase configurado, a publicação do painel fica disponível para todos os visitantes e os pedidos passam a ser persistidos na nuvem.

## Rotas principais

- `/` loja
- `/produto/[slug]` produto
- `/carrinho` carrinho
- `/checkout` checkout
- `/admin-login` login administrativo
- `/admin` painel

## Rodar localmente

```bash
npm install
npm run dev
```

Copie `.env.example` para `.env.local` e preencha as credenciais.

## Próximas integrações

A estrutura já está pronta para receber gateway de pagamento, cálculo real de frete, upload de imagens, cupons avançados, e-mails transacionais, rastreio e programa de fidelidade.
