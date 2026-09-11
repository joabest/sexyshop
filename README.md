# Vip SexShop

Primeira versão do e-commerce criada em Next.js 16 + React 19.

## Já implementado

- Layout responsivo mobile-first inspirado na referência enviada.
- Gate obrigatório de idade 18+.
- Home com hero, categorias, benefícios, promoções e produtos.
- Catálogo demonstrativo e página individual de produto.
- Carrinho persistido no navegador.
- Checkout demonstrativo.
- Painel administrativo inicial.
- **Cores principal, secundária e dos botões editáveis pelo painel admin** em `/admin`.
- Estrutura visual para discrição, LGPD, embalagens neutras e atendimento.

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Próxima fase para produção

Para ativar operações reais, conectar:
- PostgreSQL (Neon/Supabase) + Prisma;
- autenticação segura do painel;
- cadastro real de produtos, estoque, categorias, banners e cupons;
- gateway (Mercado Pago/Pagar.me);
- cálculo de frete por CEP;
- upload de imagens;
- e-mails transacionais;
- WhatsApp e rastreio;
- persistência global das configurações de tema no banco.

A aplicação atual foi propositalmente feita para já abrir e funcionar sem variáveis de ambiente, facilitando preview e deploy inicial na Vercel.
