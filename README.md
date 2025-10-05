# 🎮 Super Mario Game - Jogo de Plataforma Interativo

Um jogo de plataforma completo e interativo inspirado no clássico Super Mario, desenvolvido com React, Next.js e TypeScript. Apresenta física realista, inimigos inteligentes, sistema de pontuação e múltiplos níveis progressivos.

![Super Mario Game](https://placeholder.svg?height=400&width=800&query=super+mario+platformer+game+screenshot)

## ✨ Características

### 🎯 Gameplay
- **Física Realista**: Sistema de gravidade e pulo com física suave e responsiva
- **Múltiplos Níveis**: 3 níveis com dificuldade progressiva
- **Sistema de Vidas**: Comece com 3 vidas e tente completar todos os níveis
- **Pontuação**: Colete moedas para aumentar sua pontuação (10 pontos por moeda)
- **Inimigos Inteligentes**: Inimigos que patrulham plataformas e podem ser derrotados

### 🎨 Visual
- **Design Vibrante**: Cores inspiradas no clássico Mario com visual moderno
- **Animações Suaves**: Movimentos fluidos com 60 FPS
- **Feedback Visual**: Indicadores claros de colisões, coleta de itens e dano
- **Interface Intuitiva**: HUD com informações de vidas, pontuação e nível atual

### 🎮 Controles
- **Teclado**: 
  - Setas ← → ou A/D para mover
  - Seta ↑, W ou Espaço para pular
  - R para reiniciar o jogo
- **Touch**: Suporte completo para dispositivos móveis com controles na tela

### 🏆 Mecânicas de Jogo
- Colete todas as moedas para avançar para o próximo nível
- Pule sobre os inimigos para derrotá-los (50 pontos)
- Evite tocar nos inimigos pela lateral ou por baixo
- Cuidado para não cair fora da tela!

## 🚀 Como Jogar

### Instalação

1. **Clone o repositório ou baixe o ZIP**
   \`\`\`bash
   git clone [seu-repositorio]
   cd super-mario-game
   \`\`\`

2. **Instale as dependências**
   \`\`\`bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   \`\`\`

3. **Execute o projeto**
   \`\`\`bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   \`\`\`

4. **Abra no navegador**
   \`\`\`
   http://localhost:3000
   \`\`\`

### Deploy na Vercel

Clique no botão "Publish" no canto superior direito da interface v0 para fazer deploy instantâneo na Vercel.

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **React 19** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS v4** - Framework CSS utilitário
- **Lucide React** - Ícones modernos e leves
- **Canvas API** - Renderização do jogo em 2D

## 📁 Estrutura do Projeto

\`\`\`
super-mario-game/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout raiz
│   └── globals.css       # Estilos globais e tema
├── components/
│   └── mario-game.tsx    # Componente principal do jogo
└── README.md             # Este arquivo
\`\`\`

## 🎯 Objetivos do Jogo

1. **Nível 1**: Aprenda os controles básicos (5 moedas)
2. **Nível 2**: Enfrente mais inimigos e plataformas complexas (8 moedas)
3. **Nível 3**: Desafio final com múltiplos inimigos (10 moedas)

Complete todos os níveis para vencer o jogo!

## 🎨 Personalização

### Modificar Cores
Edite o arquivo `app/globals.css` para alterar o esquema de cores:

\`\`\`css
@theme inline {
  --color-primary: #3b82f6;    /* Azul do céu */
  --color-secondary: #10b981;  /* Verde das plataformas */
  --color-accent: #ef4444;     /* Vermelho do personagem */
  --color-coin: #fbbf24;       /* Amarelo das moedas */
}
\`\`\`

### Adicionar Novos Níveis
No arquivo `components/mario-game.tsx`, adicione novos níveis ao array `levels`:

\`\`\`typescript
const levels = [
  // ... níveis existentes
  {
    platforms: [...],
    enemies: [...],
    coins: [...],
    coinsToCollect: 12
  }
];
\`\`\`

## 🐛 Solução de Problemas

- **O jogo está lento**: Reduza o número de inimigos ou plataformas
- **Controles não respondem**: Certifique-se de que o canvas está em foco (clique nele)
- **Não funciona no mobile**: Verifique se o navegador suporta touch events

## 📝 Licença

Este projeto foi criado para fins educacionais e de demonstração.

## 🤝 Contribuindo

Sinta-se à vontade para fazer fork, modificar e melhorar o jogo!

