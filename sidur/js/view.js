const STORAGE_KEY = 'spurningar';

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function readStoredQuestions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(x => x && x.q && x.a) : [];
  } catch {
    return [];
  }
}

function getAllQuestions() {
  const defaults = typeof allQuestions !== 'undefined' && Array.isArray(allQuestions) ? allQuestions : [];
  const stored = readStoredQuestions();
  return [...defaults, ...stored];
}

document.addEventListener('DOMContentLoaded', () => {
  const startButton   = document.getElementById('startButton');
  const questionDisplay = document.getElementById('question-display');
  const loadStatus    = document.getElementById('load-status');
  const questionText  = document.getElementById('question-text');
  const answerText    = document.getElementById('answer-text');
  const prevButton    = document.getElementById('prevButton');
  const nextButton    = document.getElementById('nextButton');
  const quizFinished  = document.getElementById('quiz-finished');
  const restartButton = document.getElementById('restartButton');

  const questions = getAllQuestions();
  shuffleArray(questions);
  let currentQuestionIndex = -1;

  if (!questions.length) {
    loadStatus.innerHTML = '⚠️ Engar spurningar fundust.';
    startButton.style.display = 'none';
    return;
  } else {
    loadStatus.style.display = 'none';
    startButton.style.display = 'block';
  }

  answerText.setAttribute('role', 'button');
  answerText.setAttribute('tabindex', '0');

  function displayAnswer(show = false) {
    if (currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) return;
    const currentQ = questions[currentQuestionIndex];
    if (show) {
      answerText.innerHTML = `<strong>SVAR:</strong> ${currentQ.a}`;
      answerText.style.color = 'green';
      answerText.onclick = () => displayAnswer(false);
      answerText.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') displayAnswer(false); };
    } else {
      const cat = currentQ.category || 'Óflokkað';
      const lvl = currentQ.level ?? '-';
      answerText.innerHTML = `Sýna svar (Flokkur: ${cat}, Stig: ${currentQ.points ?? 1}${lvl !== '-' ? `, Þrep: ${lvl}` : ''})`;
      answerText.style.color = '#007bff';
      answerText.onclick = () => displayAnswer(true);
      answerText.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') displayAnswer(true); };
    }
  }

  function displayQuestion() {
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQ = questions[currentQuestionIndex];
      const pts = currentQ.points ?? 1;
      questionText.innerHTML = `<strong>Spurning ${currentQuestionIndex + 1} af ${questions.length} (Stig: ${pts}):</strong> ${currentQ.q}`;
      prevButton.disabled = currentQuestionIndex === 0;
      nextButton.disabled = currentQuestionIndex === questions.length - 1;
      displayAnswer(false);
      questionDisplay.style.display = 'block';
      quizFinished.style.display = 'none';
    } else if (currentQuestionIndex === questions.length) {
      questionDisplay.style.display = 'none';
      quizFinished.style.display = 'block';
    }
  }

  function goToNextQuestion() {
    if (currentQuestionIndex < questions.length) { currentQuestionIndex++; displayQuestion(); }
  }

  function goToPrevQuestion() {
    if (currentQuestionIndex > 0) { currentQuestionIndex--; displayQuestion(); }
  }

  function startQuiz() {
    if (currentQuestionIndex === questions.length) shuffleArray(questions);
    currentQuestionIndex = 0;
    displayQuestion();
    startButton.style.display = 'none';
    loadStatus.style.display = 'none';
  }

  startButton.addEventListener('click', startQuiz);
  restartButton.addEventListener('click', startQuiz);
  prevButton.addEventListener('click', goToPrevQuestion);
  nextButton.addEventListener('click', goToNextQuestion);
});
