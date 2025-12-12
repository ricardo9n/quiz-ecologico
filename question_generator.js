/* ============================================================
   MÓDULO GERADOR DE PERGUNTAS
   Permite ao professor criar perguntas de qualquer disciplina
   ============================================================ */

// Estado do gerador
let generatorState = {
  categories: [],
  currentCategoryIndex: null,
  editMode: false
};

/* ============================================================
   ABRIR GERADOR DE PERGUNTAS
   ============================================================ */
function openQuestionGenerator() {
  // Carrega categorias atuais
  generatorState.categories = JSON.parse(JSON.stringify(quizData.categories));
  
  document.getElementById('generator-modal').style.display = 'flex';
  renderGeneratorCategories();
  
  speak('Gerador de perguntas aberto. Você pode criar, editar ou excluir categorias e perguntas.');
}

function closeQuestionGenerator() {
  document.getElementById('generator-modal').style.display = 'none';
  speak('Gerador de perguntas fechado');
}

/* ============================================================
   RENDERIZAR CATEGORIAS NO GERADOR
   ============================================================ */
function renderGeneratorCategories() {
  const container = document.getElementById('generator-categories-list');
  if (!container) return;
  
  container.innerHTML = '';
  
  if (generatorState.categories.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #718096; padding: 20px;">Nenhuma categoria criada ainda. Clique em "➕ Nova Categoria" para começar.</p>';
    return;
  }
  
  generatorState.categories.forEach((cat, idx) => {
    const catDiv = document.createElement('div');
    catDiv.className = 'generator-category-item';
    catDiv.style.background = cat.color;
    
    catDiv.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: space-between;">
        <div style="flex: 1;">
          <h4 style="margin: 0; color: white;">${cat.icon} ${cat.name}</h4>
          <p style="margin: 5px 0 0 0; color: rgba(255,255,255,0.9); font-size: 0.9em;">
            ${cat.questions.length} pergunta(s)
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <button class="quiz-btn quiz-btn-sm quiz-btn-neutral" onclick="editCategory(${idx})">✏️ Editar</button>
          <button class="quiz-btn quiz-btn-sm quiz-btn-danger" onclick="deleteCategory(${idx})">🗑️ Excluir</button>
        </div>
      </div>
    `;
    
    container.appendChild(catDiv);
  });
}

/* ============================================================
   NOVA CATEGORIA
   ============================================================ */
function newCategory() {
  const name = prompt('Nome da categoria (ex: Matemática, História, Biologia):');
  if (!name || name.trim() === '') return;
  
  const icon = prompt('Emoji/Ícone da categoria (ex: 📐, 📚, 🧬):') || '📝';
  
  // Gera cor aleatória
  const colors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)'
  ];
  
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  generatorState.categories.push({
    name: name.trim(),
    icon: icon.trim(),
    color: color,
    questions: []
  });
  
  renderGeneratorCategories();
  speak(`Categoria ${name} criada com sucesso`);
}

/* ============================================================
   EDITAR CATEGORIA
   ============================================================ */
function editCategory(index) {
  generatorState.currentCategoryIndex = index;
  const cat = generatorState.categories[index];
  
  document.getElementById('category-editor-title').textContent = `Editar: ${cat.icon} ${cat.name}`;
  document.getElementById('category-editor').style.display = 'block';
  document.getElementById('generator-categories-list').style.display = 'none';
  
  renderCategoryQuestions();
  speak(`Editando categoria ${cat.name}`);
}

function backToCategories() {
  document.getElementById('category-editor').style.display = 'none';
  document.getElementById('generator-categories-list').style.display = 'block';
  generatorState.currentCategoryIndex = null;
  
  speak('Voltando à lista de categorias');
}

/* ============================================================
   EXCLUIR CATEGORIA
   ============================================================ */
function deleteCategory(index) {
  const cat = generatorState.categories[index];
  
  if (!confirm(`Tem certeza que deseja excluir a categoria "${cat.name}" e todas as suas ${cat.questions.length} pergunta(s)?`)) {
    return;
  }
  
  generatorState.categories.splice(index, 1);
  renderGeneratorCategories();
  
  speak(`Categoria ${cat.name} excluída`);
}

/* ============================================================
   RENDERIZAR PERGUNTAS DA CATEGORIA
   ============================================================ */
function renderCategoryQuestions() {
  const container = document.getElementById('category-questions-list');
  const cat = generatorState.categories[generatorState.currentCategoryIndex];
  
  if (!container || !cat) return;
  
  container.innerHTML = '';
  
  if (cat.questions.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #718096; padding: 20px;">Nenhuma pergunta criada ainda. Clique em "➕ Nova Pergunta" para começar.</p>';
    return;
  }
  
  cat.questions.forEach((q, idx) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'generator-question-item';
    
    qDiv.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong style="color: #2d3748;">Pergunta ${idx + 1} (${q.points} pontos):</strong>
        <p style="margin: 5px 0; color: #4a5568;">${q.question}</p>
      </div>
      <div style="margin-bottom: 10px;">
        <strong style="color: #2c5282;">Resposta:</strong>
        <p style="margin: 5px 0; color: #4a5568;">${q.answer}</p>
      </div>
      <div style="margin-bottom: 10px;">
        <strong style="color: #2d3748;">Justificativa:</strong>
        <p style="margin: 5px 0; color: #4a5568; font-size: 0.9em;">${q.justification}</p>
      </div>
      <div style="display: flex; gap: 10px; justify-content: flex-end;">
        <button class="quiz-btn quiz-btn-sm quiz-btn-warning" onclick="editQuestion(${idx})">✏️ Editar</button>
        <button class="quiz-btn quiz-btn-sm quiz-btn-danger" onclick="deleteQuestion(${idx})">🗑️ Excluir</button>
      </div>
    `;
    
    container.appendChild(qDiv);
  });
}

