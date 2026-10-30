# AppSimple — Wind Farm Photo Sorting App

Aplicação mobile-first para gestão e categorização de fotos de inspeção de parques eólicos. Construída com Vue 3, TypeScript e PrimeVue, desenhada para funcionar como PWA e app nativa via Capacitor.

## Stack Tecnológico

| Tecnologia | Versão | Função |
|---|---|---|
| Vue 3 | ^3.5 | Framework principal (Composition API + `<script setup>`) |
| TypeScript | ^5.7 | Tipagem estática |
| PrimeVue | ^4.3 | Biblioteca de componentes UI (licença gratuita) |
| PrimeIcons | — | Biblioteca de ícones exclusiva |
| Vue Router | ^4.5 | Navegação (Hash History) |
| Vite | ^6.1 | Build tool e dev server |
| Capacitor | — | Deploy nativo (iOS/Android) |

### Restrições de Dependências

- **Apenas PrimeVue** como biblioteca de UI — sem Vuetify, Quasar, Bootstrap, Material UI ou Tailwind
- **Apenas PrimeIcons** — sem mistura de bibliotecas de ícones
- **Apenas componentes gratuitos** do PrimeVue — sem PrimeVue Pro ou PrimeBlocks pagos
- Ionic preservado apenas para infraestrutura PWA/Capacitor, nunca para componentes visuais

## Instalação e Execução

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento (acessível na rede local)
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview
```

O dev server inicia com `--host`, tornando-o acessível por outros dispositivos na rede local para testes em iPhone/Android.

## Arquitetura da Aplicação

### Estrutura de Diretórios

```
src/
├── app/
│   ├── layouts/
│   │   └── AppLayout.vue          # Layout global (barras + conteúdo)
│   └── router/
│       └── index.ts               # Vue Router (Hash History)
├── components/
│   ├── common/
│   │   └── ProjectTabs.vue        # Tabs Unsorted/Review
│   ├── feedback/
│   │   └── ImportOverlay.vue      # Overlay de importação com progresso
│   └── navigation/
│       ├── AppHeader.vue          # Barra superior global
│       └── PageToolbar.vue        # Barra secundária de ações
├── composables/
│   ├── useNavigation.ts           # Lógica do botão voltar
│   ├── usePageActions.ts          # Ações dinâmicas na toolbar
│   ├── usePageTitle.ts            # Título dinâmico da página
│   ├── usePhotoImport.ts          # Importação de fotos com progresso
│   ├── usePhotoStore.ts           # Store de fotos por projeto
│   ├── useProjects.ts             # Dados dos projetos
│   └── useSettings.ts             # Definições da aplicação
├── pages/
│   ├── Demo/
│   │   └── DemoPage.vue           # Página de demonstração de componentes
│   ├── Home/
│   │   └── HomePage.vue           # Lista de projetos + resumo
│   ├── PhotoViewer/
│   │   └── PhotoViewerPage.vue    # Visualizador fullscreen + teclado virtual
│   ├── ProjectDetails/
│   │   └── ProjectDetailsPage.vue # Detalhes do projeto + ações
│   ├── ProjectReview/
│   │   ├── ProjectReviewPage.vue  # Grupos de fotos categorizadas
│   │   └── components/
│   │       ├── PhotoGroup.vue     # Grupo com drag-to-reorder
│   │       └── PhotoThumb.vue     # Miniatura de foto
│   └── Settings/
│       └── SettingsPage.vue       # Configurações da aplicação
├── services/
│   └── imageProcessor.ts          # Conversão JPEG + resize 1024px
├── styles/
│   ├── tokens.css                 # Design tokens centralizados
│   ├── global.css                 # Reset e regras globais
│   └── primevue.css               # Overrides do PrimeVue
├── App.vue                        # Componente raiz
└── main.ts                        # Bootstrap da aplicação
```

### Rotas

| Rota | Nome | Página | Notas |
|---|---|---|---|
| `/#/` | home | HomePage | Página inicial, sem toolbar |
| `/#/projects/:id` | project-details | ProjectDetailsPage | Detalhes + ações do projeto |
| `/#/projects/:id/review` | project-review | ProjectReviewPage | Grupos de fotos categorizadas |
| `/#/projects/:id/sort` | photo-sort | PhotoViewerPage | Fullscreen, barras escondidas |
| `/#/demo` | demo | DemoPage | Demonstração de componentes |
| `/#/settings` | settings | SettingsPage | Configurações da aplicação |

