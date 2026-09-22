# Di Lorenzo — Vanilla MVP

Landing page responsiva de um escritório de advocacia, recriada a partir do modelo Figma `modelo1`. A primeira versão foi deliberadamente construída com **HTML, CSS e JavaScript puro** para abrir localmente com um clique, sem dependências, build ou servidor obrigatório.

## Executar

Abra `index.html` diretamente no navegador. Para uma prévia local com live reload opcional, use qualquer servidor estático, por exemplo:

```bash
python3 -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## Estrutura

```text
index.html          # estrutura semântica e conteúdo da LP
css/base.css        # tokens, layout mobile-first e breakpoints
js/app.js           # menu, navegação, formulário e slider
assets/             # imagens exportadas do Figma, sem URLs externas
```

A composição mantém a sequência visual do Figma: hero, áreas de atuação, equipe, contato e rodapé. O conteúdo continua genérico por enquanto, pronto para substituição posterior.

## Direção visual

A linguagem usa preto, carvão, cinza-gelo e dourado discreto, com `Montserrat` para títulos leves, `Gilda Display` para cards editoriais, `Marcellus SC` para a marca e `Inter` para leitura. O layout parte de 360px e amplia progressivamente para tablet e desktop, sem depender de posições absolutas para o fluxo das seções.

## Traduzir para Next.js + Tailwind

1. Crie um app Next.js com App Router e copie os arquivos de `assets/` para `public/assets/`.
2. Transforme cada seção de `index.html` em um componente: `Hero`, `PracticeAreas`, `Team`, `Contact` e `Footer`.
3. Mova as variáveis de `css/base.css` para `tailwind.config.ts` (cores `black`, `charcoal`, `mist`, `gold`) e use classes utilitárias para o layout.
4. Mantenha as fontes no `app/layout.tsx` com `next/font/google`, substituindo os `<link>` do HTML.
5. Converta `js/app.js` em hooks locais: `useState` para o menu e slider, e `onSubmit` para o formulário.
6. Preserve `scroll-behavior`, os estados de foco e a media query de `prefers-reduced-motion` quando a camada de animação for portada.

A versão vanilla não inclui backend nem envio real de mensagens; o formulário exibe uma confirmação local e deve ser conectado a uma API ou serviço de formulário no próximo ciclo.
