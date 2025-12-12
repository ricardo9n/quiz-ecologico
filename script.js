/* ============================================================
   QUIZ ECOLÓGICO - JAVASCRIPT
   ============================================================ */

// Dados do Quiz
// O objeto 'quizData' é carregado do arquivo quiz_data.js
// Para customizar, edite o arquivo quiz_data.js


// Estado do jogo
let questionState = [];
let teams = [
  {name: "Equipe 1", score: 0},
  {name: "Equipe 2", score: 0},
  {name: "Equipe 3", score: 0},
  {name: "Equipe 4", score: 0},
  {name: "Equipe 5", score: 0}
];

// Timer
let timerInterval = null;
let timeRemaining = 30;
let timerRunning = false;
let isSoundOn = true; // Variável de controle global do som

// Pergunta atual
let currentCat = null;
let currentQ = null;

/* ============================================================
   INICIALIZAÇÃO
   ============================================================ */
function initQuiz() {
  // Inicializar estado das perguntas
  quizData.categories.forEach((cat, cidx) => {
    questionState[cidx] = [];
    cat.questions.forEach(() => questionState[cidx].push(false));
  });
  
  buildBoard();
  
  // Narrar boas-vindas
  speak('Bem-vindo ao jogo de desafios interativos. Use os botões de configuração para ajustar sons e narrador.');
}

/* ============================================================
   CONSTRUÇÃO DO TABULEIRO
   ============================================================ */
function buildBoard() {
  const board = document.getElementById('quiz-board');
  if (!board) return;
  
  board.innerHTML = '';
  
  quizData.categories.forEach((cat, idx) => {
    const allUsed = questionState[idx].every(v => v === true);
    
    const col = document.createElement('div');
    col.className = 'quiz-category';
    col.style.background = cat.color;
    if (allUsed) {
      col.classList.add('completed');
    }
    
    const title = document.createElement('h3');
    title.textContent = allUsed 
      ? `${cat.icon} ${cat.name} — Categoria concluída`
      : `${cat.icon} ${cat.name}`;
    col.appendChild(title);
    
    const grid = document.createElement('div');
    grid.className = 'quiz-grid';
    
    cat.questions.forEach((q, qidx) => {
      const cell = document.createElement('div');
      cell.className = 'quiz-cell';
      
      if (questionState[idx][qidx]) {
        cell.classList.add('used');
        cell.textContent = "✓";
        cell.onclick = null;
      } else if (allUsed) {
        cell.classList.add('used');
        cell.textContent = "—";
        cell.onclick = null;
      } else {
        cell.style.background = 'rgba(255,255,255,0.2)';
        cell.textContent = q.points;
        cell.onclick = () => openQuestion(idx, qidx);
        
        // Adiciona acessibilidade
        cell.setAttribute('role', 'button');
        cell.setAttribute('aria-label', `Pergunta de ${q.points} pontos na categoria ${cat.name}`);
        cell.setAttribute('tabindex', '0');
        
        // Suporte para teclado
        cell.addEventListener('keypress', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            openQuestion(idx, qidx);
          }
        });
        
        // Narração ao focar
        cell.addEventListener('focus', () => {
          speak(`Pergunta de ${q.points} pontos na categoria ${cat.name}`);
        });
      }
      
      grid.appendChild(cell);
    });
    
    col.appendChild(grid);
    board.appendChild(col);
  });
  
  buildScoreboard();
}

/* ============================================================
   PLACAR
   ============================================================ */
function buildScoreboard() {
  const scoreboard = document.getElementById('quiz-scoreboard');
  if (!scoreboard) return;
  
  scoreboard.innerHTML = '';
  
  teams.forEach((t, i) => {
    const teamDiv = document.createElement('div');
    teamDiv.className = 'quiz-team';
    teamDiv.innerHTML = `
      <strong>${t.name}</strong>
      <div id="score-${i}" class="quiz-team-score">${t.score}</div>
    `;
    scoreboard.appendChild(teamDiv);
  });
}

/* ============================================================
   MODAL DE PERGUNTA
   ============================================================ */
