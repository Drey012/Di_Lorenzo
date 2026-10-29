# Di Lorenzo — Vanilla Interface Update

Última reformulação visual da landing page jurídica baseada no frame Figma `alta`. A implementação continua simples de executar: HTML, CSS e JavaScript puro, sem build obrigatório.

## Executar

Abra `index.html` diretamente no navegador ou rode:

```bash
python3 -m http.server 4173
```

Acesse `http://localhost:4173`.

## Estrutura

```text
index.html          # estrutura semântica da landing page
css/base.css        # tokens, layout responsivo e animações
js/app.js           # menu, navegação e interações da equipe
assets/update/      # assets exportados localmente do novo Figma
```

## O que mudou

- Hero escuro com imagem, título “Di Lorenzo”, subtítulo e CTA.
- Áreas de atuação em quatro cards numerados.
- Equipe em card com moldura dourada e navegação por pontos.
- Contato apenas com telefone, e-mail e endereço; o formulário foi removido.
- Área reservada e responsiva para futura integração do Google Maps.
- Footer com links funcionais para as seções e ícones sociais locais.
- Menu header preservado com abertura, fechamento, foco e navegação por âncoras.
- Animações de entrada preservadas com suporte a `prefers-reduced-motion`.

O conteúdo continua propositalmente mockado conforme o Figma. A conexão real do mapa, os dados definitivos, acessibilidade completa e comunicação serão tratados na próxima etapa.
