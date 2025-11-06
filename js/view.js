// js/view.js
const STORAGE_KEY = 'spurningar';

/**
 * Les spurningar úr Local Storage.
 */
function readStoredQuestions() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw);
        // Síum út til að tryggja að spurningar hafi lágmarksgögn (q og a)
        return Array.isArray(parsed) ? parsed.filter(x => x && x.q && x.a) : [];
    } catch (e) {
        console.error('Gat ekki lesið spurningar úr Local Storage.', e);
        return [];
    }
}

/**
 * Vistar spurningar í Local Storage.
 */
function writeStoredQuestions(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}


/**
 * Athugar hvort spurningar séu í Local Storage. 
 * Ef Local Storage er tómt og allQuestions (úr spurningar.js) er til, 
 * þá forhleður þetta fall spurningunum.
 * ATH: Þarf að keyra eftir að spurningar.js hefur hlaðist.
 * @returns {Array} Spurningalistinn
 */
function initializeQuestions() {
  const existing = readStoredQuestions();
  
  // Athugum hvort allQuestions sé skilgreint áður en við reynum að forhlaða
  if (typeof allQuestions !== 'undefined' && existing.length === 0) {
    
    const initialQuestions = allQuestions.map(q => ({
      ...q,
      createdAt: new Date().toISOString()
    }));
    
    writeStoredQuestions(initialQuestions);
    console.log(`[VIEW.JS] Fann engar spurningar. Forhlað 💾 ${initialQuestions.length} spurningum í Local Storage.`);
    return initialQuestions;
  }
  return existing;
}


document.addEventListener('DOMContentLoaded', () => {
    // Sækjum öll DOM element
    const startButton = document.getElementById('startButton');
    const questionDisplay = document.getElementById('question-display');
    const loadStatus = document.getElementById('load-status');
    const questionText = document.getElementById('question-text');
    const answerText = document.getElementById('answer-text');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    const quizFinished = document.getElementById('quiz-finished');
    const restartButton = document.getElementById('restartButton');
    
    // KEY VIRKNI: Hleður spurningum, forhleður ef þarf
    const questions = initializeQuestions(); 
    let currentQuestionIndex = -1;

    // Sýnir hleðslustöðu
    if (questions.length === 0) {
        loadStatus.innerHTML = '⚠️ Engar spurningar fundust. Gakktu úr skugga um að `spurningar.js` hafi hlaðst rétt.';
        startButton.style.display = 'none';
        return; 
    } else {
        loadStatus.style.display = 'none';
        startButton.style.display = 'block';
    }


    function displayAnswer(show = false) {
        if (currentQuestionIndex < 0 || currentQuestionIndex >= questions.length) return;
        const currentQ = questions[currentQuestionIndex];

        if (show) {
             answerText.innerHTML = `**SVAR:** ${currentQ.a}`;
             answerText.style.color = 'green';
             answerText.onclick = () => displayAnswer(false); // Fela svar
        } else {
             // Sýnum flokk og stig í "Sýna svar" takkanum
             answerText.innerHTML = `Sýna svar (Flokkur: ${currentQ.category || 'Óflokkað'}, Stig: ${currentQ.level || '-'})`;
             answerText.style.color = '#007bff';
             answerText.onclick = () => displayAnswer(true); // Sýna svar
        }
    }

    function displayQuestion() {
        if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
            const currentQ = questions[currentQuestionIndex];
            
            questionText.innerHTML = `**Spurning ${currentQuestionIndex + 1} af ${questions.length}:** ${currentQ.q}`;
            
            prevButton.disabled = (currentQuestionIndex === 0);
            nextButton.disabled = (currentQuestionIndex === questions.length - 1);

            displayAnswer(false); // Fela svarið þegar skipt er um spurningu
            questionDisplay.style.display = 'block';
            quizFinished.style.display = 'none';

        } else if (currentQuestionIndex === questions.length) {
            questionDisplay.style.display = 'none';
            quizFinished.style.display = 'block';
        }
    }

    function goToNextQuestion() {
        if (currentQuestionIndex < questions.length) {
            currentQuestionIndex++;
            displayQuestion();
        }
    }

    function goToPrevQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            displayQuestion();
        }
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        displayQuestion();
        startButton.style.display = 'none';
        loadStatus.style.display = 'none';
    }

    // Viðburðarstjórar
    startButton.addEventListener('click', startQuiz);
    restartButton.addEventListener('click', startQuiz);
    prevButton.addEventListener('click', goToPrevQuestion);
    nextButton.addEventListener('click', goToNextQuestion);
});