/* ============================================================
   NOVA PERGUNTA
   ============================================================ */
function newQuestion() {
  const cat = generatorState.categories[generatorState.currentCategoryIndex];
  
  document.getElementById('question-form-title').textContent = 'Nova Pergunta';
  document.getElementById('question-text').value = '';
  document.getElementById('answer-text').value = '';
  document.getElementById('justification-text').value = '';
  document.getElementById('points-value').value = '100';
  
  document.getElementById('question-form').style.display = 'block';
  document.getElementById('category-questions-list').style.display = 'none';
  
  generatorState.editMode = false;
  generatorState.editQuestionIndex = null;
  
  speak('Formulário de nova pergunta aberto');
}

/* ============================================================
   EDITAR PERGUNTA
   ============================================================ */
function editQuestion(index) {
  const cat = generatorState.categories[generatorState.currentCategoryIndex];
  const q = cat.questions[index];
  
  document.getElementById('question-form-title').textContent = `Editar Pergunta ${index + 1}`;
  document.getElementById('question-text').value = q.question;
  document.getElementById('answer-text').value = q.answer;
  document.getElementById('justification-text').value = q.justification;
  document.getElementById('points-value').value = q.points;
  
  document.getElementById('question-form').style.display = 'block';
  document.getElementById('category-questions-list').style.display = 'none';
  
  generatorState.editMode = true;
  generatorState.editQuestionIndex = index;
  
  speak(`Editando pergunta ${index + 1}`);
}

/* ============================================================
   SALVAR PERGUNTA
   ============================================================ */
function saveQuestion() {
  const question = document.getElementById('question-text').value.trim();
  const answer = document.getElementById('answer-text').value.trim();
  const justification = document.getElementById('justification-text').value.trim();
  const points = parseInt(document.getElementById('points-value').value) || 100;
  
  if (!question || !answer || !justification) {
    alert('Por favor, preencha todos os campos!');
    speak('Erro: Todos os campos são obrigatórios');
    return;
  }
  
  const cat = generatorState.categories[generatorState.currentCategoryIndex];
  
  const questionObj = {
    question: question,
    answer: answer,
    justification: justification,
    points: points
  };
  
  if (generatorState.editMode) {
    // Atualiza pergunta existente
    cat.questions[generatorState.editQuestionIndex] = questionObj;
    speak('Pergunta atualizada com sucesso');
  } else {
    // Adiciona nova pergunta
    cat.questions.push(questionObj);
    speak('Pergunta adicionada com sucesso');
  }
  
  cancelQuestionForm();
  renderCategoryQuestions();
}

/* ============================================================
   CANCELAR FORMULÁRIO
   ============================================================ */
function cancelQuestionForm() {
  document.getElementById('question-form').style.display = 'none';
  document.getElementById('category-questions-list').style.display = 'block';
  
  generatorState.editMode = false;
  generatorState.editQuestionIndex = null;
}

/* ============================================================
   EXCLUIR PERGUNTA
   ============================================================ */
function deleteQuestion(index) {
  const cat = generatorState.categories[generatorState.currentCategoryIndex];
  
  if (!confirm(`Tem certeza que deseja excluir esta pergunta?`)) {
    return;
  }
  
  cat.questions.splice(index, 1);
  renderCategoryQuestions();
  
  speak('Pergunta excluída');
}

/* ============================================================
   APLICAR PERGUNTAS AO JOGO
   ============================================================ */
function applyQuestionsToGame() {
  if (!confirm('Tem certeza que deseja aplicar estas perguntas ao jogo? As perguntas atuais serão substituídas.')) {
    return;
  }
  
  // Substitui as perguntas do jogo
  quizData.categories = JSON.parse(JSON.stringify(generatorState.categories));
  
  // Reinicia o estado do jogo
  questionState = [];
  quizData.categories.forEach((cat, cidx) => {
    questionState[cidx] = [];
    cat.questions.forEach(() => questionState[cidx].push(false));
  });
  
  // Reconstrói o tabuleiro
  buildBoard();
  
  // Fecha o gerador
  closeQuestionGenerator();
  
  alert('Perguntas aplicadas com sucesso! O jogo foi atualizado.');
  speak('Perguntas aplicadas ao jogo com sucesso');
}

/* ============================================================
   EXPORTAR PERGUNTAS
   ============================================================ */
function exportQuestions() {
  const dataStr = JSON.stringify({
    categories: generatorState.categories
  }, null, 2);
  
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = 'perguntas_quiz.json';
  link.click();
  
  URL.revokeObjectURL(url);
  
  speak('Perguntas exportadas com sucesso');
}

/* ============================================================
   IMPORTAR PERGUNTAS
   ============================================================ */
function importQuestions() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        
        if (!data.categories || !Array.isArray(data.categories)) {
          throw new Error('Formato de arquivo inválido');
        }
        
        generatorState.categories = data.categories;
        renderGeneratorCategories();
        
        alert('Perguntas importadas com sucesso!');
        speak('Perguntas importadas com sucesso');
      } catch (error) {
        alert('Erro ao importar arquivo: ' + error.message);
        speak('Erro ao importar perguntas');
      }
    };
    
    reader.readAsText(file);
  };
  
  input.click();
}
