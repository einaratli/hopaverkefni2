const STORAGE_KEY = 'spurningar';

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

function writeStoredQuestions(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function renderSavedList() {
  const container = document.getElementById('saved-list');
  const items = readStoredQuestions();
  container.innerHTML = items.length
    ? items.map((it, idx) => `
        <div class="list-item">
          <strong>#${idx + 1}:</strong> ${it.q}<br />
          <small>Svar: ${it.a} — Stig: ${it.points ?? 1}</small>
        </div>
      `).join('')
    : '<p>Engar vistaðar spurningar enn.</p>';
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('question-form');
  const q = document.getElementById('q');
  const a = document.getElementById('a');
  const p = document.getElementById('p');
  const msg = document.getElementById('msg');
  const clearAll = document.getElementById('clearAll');

  renderSavedList();

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const qText = q.value.trim();
    const aText = a.value.trim();
    const pts = Math.max(1, parseInt(p.value, 10) || 1);
    if (!qText || !aText) {
      msg.textContent = 'Vantar spurningu og svar.';
      return;
    }
    const existing = readStoredQuestions();
    existing.push({ q: qText, a: aText, points: pts, createdAt: new Date().toISOString() });
    writeStoredQuestions(existing);
    msg.textContent = 'Vistað! Þú finnur spurninguna í „Birta spurningar“.';
    q.value = '';
    a.value = '';
    p.value = '1';
    renderSavedList();
  });

  clearAll.addEventListener('click', () => {
    if (confirm('Hreinsa ALLAR vistaðar spurningar?')) {
      writeStoredQuestions([]);
      renderSavedList();
      msg.textContent = 'Allt hreinsað.';
    }
  });
});