Todas as rotas utilizam **Hash History** (`/#/path`) para evitar dependência de fallback no servidor.

## Sistema de Design

### Design Tokens

Todos os valores visuais são centralizados em `src/styles/tokens.css`:

**Cores:**
- Fundo principal: `#FFFFFF` / Secundário: `#F7F7F8`
- Texto principal: `#202124` / Secundário: `#6B7280`
- Bordas: `#E5E7EB` / Accent: `#374151`
- Header: `#1F2937` (fundo escuro com texto branco)
- Semânticas: Success `#16A34A`, Warning `#D97706`, Error `#DC2626`

**Tipografia:**
- Família: fonte de sistema (`-apple-system, BlinkMacSystemFont, ...`)
- Auxiliar: 12px / Corpo: 14px / Títulos: 16px / Destaque: 18px
- Campos editáveis: mínimo 16px (prevenção zoom Safari)

**Espaçamento:** 4px / 8px / 12px / 16px / 24px

**Alturas fixas:** Header 48px / Toolbar 44px / Campos 40px / Touch target 44px

**Safe areas:** `env(safe-area-inset-*)` para iPhone notch e home indicator

### Princípios Visuais

- Simplicidade acima da decoração
- Consistência absoluta entre páginas
- Cores neutras, sem gradientes ou sombras fortes
- Componentes compactos sem parecerem apertados
- Nenhuma decoração sem função prática
- Sem cards dentro de cards, sem botões excessivamente grandes

## Layout Global

A aplicação utiliza um layout fixo de duas barras compartilhadas:

```
┌─────────────────────────────────────────┐
│  AppHeader     Título   🔔  ⚙️         │  ← Barra global fixa
├─────────────────────────────────────────┤
│  PageToolbar   ←        📥  📤  ✏️     │  ← Barra de ações (oculta na home)
├─────────────────────────────────────────┤
│                                         │
│          Área de Conteúdo               │  ← Scroll independente
│          (router-view)                  │
│                                         │
└─────────────────────────────────────────┘
```

- **AppHeader:** Fixa no topo. Título à esquerda, até 3 ícones globais à direita.
- **PageToolbar:** Botão voltar à esquerda, até 3 ícones de ação à direita. Oculta na página inicial.
- **Fullscreen mode:** Ambas as barras são escondidas (usado no PhotoViewer).

As páginas nunca criam as suas próprias barras — usam `usePageTitle()` e `usePageActions()` para customizar título e ações.

## Funcionalidades

### Home — Lista de Projetos

4 cards de resumo (Projects, Templates, Completed, In Progress) seguidos da lista de projetos com navegação para detalhes.

### Detalhes do Projeto

- Card de resumo (fotos por categorizar, categorizadas, lixo)
- Botão **Start Sorting** com animação pulsante azul quando há fotos pendentes
- Botão **Import** com seletor nativo de ficheiros e badge de contagem
- Status visual (All Sorted / X to Sort)
- Tabs Unsorted/Review

### Review — Grupos de Fotos

6 grupos de fotos (General, T1–T5) com 7 fotos cada.

**Drag-to-reorder:**
- Arrastar instantâneo (sem long-press) com threshold horizontal de 6px
- Indicador verde (3px) na posição de drop
- Medição por `getBoundingClientRect()` para precisão
- Distingue drag vs. click — click abre o PhotoViewer filtrado por grupo

### PhotoViewer — Categorização Fullscreen

Ecrã fullscreen com:
- **Toolbar:** Fechar, desfazer, inverter, rodar, excluir, contador
- **Imagem:** Fundo preto, transições slide (next/prev)
- **Flash animation:** Label da categoria (ex: "T3") aparece centrada a 48px, escala in (0.7→1.0) e fade out (1.0→1.2)
- **Teclado virtual:**
  - Linha 1: Geral, Lixo (vermelho), C12 (seletor azul), C25 (seletor amarelo)
  - Grid 6×4: T1–T24, bordas mudam para a cor do seletor ativo
