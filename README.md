# Di Lorenzo — Vanilla Interface Update

Landing page jurídica em HTML, CSS e JavaScript puro, baseada no frame Figma. Não exige etapa de build.

## Executar

Abra `index.html` no navegador ou inicie um servidor local:

```bash
python3 -m http.server 4173
```

Acesse `http://localhost:4173`.

## Estrutura

```text
index.html               # estrutura semântica da landing page e ferramentas de acessibilidade
css/base.css             # tokens, layout responsivo, animações e estilos acessíveis
js/app.js                # menu, navegação e interações da equipe
js/accessibility.js      # daltonismo, escala de texto, narrador e inicialização VLibras
assets/update/           # assets exportados localmente do Figma
```

## Acessibilidade

- Painel flutuante disponível em todas as larguras de tela, com abertura/fecho por teclado e foco visível.
- Filtros para visão normal, deuteranopia, protanopia e tritanopia; a preferência fica guardada no navegador.
- Ajuste do tamanho do texto entre 85% e 150%, com botão para repor o tamanho padrão.
- Narrador lê o conteúdo principal da página em português usando a Web Speech API do navegador, com seleção de voz/velocidade quando disponíveis e controles de pausar, continuar e parar.
- Widget VLibras para tradução em Libras, integrado a partir do plugin oficial `vlibras.gov.br`.
- O tradutor VLibras necessita de ligação à internet. A disponibilidade das vozes do narrador depende do navegador e do dispositivo.
- O texto principal do hero permanece acessível a leitores de ecrã e ao narrador, embora faça parte do asset visual exportado do Figma.

## O que a página inclui

- Hero escuro com imagem, áreas de atuação numeradas, cartão da equipa e navegação por pontos.
- Contacto por telefone, e-mail e endereço, além de uma área reservada para o mapa.
- Rodapé com links para as secções e ícones sociais locais.
- Menu responsivo e animações com suporte a `prefers-reduced-motion`.

O conteúdo da landing page continua parcialmente de exemplo conforme o Figma. A ligação real do mapa, dados definitivos e destinos das redes sociais continuam pendentes.