function openQuestion(catIdx, qIdx) {
  currentCat = catIdx;
  currentQ = qIdx;
  
  const cat = quizData.categories[catIdx];
  const q = cat.questions[qIdx];
  
  playClickSound();
  
  document.getElementById('modal-title').textContent = 
    `${cat.icon} ${cat.name} — ${q.points} pontos`;
  document.getElementById('modal-question').textContent = q.question;
  document.getElementById('modal-answer').textContent = q.answer;
  document.getElementById('modal-just').textContent = q.justification;
  
  const teamSelect = document.getElementById('team-select');
  teamSelect.innerHTML = '';
  teams.forEach((t, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.text = t.name;
    teamSelect.appendChild(opt);
  });
  
  document.getElementById('points-input').value = q.points;
  document.getElementById('answer-block').style.display = 'none';
  
  resetTimer();
  
  document.getElementById('quiz-modal').style.display = 'flex';
  
  // Narrar pergunta
  speak(`Categoria ${cat.name}. Pergunta de ${q.points} pontos. ${q.question}`, true);
}

function closeModal() {
  // Marca como usada apenas se ainda não foi
  if (currentCat !== null && currentQ !== null) {
    if (!questionState[currentCat][currentQ]) {
      questionState[currentCat][currentQ] = true;
    }
  }
  
  pauseTimer();
  resetTimer();
  stopSpeaking();
  
  document.getElementById('quiz-modal').style.display = 'none';
  
  buildBoard();
  
  speak('Pergunta marcada como usada e modal fechado');
}

function goBack() {
  // Fecha o modal SEM marcar a pergunta como usada
  pauseTimer();
  resetTimer();
  stopSpeaking();
  document.getElementById('quiz-modal').style.display = 'none';
  
  speak('Voltando ao tabuleiro');
}

function showAnswer() {
  document.getElementById('answer-block').style.display = 'block';
  
  const answer = document.getElementById('modal-answer').textContent;
  const justification = document.getElementById('modal-just').textContent;
  
  speak(`Resposta: ${answer}. Justificativa: ${justification}`, true);
}

/* ============================================================
   TIMER
   ============================================================ */
function startTimer() {
  if (timerRunning) return;
  
  timerRunning = true;
  const display = document.getElementById('timer-display');
  const container = document.getElementById('timer-container');
  
  speak('Timer iniciado', true);
  
  timerInterval = setInterval(() => {
    timeRemaining--;
    display.textContent = timeRemaining;
    
    // Bipe nos últimos 10 segundos
    if (timeRemaining <= 10 && timeRemaining > 0) {
      container.style.background = 'linear-gradient(135deg, #f5576c 0%, #c62828 100%)';
      display.classList.add('quiz-timer-warning');
      playTimerSound();
    }
    
    // Narrar últimos 5 segundos
    if (timeRemaining <= 5 && timeRemaining > 0) {
      speak(timeRemaining.toString(), true);
    }
    
    if (timeRemaining <= 0) {
      clearInterval(timerInterval);
      timerRunning = false;
      display.textContent = "TEMPO ESGOTADO!";
      playTimeUpSound();
      speak('Tempo esgotado!', true);
    }
  }, 1000);
}

function pauseTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerRunning = false;
    speak('Timer pausado');
  }
}

function resetTimer() {
  pauseTimer();
  timeRemaining = 30;
  const display = document.getElementById('timer-display');
  const container = document.getElementById('timer-container');
  
  display.textContent = timeRemaining;
  display.classList.remove('quiz-timer-warning');
  container.style.background = 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
}

// Sons de Alerta (para acessibilidade)
function toggleSound() {
  isSoundOn = !isSoundOn;
  soundSettings.enabled = isSoundOn;
  saveSoundSettings();
  
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.textContent = isSoundOn ? '🔊 Som: LIGADO' : '🔇 Som: DESLIGADO';
  }
  
  speak(isSoundOn ? 'Som ativado' : 'Som desativado', true);
}

