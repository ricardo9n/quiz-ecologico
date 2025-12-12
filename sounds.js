/* ============================================================
   SISTEMA DE SONS E NARRADOR PARA ACESSIBILIDADE
   ============================================================ */

// Configurações de som e narrador
let soundSettings = {
  enabled: true,
  volume: 0.5,
  narratorEnabled: true,
  narratorSpeed: 1.0,
  narratorPitch: 1.0,
  correctSoundEnabled: true,
  wrongSoundEnabled: true,
  timerSoundEnabled: true
};

// Carrega configurações do localStorage
function loadSoundSettings() {
  const saved = localStorage.getItem('quizSoundSettings');
  if (saved) {
    try {
      soundSettings = { ...soundSettings, ...JSON.parse(saved) };
    } catch (e) {
      console.error('Erro ao carregar configurações de som:', e);
    }
  }
}

// Salva configurações no localStorage
function saveSoundSettings() {
  localStorage.setItem('quizSoundSettings', JSON.stringify(soundSettings));
}

// Inicializa configurações ao carregar
loadSoundSettings();

/* ============================================================
   SISTEMA DE NARRAÇÃO (TEXT-TO-SPEECH)
   ============================================================ */

function speak(text, priority = false) {
  if (!soundSettings.narratorEnabled) return;
  
  try {
    // Cancela fala anterior se for prioridade
    if (priority) {
      window.speechSynthesis.cancel();
    }
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = soundSettings.narratorSpeed;
    utterance.pitch = soundSettings.narratorPitch;
    utterance.volume = soundSettings.volume;
    
    window.speechSynthesis.speak(utterance);
  } catch (e) {
    console.error('Erro ao narrar texto:', e);
  }
}

// Cancela narração em andamento
function stopSpeaking() {
  try {
    window.speechSynthesis.cancel();
  } catch (e) {
    console.error('Erro ao parar narração:', e);
  }
}

/* ============================================================
   SONS DE ACERTO E ERRO
   ============================================================ */

function playCorrectSound() {
  if (!soundSettings.enabled || !soundSettings.correctSoundEnabled) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Som de acerto: sequência ascendente agradável
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(soundSettings.volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.4);
  } catch (e) {
    console.error('Erro ao tocar som de acerto:', e);
  }
}

function playWrongSound() {
  if (!soundSettings.enabled || !soundSettings.wrongSoundEnabled) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Som de erro: sequência descendente
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime); // G4
    oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.15); // D4
    oscillator.frequency.setValueAtTime(200, audioContext.currentTime + 0.3); // G3
    
    gainNode.gain.setValueAtTime(soundSettings.volume * 0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (e) {
    console.error('Erro ao tocar som de erro:', e);
  }
}

function playTimerSound() {
  if (!soundSettings.enabled || !soundSettings.timerSoundEnabled) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 800;
    
    gainNode.gain.setValueAtTime(soundSettings.volume * 0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  } catch (e) {
    console.error('Erro ao tocar som de timer:', e);
  }
}

function playTimeUpSound() {
  if (!soundSettings.enabled || !soundSettings.timerSoundEnabled) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'square';
    oscillator.frequency.value = 300;
    
    gainNode.gain.setValueAtTime(soundSettings.volume * 0.4, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1.0);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1.0);
  } catch (e) {
    console.error('Erro ao tocar som de tempo esgotado:', e);
  }
}

function playClickSound() {
  if (!soundSettings.enabled) return;
  
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = 1000;
    
    gainNode.gain.setValueAtTime(soundSettings.volume * 0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.05);
  } catch (e) {
    console.error('Erro ao tocar som de clique:', e);
  }
}

/* ============================================================
   FUNÇÕES DE TESTE
   ============================================================ */

function testCorrectSound() {
  playCorrectSound();
  speak('Som de resposta correta');
}

function testWrongSound() {
  playWrongSound();
  speak('Som de resposta incorreta');
}

function testNarrator() {
  speak('Olá! Este é o narrador para acessibilidade. Ele lerá todas as informações importantes do jogo para você.', true);
}
