# FASE 1 — Criar a base visual e a arquitetura global do PWA

Quero que você prepare a infraestrutura visual e estrutural do meu projeto antes de desenvolver qualquer funcionalidade específica.

Leia integralmente o arquivo `CLAUDE.md` na raiz do projeto e siga todas as regras definidas nele.

## 1. Analise o projeto existente

Antes de modificar qualquer arquivo:

- Analise a estrutura atual do projeto.
- Identifique a versão do Vue, Ionic, PrimeVue e TypeScript.
- Verifique como o Vue Router está configurado.
- Identifique os estilos globais, os temas e os componentes existentes.
- Verifique quais dependências já estão instaladas.
- Identifique possíveis conflitos entre Ionic e PrimeVue.
- Preserve as funcionalidades existentes e evite alterações desnecessárias.

Não substitua arquivos ou dependências sem necessidade.

## 2. Prepare o sistema global de design

Crie um sistema de design simples, moderno, neutro e consistente.

Centralize em arquivos globais:

- Cores.
- Tipografia.
- Espaçamentos.
- Alturas das barras.
- Alturas dos campos.
- Bordas e arredondamentos.
- Estilos dos botões.
- Estilos dos campos PrimeVue.
- Áreas seguras do dispositivo.
- Regras de responsividade.

Utilize PrimeVue como biblioteca visual principal, exclusivamente com componentes e recursos gratuitos.

Não desenvolva funcionalidades de negócio nesta etapa.

## 3. Crie o layout global

Implemente um layout compartilhado com duas barras fixas.

### Barra superior

- Título alinhado à esquerda.
- Ações globais somente com ícones, alinhadas à direita.
- Máximo de três ações.
- Altura, espaçamento e aparência idênticos em todas as páginas.
- Componente compartilhado, sem duplicação.

### Barra secundária

- Botão de voltar somente com ícone, alinhado à esquerda.
- Ações específicas da página somente com ícones, alinhadas à direita.
- Máximo de três ações à direita.
- Estrutura, altura e aparência fixas em toda a aplicação.
- Não deve aparecer na página inicial.

As duas barras devem ficar fixas enquanto o conteúdo da página rola.

O título e as ações podem mudar conforme a rota, mas a estrutura visual das barras não pode mudar.

## 4. Crie a infraestrutura de navegação

Configure o Vue Router com Hash History.

As rotas internas devem utilizar o formato `/#/rota`.

Implemente a estrutura necessária para:

- Identificar a página atual.
- Definir seu título.
- Identificar a página inicial.
- Configurar as ações da barra secundária.
- Retornar à página anterior na hierarquia.
- Definir um destino de retorno quando não existir histórico interno válido.

Não utilize recarregamentos completos para navegar entre páginas.

## 5. Crie a estrutura de diretórios

Organize o projeto separando:

- Layouts globais.
- Componentes compartilhados.
- Páginas.
- Componentes exclusivos de cada página.
- Composables.
- Serviços.
- Stores, se necessários.
- Estilos globais.
- Configuração das rotas.

Cada página futura deverá ter seu próprio diretório. Componentes reutilizados por várias páginas deverão ficar na pasta compartilhada.

Adapte essa estrutura ao projeto existente sem criar pastas ou abstrações desnecessárias.

## 6. Crie uma página inicial de demonstração

Crie uma página inicial simples para demonstrar o sistema visual.

Ela deve conter apenas:

- A barra superior global.
- Um título de boas-vindas ou identificação da aplicação.
- Uma pequena área de conteúdo demonstrativo.
- Alguns exemplos de componentes PrimeVue para validar o tema.

Não crie dashboards, gráficos, menus complexos ou funcionalidades de negócio.

A página inicial não deve apresentar a barra secundária.

## 7. Crie uma página de demonstração secundária

Crie uma página simples de teste que permita verificar:

- A barra superior.
- A barra secundária.
- O botão de voltar.
- As ações de ícone.
- A navegação por hash.
- A rolagem do conteúdo.

Essa página deve servir apenas para validar a infraestrutura.

## 8. Corrija os problemas fundamentais do Safari

Configure corretamente o viewport e os estilos globais.

Garanta que os campos editáveis utilizem fonte computada de pelo menos 16px no iPhone, evitando o zoom automático do Safari ao receberem foco.

Não desative o zoom manual do utilizador.

Prepare a estrutura para respeitar as áreas seguras do dispositivo e evitar que o teclado cubra os campos ativos.

## 9. Não implemente os gestos ainda

Nesta primeira fase, não implemente o gesto de voltar por arrasto nem o gesto de atualizar por arrasto.

Prepare apenas a arquitetura para que possam ser adicionados posteriormente, sem interferir com os componentes PrimeVue.

## 10. Validação

Ao concluir:

- Execute a compilação do projeto.
- Corrija os erros encontrados.
- Verifique as rotas e os layouts.
- Verifique o comportamento responsivo.
- Confirme que as barras são componentes compartilhados.
- Confirme que a página inicial não possui barra secundária.
- Confirme que as outras páginas possuem barra secundária.
- Verifique o tamanho da fonte dos campos editáveis.
- Não declare testes em dispositivos reais que não foram efetivamente realizados.

## Limites desta fase

Não desenvolva funcionalidades de negócio.

Não crie páginas adicionais.

Não instale bibliotecas visuais alternativas.

Não refaça o projeto inteiro se a estrutura existente já atender aos requisitos.

Primeiro analise, depois implemente somente o necessário.

Ao terminar, apresente um resumo dos arquivos criados ou modificados, das decisões técnicas tomadas e dos testes executados.

Pare ao concluir esta fase. Aguarde minhas próximas instruções antes de continuar.