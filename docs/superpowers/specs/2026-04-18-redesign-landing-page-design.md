# Redesign Completo — Landing Page Vidraçaria

**Data:** 2026-04-18
**Escopo:** Redesign visual completo + otimização de conversão
**Público-alvo:** Misto — clientes residenciais e empresas/construtoras

---

## 1. Identidade Visual

### Paleta de Cores
```css
--color-primary:     #0ea5e9;   /* azul-céu principal */
--color-primary-dark:#0284c7;   /* azul médio, hover */
--color-primary-deep:#0c4a6e;   /* azul profundo, gradientes */
--color-background:  #ffffff;
--color-surface:     #f0f9ff;   /* azul-gelo para seções alt */
--color-dark:        #0c1a2e;   /* texto principal */
--color-muted:       #64748b;
--color-border:      #e0f2fe;
--color-accent:      #f59e0b;   /* âmbar — só badges e estrelas */
--color-footer-bg:   #0c1a2e;
```

**Removido:** gradientes roxo/vermelho (`#6541f5`, `#f53855`) em todos os lugares.
**Removido:** suporte a tema escuro (toggle dark/light mode eliminado).

### Tipografia
- Fonte: Inter (já instalada)
- H1: `font-weight: 800–900`, `font-size: clamp(2.8rem, 5vw, 4rem)`
- H2: `font-weight: 800`, `font-size: clamp(2rem, 3vw, 2.75rem)`
- Body: peso 400–500, `line-height: 1.65`

### Cards e Bordas
- Border-radius: 20–28px nos cards, 999px nos botões e badges
- Sombras: `0 8px 32px rgba(14, 165, 233, 0.12)` (toque azul)
- Hover nos cards: `translateY(-6px)` + sombra mais intensa

---

## 2. Estrutura de Seções

Ordem otimizada para conversão (público misto):

| # | Seção | Objetivo |
|---|-------|----------|
| 1 | Header | Navegação + CTA rápido |
| 2 | Hero | Primeira impressão + conversão imediata |
| 3 | Highlights | Construir confiança |
| 4 | Serviços | Identificação do produto/solução |
| 5 | Portfólio | Prova social visual |
| 6 | Processo | Reduzir fricção / medo do desconhecido |
| 7 | Depoimentos | Prova social de pessoas reais |
| 8 | CTA Final | Conversão direta |
| 9 | Contato | Captura de lead |
| 10 | Footer | Institucional |

---

## 3. Seções em Detalhe

### Header
- Sticky, glassmorphism: `backdrop-filter: blur(16px)`, fundo `rgba(255,255,255,0.9)`
- Logo à esquerda, nav central, botão "Orçamento grátis" à direita (azul cheio)
- Mobile: hamburger menu, sem dark mode toggle

### Hero — Diagonal Dinâmico
**Layout:**
- Fundo branco à esquerda (~55%)
- Bloco azul diagonal à direita (~45%), corte via `clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)`

**Conteúdo esquerdo:**
- Badge: `✦ Desde 2000 — Vidraçaria de confiança`
- H1: *"Vidros e esquadrias sob medida para residências e empresas"*
- Subtítulo: *"Do box de banheiro à fachada comercial — projetos entregues com prazo, garantia e qualidade comprovada."*
- Botões: `Solicitar orçamento grátis` (azul) + `Ver projetos realizados` (outline azul)
- Stats animados: **25+ Anos** · **800+ Projetos** · **4.9★ Avaliação**

**Conteúdo direito (bloco azul):**
- Slider com 3 fotos de projetos (já existentes no projeto)
- Foto em card branco com sombra azul, flutuando sobre o fundo
- Badge flutuante na foto com nome do projeto (ex: *"Box temperado 8mm"*)
- Dots para troca de slide
- Animação parallax sutil no scroll

**Animações (Framer Motion):**
- Texto entra com fade + slide da esquerda
- Bloco azul entra da direita
- Stats counter animado ao entrar na viewport
- Foto com loop suave `y: [0, -10, 0]`

### Highlights — "Por que escolher a gente"
- Fundo: `#f0f9ff` (azul-gelo)
- Grid 2×2, cards brancos com sombra suave
- Ícone em círculo azul (`#e0f2fe` bg + ícone `#0ea5e9`)
- 4 pilares (balanceados para público misto):
  1. 🏆 **25 anos de experiência** — "Milhares de projetos entregues em toda a região"
  2. 📐 **Sob medida de verdade** — "Cada projeto é único, medido e executado por nossa equipe"
  3. ✅ **Prazo e garantia** — "Contrato com prazo definido e garantia total na instalação"
  4. 💬 **Atendimento próximo** — "Do orçamento à entrega, você fala direto com quem executa"

