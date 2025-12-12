# 🏆 Quiz Ecológico Interativo

## 📋 Descrição

Sistema de quiz interativo sobre ecologia, desenvolvido para uso em sala de aula com até 30 alunos divididos em 5 equipes. O quiz possui 5 categorias com 10 perguntas cada, sistema de pontuação, timer integrado e interface moderna e responsiva.

## 📁 Estrutura de Arquivos

```
quiz-ecologico/
├── index.html      # Estrutura HTML do quiz
├── styles.css      # Estilos e design visual
├── script.js       # Lógica e funcionalidades
└── README.md       # Esta documentação
```

## 🚀 Como Usar

### Opção 1: Uso Standalone (Página Completa)

1. Baixe todos os arquivos (`index.html`, `styles.css`, `script.js`)
2. Mantenha-os na mesma pasta
3. Abra o arquivo `index.html` no navegador
4. Pronto! O quiz está funcionando

### Opção 2: Incorporar em Sua Página Existente

#### Passo 1: Adicione o CSS

No `<head>` da sua página, adicione:

```html
<link rel="stylesheet" href="caminho/para/styles.css">
```

Ou copie todo o conteúdo de `styles.css` dentro de uma tag `<style>` no seu HTML.

#### Passo 2: Adicione o HTML

No local onde deseja que o quiz apareça, cole:

```html
<div class="quiz-ecologico-container">
  <!-- Cabeçalho -->
  <header class="quiz-header">
    <h1>🏆 Desafio Ecológico — Interativo</h1>
    <p>Planejado para 30 alunos (5 equipes de 6). Escolha uma categoria e pontuação.</p>
  </header>

  <!-- Tabuleiro de Categorias -->
  <div class="quiz-board" id="quiz-board"></div>

  <!-- Controles -->
  <div class="quiz-controls">
    <button class="quiz-btn quiz-btn-primary" onclick="resetScores()">🔄 Reiniciar Placar</button>
    <button class="quiz-btn quiz-btn-neutral" onclick="showLightning()">⚡ Rodada Relâmpago</button>
  </div>

  <!-- Placar -->
  <div class="quiz-scoreboard" id="quiz-scoreboard"></div>

  <!-- Modal de Pergunta -->
  <div id="quiz-modal" style="display:none;" class="quiz-modal">
    <div class="quiz-card">
      <h2 id="modal-title"></h2>
      
      <!-- Timer -->
      <div class="quiz-timer-container" id="timer-container">
        <div class="quiz-timer-display" id="timer-display">30</div>
        <div class="quiz-timer-controls">
          <button class="quiz-btn quiz-btn-success" onclick="startTimer()">▶️ Iniciar Timer</button>
          <button class="quiz-btn quiz-btn-warning" onclick="pauseTimer()">⏸️ Pausar</button>
          <button class="quiz-btn quiz-btn-danger" onclick="resetTimer()">🔄 Reiniciar</button>
        </div>
      </div>
      
      <!-- Pergunta -->
      <p id="modal-question" class="quiz-question"></p>
      
      <!-- Botões de Ação -->
      <div style="margin-top:20px;">
        <button class="quiz-btn quiz-btn-primary" onclick="showAnswer()">💡 Mostrar Resposta</button>
        <button class="quiz-btn quiz-btn-danger" onclick="closeModal()">❌ Fechar</button>
      </div>
      
      <!-- Bloco de Resposta -->
      <div id="answer-block" class="quiz-answer-block" style="display:none;">
        <h3>✅ Resposta</h3>
        <p id="modal-answer" class="quiz-answer"></p>
        <p><strong>📝 Justificativa:</strong> <span id="modal-just"></span></p>
        
        <!-- Seção de Pontuação -->
        <div class="quiz-points-section">
          <label>Adicionar pontos à equipe: </label>
          <select id="team-select"></select>
          <input type="number" id="points-input" value="0" style="width:100px;">
          <button onclick="addPoints()" class="quiz-btn quiz-btn-success">➕ Adicionar</button>
          <button onclick="subtractPoints()" class="quiz-btn quiz-btn-danger">➖ Subtrair</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Rodapé -->
  <footer class="quiz-footer">
    Versão interativa para Datashow — Quiz Ecológico
  </footer>
</div>
```

#### Passo 3: Adicione o JavaScript

Antes do fechamento da tag `</body>`, adicione:

```html
<script src="caminho/para/script.js"></script>
```

Ou copie todo o conteúdo de `script.js` dentro de uma tag `<script>` no final do seu HTML.

## 🎮 Funcionalidades

### ✨ Recursos Principais