- **Filtro por grupo:** Quando aberto da Review, mostra apenas fotos do grupo clicado com badge indicativo

### Importação de Fotos

Serviço completo de importação:
1. Seletor nativo de ficheiros (`input[type=file]` múltiplo)
2. Processamento client-side: resize para max **1024px** e conversão para **JPEG** (quality 85%)
3. Utiliza `OffscreenCanvas` + `createImageBitmap` para performance
4. `requestAnimationFrame` entre cada imagem para manter a UI fluida
5. **Overlay de progresso** com spinner, ProgressBar PrimeVue e nome do ficheiro
6. Toast de confirmação ao concluir

### Definições

- Perfil (nome, email, idioma)
- Preferências (notificações, som, auto-save, itens por página)
- Secção Sobre
- Ações na toolbar: guardar e reset com confirmação

### Demo

Página de demonstração com todos os componentes PrimeVue utilizados: formulários, mensagens, progress bars, DataTable, botões, tags.

## Composables

| Composable | Função |
|---|---|
| `useNavigation` | `goBack()` — respeita histórico interno ou usa fallback da rota |
| `usePageTitle` | Override reativo do título da página, limpa ao desmontar |
| `usePageActions` | Override reativo das ações da toolbar, limpa ao desmontar |
| `usePhotoImport` | Seleção de ficheiros, processamento, progresso reativo |
| `usePhotoStore` | Store de fotos por projeto (inbox) |
| `useProjects` | Dados dos projetos + `getProject(id)` |
| `useSettings` | Configurações com persistência em localStorage |

## Compatibilidade Mobile

### Safari / iPhone

- Viewport com `viewport-fit=cover` e `apple-mobile-web-app-capable`
- Campos editáveis com font-size >= 16px (previne zoom automático)
- `user-scalable=no` **não é utilizado** — zoom manual preservado para acessibilidade
- `100dvh` com fallback `100vh`
- `env(safe-area-inset-*)` para notch e home indicator
- `touch-action: manipulation` no body (bloqueia duplo-tap zoom)
- `-webkit-overflow-scrolling: touch` nas áreas de scroll

### Gestos

- **Duplo-click bloqueado** globalmente via `touch-action: manipulation`
- **Drag-to-reorder** com detecção horizontal vs. vertical (6px threshold)
- Gestos de navegação (swipe back, pull-to-refresh) planeados para fases futuras

## Agentes Claude (`.claude/`)

O diretório `.claude/memory/` contém ficheiros de memória utilizados pelo Claude Code para manter contexto entre sessões de desenvolvimento:

| Ficheiro | Conteúdo |
|---|---|
| `MEMORY.md` | Índice de todas as memórias |
| `project-stack.md` | Stack tecnológico e restrições |
| `project-design-system.md` | Tokens, paleta, anti-padrões visuais |
| `project-layout-structure.md` | Arquitetura das duas barras fixas |
| `project-forms.md` | Regras de formulários e auto-focus |
| `project-safari-mobile.md` | Regras específicas Safari/iPhone |
| `project-directory-structure.md` | Organização de diretórios |
| `project-navigation.md` | Hash History e comportamento do botão voltar |
| `project-phases.md` | Fases do projeto |
| `user-language.md` | Idioma de comunicação (Português) |

Estes ficheiros permitem ao Claude Code retomar o desenvolvimento com contexto completo sobre as decisões arquiteturais, restrições técnicas e preferências do projeto.

## Regras de Desenvolvimento

As regras completas estão documentadas em `CLAUDE.md`. Pontos principais:

1. **Antes de alterar código:** Analisar arquitetura existente, identificar componentes partilhados, verificar PrimeVue
2. **Nunca:** Criar barras extra, duplicar componentes globais, adicionar bibliotecas sem autorização
3. **Sempre:** Usar design tokens, manter consistência, testar no Safari iPhone
4. **Formulários:** Topo da área, largura total, campos PrimeVue, auto-focus, ações na toolbar
5. **Verificação obrigatória:** Alinhamento das barras, posição de títulos/ícones, zoom Safari, teclado aberto, scroll horizontal

## Licença

Projeto privado. Todas as dependências utilizam licenças compatíveis com uso comercial.