function testSound() {
  // Toca um som de pontuação para testar o áudio
  playClickSound();
  speak('Testando som do sistema');
}

function playSound(type) {
  if (!isSoundOn) return; // Não toca se o som estiver desligado
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    let freq = 800;
    let duration = 0.5;
    let volume = soundSettings.volume * 0.3;
    
    if (type === 'end') {
      freq = 400; // Som mais grave para fim de tempo
      duration = 1.0;
    } else if (type === 'score') {
      freq = 1200; // Som mais agudo para pontuação
      duration = 0.2;
    }
    
    oscillator.frequency.value = freq;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  } catch (e) {
    console.log('Audio não suportado ou bloqueado.');
  }
}



/* ============================================================
   PONTUAÇÃO
   ============================================================ */
function addPoints() {
  const teamIdx = parseInt(document.getElementById('team-select').value);
  const pts = parseInt(document.getElementById('points-input').value) || 0;
  teams[teamIdx].score += pts;
  document.getElementById('score-' + teamIdx).textContent = teams[teamIdx].score;
  
  playCorrectSound();
  speak(`${pts} pontos adicionados para ${teams[teamIdx].name}. Pontuação atual: ${teams[teamIdx].score}`);
}

function subtractPoints() {
  const teamIdx = parseInt(document.getElementById('team-select').value);
  const pts = parseInt(document.getElementById('points-input').value) || 0;
  teams[teamIdx].score -= pts;
  document.getElementById('score-' + teamIdx).textContent = teams[teamIdx].score;
  
  playWrongSound();
  speak(`${pts} pontos subtraídos de ${teams[teamIdx].name}. Pontuação atual: ${teams[teamIdx].score}`);
}

function resetScores() {
  teams.forEach(t => t.score = 0);
  buildScoreboard();
  
  speak('Placar reiniciado. Todas as equipes voltaram para zero pontos');
}

/* ============================================================
   RODADA RELÂMPAGO
   ============================================================ */
function showLightning() {
  alert('⚡ Modo Rodada Relâmpago ativado!\n\nFaça 5 perguntas rápidas com tempo de 30 segundos cada.\nUse o timer integrado em cada pergunta.');
  speak('Modo Rodada Relâmpago ativado! Faça 5 perguntas rápidas com tempo de 30 segundos cada.');
}

/* ============================================================
   SEGURANÇA (SENHA)
   ============================================================ */
const ACCESS_PASSWORD = "professor"; // Senha padrão. O professor pode mudar aqui.

function checkPassword() {
  const input = document.getElementById('password-input').value;
  const error = document.getElementById('password-error');
  
  if (input === ACCESS_PASSWORD) {
    document.getElementById('password-modal').style.display = 'none';
    document.getElementById('team-setup-modal').style.display = 'flex';
    setupTeamInputs();
    speak('Senha correta. Bem-vindo ao sistema de configuração de equipes.');
  } else {
    error.style.display = 'block';
    document.getElementById('password-input').value = '';
    playWrongSound();
    speak('Senha incorreta. Tente novamente.');
  }
}

/* ============================================================
   PAINEL DE CONFIGURAÇÕES
   ============================================================ */
function openSettings() {
  document.getElementById('settings-modal').style.display = 'flex';
  
  // Carrega valores atuais
  document.getElementById('sound-enabled').checked = soundSettings.enabled;
  document.getElementById('sound-volume').value = soundSettings.volume * 100;
  document.getElementById('volume-display').textContent = Math.round(soundSettings.volume * 100) + '%';
  
  document.getElementById('narrator-enabled').checked = soundSettings.narratorEnabled;
  document.getElementById('narrator-speed').value = soundSettings.narratorSpeed;
  document.getElementById('speed-display').textContent = soundSettings.narratorSpeed + 'x';
  document.getElementById('narrator-pitch').value = soundSettings.narratorPitch;
  document.getElementById('pitch-display').textContent = soundSettings.narratorPitch;
  
  document.getElementById('correct-sound-enabled').checked = soundSettings.correctSoundEnabled;
  document.getElementById('wrong-sound-enabled').checked = soundSettings.wrongSoundEnabled;
  document.getElementById('timer-sound-enabled').checked = soundSettings.timerSoundEnabled;
  
  speak('Painel de configurações aberto');
}

