# Di Lorenzo — Next.js + Tailwind

Landing page responsiva de um escritório de advocacia, migrada do MVP vanilla baseado no modelo Figma `modelo1` para **Next.js App Router + React + Tailwind CSS v4**.

## Executar localmente

```bash
pnpm install
pnpm dev
```

Acesse `http://localhost:3000`.

Para validar produção:

```bash
pnpm typecheck
pnpm build
pnpm start
```

## Estrutura

```text
app/
  layout.tsx       # metadata, idioma e CSS global
  page.tsx         # LP React client-side e interações
  globals.css     # Tailwind v4 + tokens visuais e responsividade
public/assets/    # imagens exportadas do Figma
next.config.mjs
postcss.config.mjs
```

## Migração realizada

A sequência visual do MVP foi preservada: hero fotográfico, áreas de atuação, equipe, contato e rodapé. O comportamento do menu mobile, slider de equipe, navegação por âncoras e feedback do formulário foi convertido de `js/app.js` para estado React com `useState`, `useEffect` e `onSubmit`. As imagens deixaram de ser referências relativas e passaram a ser servidas por `public/assets` usando `next/image`.

O CSS original foi mantido como base visual para evitar regressões de fidelidade. A entrada `@import "tailwindcss"` e o pipeline PostCSS v4 deixam o projeto pronto para substituir gradualmente os seletores semânticos por utilities Tailwind.

## Próximos passos

Substituir os conteúdos genéricos e integrar o formulário com um endpoint real. Para uma migração mais idiomática, extraia `Hero`, `PracticeAreas`, `Team`, `Contact` e `Footer` para `components/`, movendo as cores e espaçamentos de `app/globals.css` para um tema Tailwind compartilhado.
