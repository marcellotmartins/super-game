# 🎮 **Super Mario Game – Plataforma Interativa em React**

Um jogo de plataforma completo e interativo inspirado no clássico **Super Mario**, desenvolvido com **React**, **Next.js** e **TypeScript**.  
Apresenta física realista, inimigos inteligentes, sistema de pontuação, e múltiplos níveis com progressão de dificuldade.

![Super Mario Game](https://placeholder.svg?height=400&width=800&query=super+mario+platformer+game+screenshot)

---

## ✨ **Principais Recursos**

### 🎯 **Gameplay**
- 🧠 **Física Realista** – Gravidade e salto com resposta suave e natural.  
- 🗺️ **Múltiplos Níveis** – Três fases com dificuldade progressiva.  
- ❤️ **Sistema de Vidas** – Comece com 3 vidas e tente completar todos os desafios.  
- 💰 **Pontuação Dinâmica** – Cada moeda vale **10 pontos**, e inimigos derrotados valem **50 pontos**.  
- 👾 **Inimigos Inteligentes** – Patrulham plataformas e reagem ao jogador.

### 🎨 **Visual e Interface**
- 🌈 **Design Vibrante** – Cores inspiradas no universo Mario com um toque moderno.  
- 🎬 **Animações Suaves** – Renderização a **60 FPS** com transições fluidas.  
- 💥 **Feedback Visual Claro** – Indicações visuais de colisão, dano e coleta de itens.  
- 🧭 **Interface Intuitiva** – HUD exibindo vidas, pontuação e nível atual.

### 🎮 **Controles**
- **Teclado**
  - ← / → ou **A / D** – Mover  
  - ↑ / **W / Espaço** – Pular  
  - **R** – Reiniciar o jogo  
- **Dispositivos móveis**
  - Suporte total a **controles touch** na tela.

---

## 🏆 **Objetivo do Jogo**

Colete todas as moedas e derrote inimigos para avançar de fase:  

1. **Nível 1** – Aprenda os controles (5 moedas).  
2. **Nível 2** – Plataformas móveis e novos inimigos (8 moedas).  
3. **Nível 3** – Desafio final com múltiplos inimigos (10 moedas).  

💡 Complete todos os níveis para vencer o jogo!

---

## 🚀 **Como Jogar**

### 🔧 Instalação

1. **Clone o repositório**
   ```bash
   git clone [seu-repositorio]
   cd super-mario-game
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   # ou
   pnpm install
   ```

3. **Execute o projeto**
   ```bash
   npm run dev
   # ou
   yarn dev
   # ou
   pnpm dev
   ```

4. **Abra no navegador**
   ```
   http://localhost:3000
   ```

### ☁️ Deploy Instantâneo
Implemente diretamente na **Vercel** clicando em **“Publish”** no canto superior direito da interface v0.

---

## 🛠️ **Tecnologias Utilizadas**

| Tecnologia | Função |
|-------------|---------|
| **Next.js 15** | Framework React com App Router |
| **React 19** | Criação de interfaces reativas |
| **TypeScript** | Tipagem estática e segurança |
| **Tailwind CSS v4** | Estilização utilitária moderna |
| **Lucide React** | Ícones vetoriais leves |
| **Canvas API** | Renderização 2D do jogo |

---

## 📁 **Estrutura do Projeto**

```
super-mario-game/
├── app/
│   ├── page.tsx          # Página principal
│   ├── layout.tsx        # Layout base
│   └── globals.css       # Estilos globais e tema
├── components/
│   └── mario-game.tsx    # Componente principal do jogo
└── README.md             # Este arquivo
```

---

## 🎨 **Personalização**

### 🎨 Alterar Esquema de Cores
Edite o arquivo `app/globals.css`:

```css
@theme inline {
  --color-primary: #3b82f6;    /* Céu */
  --color-secondary: #10b981;  /* Plataformas */
  --color-accent: #ef4444;     /* Personagem */
  --color-coin: #fbbf24;       /* Moedas */
}
```

### 🧩 Criar Novos Níveis
Adicione novos objetos ao array `levels` em `components/mario-game.tsx`:

```typescript
const levels = [
  // níveis existentes
  {
    platforms: [...],
    enemies: [...],
    coins: [...],
    coinsToCollect: 12
  }
];
```

---

## 🐛 **Solução de Problemas**

| Problema | Solução |
|-----------|----------|
| 🐢 O jogo está lento | Reduza o número de inimigos ou plataformas |
| 🎮 Controles não funcionam | Clique no canvas para focar o jogo |
| 📱 Não funciona no mobile | Verifique o suporte a eventos *touch* no navegador |

---

## 📜 **Licença**

Este projeto foi desenvolvido para fins **educacionais e de demonstração**.  
Sinta-se livre para estudar, modificar e evoluir o código.

---

## 🤝 **Contribuindo**

Contribuições são muito bem-vindas!  
Faça um **fork**, abra um **pull request** e ajude a tornar o jogo ainda melhor.

---

## 🦊 Desenvolvido com amor e nostalgia.