- **5 Categorias Temáticas**: Interações Ecológicas, Engenheiros dos Ecossistemas, Produtividade, Comunidade, População/Espécie
- **50 Perguntas**: 10 perguntas por categoria com pontuações de 100 a 1000
- **Timer Integrado**: Contador regressivo de 30 segundos por pergunta
- **Sistema de Pontuação**: Controle de pontos para 5 equipes
- **Interface Responsiva**: Funciona em desktop, tablet e mobile
- **Efeitos Visuais**: Animações, gradientes e transições suaves

### ⏱️ Timer

- Inicia em 30 segundos
- Alerta visual quando faltam 10 segundos (muda para vermelho)
- Som de alerta quando o tempo esgota
- Controles: Iniciar, Pausar e Reiniciar
- Reinicia automaticamente ao abrir nova pergunta

### 🎯 Sistema de Pontuação

- Adicionar ou subtrair pontos de qualquer equipe
- Valor padrão é a pontuação da pergunta
- Botão para reiniciar todo o placar
- Atualização em tempo real

### 📱 Responsividade

- Desktop: Grade de 5 colunas
- Tablet: Grade de 3 colunas
- Mobile: Grade de 2 colunas
- Layout adaptável para todos os tamanhos de tela

## 🎨 Personalização

### Alterar Cores do Tema

No arquivo `styles.css`, modifique as variáveis de gradiente:

```css
/* Fundo principal */
.quiz-ecologico-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Botões primários */
.quiz-btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Alterar Tempo do Timer

No arquivo `script.js`, modifique a variável:

```javascript
let timeRemaining = 30; // Altere para o tempo desejado em segundos
```

E também na função `resetTimer()`:

```javascript
function resetTimer() {
  pauseTimer();
  timeRemaining = 30; // Altere aqui também
  // ...
}
```

### Modificar Equipes

No arquivo `script.js`, edite o array de equipes:

```javascript
let teams = [
  {name: "Equipe A", score: 0},
  {name: "Equipe B", score: 0},
  {name: "Equipe C", score: 0},
  {name: "Equipe D", score: 0},
  {name: "Equipe E", score: 0}
];
```

### Adicionar/Editar Perguntas

No arquivo `script.js`, modifique o objeto `quizData.categories`. Cada pergunta segue este formato:

```javascript
{
  points: "100",
  question: "Sua pergunta aqui?",
  answer: "Resposta correta",
  justification: "Explicação da resposta."
}
```

## 🔧 Requisitos Técnicos

- **Navegador**: Chrome, Firefox, Safari, Edge (versões modernas)
- **JavaScript**: Habilitado
- **Conexão**: Não necessária (funciona offline)
- **Resolução**: Mínima de 320px de largura

## 📖 Como Jogar

1. **Escolha uma Categoria**: Clique em uma das 5 categorias disponíveis
2. **Selecione a Pontuação**: Clique no valor de pontos (100-1000)
3. **Leia a Pergunta**: A pergunta aparecerá no modal
4. **Inicie o Timer**: Clique em "Iniciar Timer" para começar a contagem
5. **Responda**: As equipes têm 30 segundos para responder
6. **Mostre a Resposta**: Clique em "Mostrar Resposta" para revelar
7. **Atribua Pontos**: Selecione a equipe e adicione/subtraia pontos
8. **Feche o Modal**: A pergunta será marcada como respondida

## 🎓 Dicas de Uso em Sala de Aula

- Use um projetor ou TV para exibir o quiz
- Divida a turma em 5 equipes de 6 alunos
- Deixe as equipes escolherem a categoria e pontuação
- Use o timer para manter o ritmo dinâmico
- Para rodadas rápidas, use o modo "Rodada Relâmpago"
- Reinicie o placar entre diferentes turmas

## 🐛 Solução de Problemas

### O quiz não aparece
- Verifique se todos os arquivos estão na mesma pasta
- Confirme que o JavaScript está habilitado no navegador
- Abra o console do navegador (F12) para ver erros

### Timer não funciona
- Alguns navegadores bloqueiam o som automático
- Interaja com a página primeiro (clique em qualquer lugar)

### Layout quebrado
- Verifique se o arquivo `styles.css` está sendo carregado
- Limpe o cache do navegador (Ctrl+F5)

## 📝 Licença

Este projeto é de uso livre para fins educacionais.

## 👨‍💻 Suporte

Para dúvidas ou problemas, verifique:
1. Esta documentação
2. Os comentários no código
3. O console do navegador para mensagens de erro

---

**Versão**: 3.0  
**Última Atualização**: 2025  
**Compatibilidade**: Navegadores modernos (Chrome, Firefox, Safari, Edge)
