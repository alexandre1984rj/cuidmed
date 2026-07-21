# CUIDMED — Produtos Médicos Hospitalares

Site institucional da **CUIDMED**, marca de entrega rápida de materiais hospitalares e serviços de enfermagem em domicílio ([@cuid_med](https://www.instagram.com/cuid_med/)).

## Estrutura

```
index.html        # página única (one-page)
css/style.css     # estilos + animações
js/main.js        # interações (vanilla JS, sem dependências)
assets/           # favicon e recursos estáticos
```

## Destaques

- **Design responsivo** — desktop, tablet e mobile.
- **Animações cinematográficas** — preloader com logo desenhado em SVG e cortina de abertura, revelação de texto por linha, orbes com parallax, cruzes flutuantes, linha de ECG animada, rota de entrega com caminhão dirigido pelo scroll, cards com tilt 3D, botões magnéticos, contadores animados, marquee de produtos e glow que segue o cursor.
- **Acessibilidade** — respeita `prefers-reduced-motion`; sem JS, todo o conteúdo permanece visível.
- **Zero dependências** — HTML + CSS + JavaScript puros (apenas Google Fonts como recurso externo).

## Pendências para colocar no ar

- Ajustar textos de estatísticas (itens no catálogo, clientes atendidos etc.) para os números reais do negócio.

## Desenvolvimento local

Basta abrir `index.html` no navegador — não há build.