### Serviços — Cards com Ícone
- Fundo branco, eyebrow azul centralizado
- Grid `auto-fit, minmax(240px, 1fr)` — 3 colunas desktop
- Cada card: borda superior 3px azul, ícone grande (Phosphor), título, descrição curta
- Hover: eleva card + revela detalhe técnico + link "Solicitar orçamento →"
- 6 serviços: Box de Banheiro · Janelas de Alumínio · Portas & Divisórias · Fachadas Comerciais · Espelhos · Coberturas de Vidro

### Portfólio
- Fundo `#f0f9ff`, grid 3 colunas
- Fotos reais existentes (`src/assets/portfolio/`)
- Hover: overlay azul escuro (`rgba(12,26,46,0.75)`) com nome do projeto
- Badge de categoria no card: `Residencial` (badge azul `#0ea5e9`) ou `Comercial` (badge âmbar `#f59e0b`)
- Click abre lightbox existente (estilizar com nova paleta)

### Processo — "Como funciona"
- Fundo `#f0f9ff`
- 4 steps em linha horizontal com conector visual animado
- Número em círculo azul cheio, título bold, descrição curta
- Steps:
  1. Contato & Medição
  2. Orçamento em 24h
  3. Fabricação sob medida
  4. Instalação com garantia
- Linha conectora animada ao scroll (Framer Motion `pathLength`)

### Depoimentos
- Fundo branco, carousel centralizado (max-width 680px)
- Card com borda esquerda 4px azul, avatar com inicial em círculo azul
- Campos: nome, cidade, tipo de projeto (ex: *"Box de banheiro"*), estrelas douradas (`#f59e0b`), citação
- Autoplay 6s, setas + dots

### CTA Final
- Fundo sólido `#0ea5e9`, texto branco, layout horizontal
- Título: *"Pronto para transformar seu espaço?"*
- Subtítulo: *"Orçamento gratuito, sem compromisso. Atendemos residências e empresas."*
- Botões: `Solicitar orçamento` (branco, texto azul) + `Falar no WhatsApp` (verde `#25d366`)

### Contato
- Grid 2 colunas: formulário esquerda, info + mapa direita
- Formulário simplificado: Nome, Telefone, Tipo de projeto (select), Mensagem
- **Removido:** campo de upload de arquivo
- Lado direito: horário, endereço, botão WhatsApp grande
- Mapa iframe mantido

### Footer
- Fundo `#0c1a2e`, 3 colunas: logo + tagline · links rápidos · contato
- Texto branco com opacidade reduzida nos secundários

---

## 4. Componentes Removidos / Alterados

| Item | Ação | Motivo |
|------|------|--------|
| Dark mode toggle | **Removido** | Complexidade desnecessária; novo design é só claro |
| `useTheme` hook | **Removido** | Sem tema escuro |
| Upload de arquivo no formulário | **Removido** | Adiciona fricção sem conversão relevante |
| Gradientes roxo/vermelho | **Substituído** | Nova paleta azul-céu |
| `--color-secondary` (#f53855) | **Substituído** por `--color-accent` (#f59e0b) | Usado só em badges/estrelas |

---

## 5. Arquivos Afetados

- `src/styles/global.css` — reescrita completa das variáveis e estilos base
- `src/App.tsx` — remover `useTheme`, `theme` prop
- `src/components/Header.tsx` — remover dark mode toggle
- `src/components/Logo.tsx` — atualizar cores
- `src/hooks/useTheme.ts` — remover arquivo
- `src/sections/Hero.tsx` — novo layout diagonal
- `src/sections/Highlights.tsx` — novo grid 2×2
- `src/sections/Services.tsx` — cards com borda azul superior
- `src/sections/Portfolio.tsx` — badges residencial/comercial
- `src/sections/Process.tsx` — linha conectora animada
- `src/sections/Testimonials.tsx` — campo tipo de projeto
- `src/sections/CallToAction.tsx` — novo fundo azul sólido
- `src/sections/Contact.tsx` — remover upload, simplificar
- `src/components/Footer.tsx` — estilização nova