function closeSettings() {
  document.getElementById('settings-modal').style.display = 'none';
  speak('Configurações salvas');
}

function updateVolume(value) {
  soundSettings.volume = value / 100;
  document.getElementById('volume-display').textContent = value + '%';
  saveSoundSettings();
}

function updateNarratorSpeed(value) {
  soundSettings.narratorSpeed = parseFloat(value);
  document.getElementById('speed-display').textContent = value + 'x';
  saveSoundSettings();
}

function updateNarratorPitch(value) {
  soundSettings.narratorPitch = parseFloat(value);
  document.getElementById('pitch-display').textContent = value;
  saveSoundSettings();
}

function toggleSoundEnabled() {
  soundSettings.enabled = document.getElementById('sound-enabled').checked;
  isSoundOn = soundSettings.enabled;
  saveSoundSettings();
  
  const btn = document.getElementById('sound-toggle-btn');
  if (btn) {
    btn.textContent = isSoundOn ? '🔊 Som: LIGADO' : '🔇 Som: DESLIGADO';
  }
}

function toggleNarratorEnabled() {
  soundSettings.narratorEnabled = document.getElementById('narrator-enabled').checked;
  saveSoundSettings();
}

function toggleCorrectSound() {
  soundSettings.correctSoundEnabled = document.getElementById('correct-sound-enabled').checked;
  saveSoundSettings();
}

function toggleWrongSound() {
  soundSettings.wrongSoundEnabled = document.getElementById('wrong-sound-enabled').checked;
  saveSoundSettings();
}

function toggleTimerSound() {
  soundSettings.timerSoundEnabled = document.getElementById('timer-sound-enabled').checked;
  saveSoundSettings();
}

function resetSettings() {
  soundSettings = {
    enabled: true,
    volume: 0.5,
    narratorEnabled: true,
    narratorSpeed: 1.0,
    narratorPitch: 1.0,
    correctSoundEnabled: true,
    wrongSoundEnabled: true,
    timerSoundEnabled: true
  };
  saveSoundSettings();
  openSettings(); // Recarrega valores
  speak('Configurações restauradas para os valores padrão');
}

/* ============================================================
   INICIALIZAR QUANDO O DOM ESTIVER PRONTO
   ============================================================ */
function setupTeamInputs() {
  const container = document.getElementById('team-inputs');
  if (!container) return;
  container.innerHTML = ''; // Limpa inputs anteriores
  teams.forEach((team, index) => {
    const inputGroup = document.createElement('div');
    inputGroup.style.marginBottom = '10px';
    inputGroup.innerHTML = `
      <label for="team-name-${index}" style="margin-right: 10px; font-weight: bold;">Equipe ${index + 1}:</label>
      <input type="text" id="team-name-${index}" placeholder="${team.name}" style="padding: 8px; border-radius: 6px; border: 1px solid #ccc; width: 70%;">
    `;
    container.appendChild(inputGroup);
  });
}

function startGame() {
  // Atualiza os nomes das equipes com base nos inputs
  teams.forEach((team, index) => {
    const input = document.getElementById(`team-name-${index}`);
    if (input && input.value.trim() !== '') {
      teams[index].name = input.value.trim();
    }
  });

  // Esconde o modal de cadastro e inicia o jogo
  document.getElementById('team-setup-modal').style.display = 'none';
  
  initQuiz();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    // Oculta o modal de cadastro de equipes no início (já está em index.html, mas reforça)
    document.getElementById('team-setup-modal').style.display = 'none';
    // Exibe o modal de senha
    document.getElementById('password-modal').style.display = 'flex';
});
} else {
  // Oculta o modal de cadastro de equipes no início (já está em index.html, mas reforça)
  document.getElementById('team-setup-modal').style.display = 'none';
  // Exibe o modal de senha
  document.getElementById('password-modal').style.display = 'flex';
}
