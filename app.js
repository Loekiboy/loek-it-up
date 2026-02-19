// ===== Data Storage =====
let wordLists = JSON.parse(localStorage.getItem('wordLists')) || [];
let currentListId = null;
let currentStudyMode = null;
let editingListId = null;
let mergeMode = false;
let selectedListsForMerge = [];

// Supabase auth
let supabaseClient = null;
let authUser = null;
let authMode = 'login';
let publicSearchTimer = null;
const CLOUD_SETTINGS_KEY = 'cloudEnabled';
const DARK_MODE_SETTINGS_KEY = 'darkModeEnabled';
const DYNAMIC_LOGO_SETTINGS_KEY = 'dynamicLogoEnabled';
const ACCENT_COLOR_SETTINGS_KEY = 'accentColor';
const LAST_SETTINGS_TAB_KEY = 'lastSettingsTab';
const LAST_VIEW_KEY = 'lastView';
const LAST_LIST_ID_KEY = 'lastListId';
const LAST_STUDY_MODE_KEY = 'lastStudyMode';
const DEFAULT_ACCENT_COLOR = '#FFD93D';
const PRESET_COLORS = [
    '#FFD93D', // Geel (default)
    '#FF6B6B', // Rood
    '#4ECDC4', // Turquoise
    '#95E1D3', // Mint
    '#A8E6CF', // Groen
    '#FFB6B9', // Roze
    '#9dabe1', // Paars
    '#FFA07A'  // Oranje
];

// Study session state
let studySession = {
    words: [],
    currentIndex: 0,
    direction: 'term-def',
    acceptSlash: true,
    ignoreParentheses: true,
    correctCount: 0,
    wrongCount: 0,
    sessionResults: {},
    // Steps mode specific
    currentBatch: [],
    learnedWords: [],
    currentPhase: 'choice', // choice, typing
    phaseIndex: 0,
    wrongInSession: [],
    wordProgress: {}, // Track progress per word: {choice: done, typing: needsCorrect}
    stepsWrongWords: [],
    stepsReviewMode: false,
    stepsReviewQueue: [],
    stepsReviewIndex: 0,
    // Typing mode specific
    typingProgress: {}, // wordId: {correctInARow: 0, needsExtraCorrect: 0}
    typingWrongWords: [],
    typingReviewMode: false,
    typingReviewQueue: [],
    typingReviewIndex: 0,
    hintsEnabled: true,
    allowMinorTypos: false,
    caseSensitiveAnswers: false,
    strictDiacritics: false,
    learnStages: ['flash', 'choice', 'typing'],
    startedAt: 0,
    emergencyMode: false,
    emergencyWordIds: [],
    hintUsageByWord: {},
    hintPenalizedWords: [],
    hintPenalty: 0,
    pendingAnswers: []
};

// ===== Save Data =====
function saveData() {
    ensureAllWordMetadata();
    localStorage.setItem('wordLists', JSON.stringify(wordLists));
}

function ensureWordMetadata(word) {
    if (!word) return;
    if (!word.stats) {
        word.stats = { correct: 0, wrong: 0 };
    }
}

function ensureAllWordMetadata() {
    wordLists.forEach(list => {
        (list.words || []).forEach(ensureWordMetadata);
    });
}

function normalizeForTypo(text) {
    return normalizeForSimilarity(text || '').replace(/\s+/g, ' ').trim();
}

function levenshteinForTypos(a, b) {
    const m = a.length;
    const n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
        }
    }

    return dp[m][n];
}

function isMinorTypoMatch(userAnswer, correctAnswer) {
    const user = normalizeForTypo(userAnswer);
    const correct = normalizeForTypo(correctAnswer);
    if (!user || !correct) return false;
    if (user === correct) return true;

    const distance = levenshteinForTypos(user, correct);
    const maxLen = Math.max(user.length, correct.length);
    const threshold = maxLen <= 7 ? 1 : 2;

    return distance <= threshold;
}

function isExamModeActive() {
    return currentStudyMode === 'exam';
}

function pushPendingAnswer(wordId, userAnswer, correctAnswer, isCorrect) {
    if (!isExamModeActive()) return;
    if (!studySession.pendingAnswers) studySession.pendingAnswers = [];
    studySession.pendingAnswers.push({
        wordId,
        userAnswer,
        correctAnswer,
        isCorrect
    });
}

function getHintLevel(wordId) {
    return studySession.hintUsageByWord?.[wordId] || 0;
}

function setHintLevel(wordId, level) {
    if (!studySession.hintUsageByWord) studySession.hintUsageByWord = {};
    studySession.hintUsageByWord[wordId] = Math.min(3, Math.max(level, 0));
}

function applyHintPenaltyIfNeeded(wordId, isCorrect) {
    if (!isCorrect) return;
    if (!studySession.hintsEnabled) return;
    if (getHintLevel(wordId) <= 0) return;
    if (!studySession.hintPenalizedWords) studySession.hintPenalizedWords = [];
    if (studySession.hintPenalizedWords.includes(wordId)) return;
    studySession.hintPenalty = (studySession.hintPenalty || 0) + 0.5;
    studySession.hintPenalizedWords.push(wordId);
}

function getEnabledLearnStages() {
    const allStages = [
        { id: 'learn-stage-flash', key: 'flash' },
        { id: 'learn-stage-copy', key: 'copy' },
        { id: 'learn-stage-choice', key: 'choice' },
        { id: 'learn-stage-hint', key: 'hint' },
        { id: 'learn-stage-typing', key: 'typing' }
    ];
    return allStages
        .filter(stage => document.getElementById(stage.id)?.checked)
        .map(stage => stage.key);
}

function buildHintPattern(answer) {
    return (answer || '')
        .split(/\s+/)
        .filter(Boolean)
        .map(part => {
            if (part.length <= 1) return part;
            return `${part[0]}${'.'.repeat(part.length - 1)}`;
        })
        .join(' ');
}

function normalizeQuoteMarks(text) {
    return (text || '')
        .replace(/[’‘`´]/g, "'")
        .replace(/[“”]/g, '"')
        .replace(/[ˆ]/g, '^');
}

function stripDiacriticsAndLooseMarks(text) {
    const normalized = normalizeQuoteMarks(text || '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    return normalized.replace(/["'`^]/g, '');
}

// ===== Session Persistence =====
// restoreLastView is defined below near the DOMContentLoaded handler

// ===== Navigation =====
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    
    const viewKey = viewId.replace('-view', '');
    
    // Update header nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewKey) {
            btn.classList.add('active');
        }
    });
    
    // Update mobile nav buttons
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewKey) {
            btn.classList.add('active');
        }
    });
    
    // Save view state for session persistence
    localStorage.setItem(LAST_VIEW_KEY, viewId);
    if (currentListId && (viewKey === 'list' || viewKey.startsWith('study-'))) {
        localStorage.setItem(LAST_LIST_ID_KEY, currentListId);
    }
    if (currentStudyMode && viewKey.startsWith('study-')) {
        localStorage.setItem(LAST_STUDY_MODE_KEY, currentStudyMode);
    }
}

function showHome() {
    // Clear study state when going home
    currentListId = null;
    currentStudyMode = null;
    localStorage.removeItem(LAST_STUDY_MODE_KEY);
    
    showView('home-view');
    renderWordLists();
    document.querySelector('.nav-btn[data-view="home"]').classList.add('active');
    document.querySelector('.nav-btn[data-view="create"]').classList.remove('active');
}

function showCreateList() {
    editingListId = null;
    document.getElementById('create-title').textContent = 'Nieuwe Woordenlijst';
    document.getElementById('list-title').value = '';
    document.getElementById('lang-from').value = '';
    document.getElementById('lang-to').value = '';
    document.getElementById('selected-subject').value = '';
    document.getElementById('selected-icon').value = '';
    document.getElementById('import-area').classList.add('hidden');
    document.getElementById('import-text').value = '';
    setImportSource('plain');
    const publicToggle = document.getElementById('list-public');
    if (publicToggle) publicToggle.checked = isCloudEnabled();
    
    document.querySelectorAll('.subject-btn').forEach(btn => btn.classList.remove('active'));
    
    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = '';
    addWordEntry();
    addWordEntry();
    
    showView('create-view');
    document.querySelector('.nav-btn[data-view="create"]').classList.add('active');
    document.querySelector('.nav-btn[data-view="home"]').classList.remove('active');
}

function showListDetail(listId) {
    currentListId = listId;
    const list = wordLists.find(l => l.id === listId);
    if (!list) return;
    
    // store id on container so buttons can still find it if state gets lost
    const container = document.querySelector('.list-detail-container');
    if (container) container.dataset.listId = listId;
    
    document.getElementById('list-detail-icon').className = `fas ${list.icon || 'fa-book'}`;
    document.getElementById('list-detail-title').textContent = list.title;
    document.getElementById('list-detail-meta').textContent = 
        `${list.words.length} woordjes • ${list.langFrom} → ${list.langTo}`;
    
    // Update direction labels
    document.getElementById('dir-term-def').textContent = `${list.langFrom} → ${list.langTo}`;
    document.getElementById('dir-def-term').textContent = `${list.langTo} → ${list.langFrom}`;
    
    renderWordsPreview(list.words);
    updateResumeBanner();
    showView('list-view');
}

// ===== Render Functions =====
function renderWordLists() {
    const container = document.getElementById('word-lists-container');
    const emptyState = document.getElementById('empty-state');

    if (wordLists.length === 0) {
        container.classList.add('hidden');
        emptyState.classList.remove('hidden');
        return;
    }

    container.classList.remove('hidden');
    emptyState.classList.add('hidden');

    // Sort word lists by last studied (newest first)
    const sortedLists = [...wordLists].sort((a, b) => {
        const timeA = a.lastStudied || 0;
        const timeB = b.lastStudied || 0;
        return timeB - timeA;
    });

    container.innerHTML = sortedLists.map(list => {
        const isSelected = selectedListsForMerge.includes(list.id);
        const checkboxHtml = mergeMode ? `
            <div class="merge-checkbox" onclick="event.stopPropagation(); toggleListSelection('${list.id}')">
                <i class="fas ${isSelected ? 'fa-check-square' : 'fa-square'}"></i>
            </div>
        ` : '';

        return `
        <div class="word-list-card ${isSelected ? 'selected' : ''}" onclick="${mergeMode ? `toggleListSelection('${list.id}')` : `showListDetail('${list.id}')`}">
            ${checkboxHtml}
            <div class="card-header">
                <div class="card-icon">
                    <i class="fas ${list.icon || 'fa-book'}"></i>
                </div>
                <div>
                    <div class="card-title">${escapeHtml(list.title)}</div>
                    <div class="card-meta">${list.words.length} woordjes${isCloudEnabled() && list.isPublic ? ' • Openbaar' : ''}</div>
                </div>
            </div>
            <div class="card-languages">
                <span>${escapeHtml(list.langFrom)}</span>
                <i class="fas fa-arrow-right"></i>
                <span>${escapeHtml(list.langTo)}</span>
            </div>
        </div>
    `;
    }).join('');

    updateMergeButton();
}

function renderWordsPreview(words) {
    const container = document.getElementById('words-preview-list');
    const grouped = groupWordsByMastery(words);
    const groupOrder = [
        { key: 'new', title: 'Ken je nog niet' },
        { key: 'learning', title: 'Aan het leren' },
        { key: 'mastered', title: 'Gestampt!' }
    ];

    container.innerHTML = groupOrder.map(group => {
        const groupWords = grouped[group.key] || [];
        if (groupWords.length === 0) return '';
        return `
        <div class="word-group" data-group="${group.key}">
            <div class="word-group-header">
                <h4>${group.title} (${groupWords.length})</h4>
                <button class="btn btn-secondary btn-select-group" onclick="toggleSelectGroup('${group.key}')">
                    <i class="fas fa-check"></i> Selecteer deze
                </button>
            </div>
            <div class="word-group-list">
                ${groupWords.map(word => {
                    const stats = word.stats || { correct: 0, wrong: 0 };
                    return `
                    <div class="preview-word-item" data-word-id="${word.id}" data-group="${group.key}">
                        <label class="preview-select">
                            <input type="checkbox" class="word-select" value="${word.id}">
                            <span class="checkmark"></span>
                        </label>
                        <span class="term">${escapeHtml(word.term)}</span>
                        <span class="definition">${escapeHtml(word.definition)}</span>
                        <span class="word-stats">
                            <span class="stat-good">Goed: ${stats.correct}</span>
                            <span class="stat-bad">Fout: ${stats.wrong}</span>
                        </span>
                    </div>
                    `;
                }).join('')}
            </div>
        </div>
        `;
    }).join('');

    document.querySelectorAll('.word-select').forEach(cb => {
        cb.addEventListener('change', updateSelectAllButton);
    });

    updateSelectAllButton();
}

function groupWordsByMastery(words) {
    const grouped = { new: [], learning: [], mastered: [] };
    words.forEach(word => {
        const stats = word.stats || { correct: 0, wrong: 0 };
        const total = stats.correct + stats.wrong;
        if (total === 0) {
            grouped.new.push(word);
            return;
        }

        const accuracy = stats.correct / total;
        if (stats.correct >= 5 && accuracy >= 0.8) {
            grouped.mastered.push(word);
            return;
        }

        grouped.learning.push(word);
    });
    return grouped;
}

function getSelectedWordIdsForStudy() {
    return Array.from(document.querySelectorAll('.word-select:checked')).map(cb => cb.value);
}

function getStudyWordsFromSelection(words) {
    const selectedIds = studySession.selectedWordIds || [];
    return !selectedIds.length ? [...words] : words.filter(w => selectedIds.includes(w.id));
}

function getHardestWordIds(words, limit = 10) {
    return [...words]
        .map(word => {
            ensureWordMetadata(word);
            const stats = word.stats || { correct: 0, wrong: 0 };
            const score = (stats.wrong * 2) - stats.correct;
            return { id: word.id, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, Math.max(1, limit))
        .map(x => x.id);
}

function startEmergencyCram() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list || !list.words || list.words.length === 0) return;

    const hardestWordIds = getHardestWordIds(list.words, Math.min(10, list.words.length));
    startStudyMode('typing', {
        emergencyMode: true,
        emergencyWordIds: hardestWordIds
    });
}

function toggleSelectAllWords() {
    const checkboxes = Array.from(document.querySelectorAll('.word-select'));
    if (checkboxes.length === 0) return;

    const allChecked = checkboxes.every(cb => cb.checked);
    checkboxes.forEach(cb => {
        cb.checked = !allChecked;
    });

    updateSelectAllButton();
}

function toggleSelectGroup(groupKey) {
    const checkboxes = Array.from(document.querySelectorAll(`.preview-word-item[data-group="${groupKey}"] .word-select`));
    if (checkboxes.length === 0) return;

    const allChecked = checkboxes.every(cb => cb.checked);
    checkboxes.forEach(cb => {
        cb.checked = !allChecked;
    });

    updateSelectAllButton();
}

function updateSelectAllButton() {
    const btn = document.querySelector('.btn-select-all');
    if (!btn) return;

    const checkboxes = Array.from(document.querySelectorAll('.word-select'));
    if (checkboxes.length === 0) return;

    const allChecked = checkboxes.every(cb => cb.checked);
    btn.innerHTML = allChecked
        ? '<i class="fas fa-times"></i> Selectie wissen'
        : '<i class="fas fa-check-double"></i> Selecteer alles';
}

// ===== Word Entry Management =====
function addWordEntry(term = '', definition = '', wordId = '') {
    const wordsList = document.getElementById('words-list');
    const entryNum = wordsList.children.length + 1;
    
    const entry = document.createElement('div');
    entry.className = 'word-entry';
    if (wordId) {
        entry.dataset.wordId = wordId;
    }
    entry.innerHTML = `
        <span class="entry-number">${entryNum}</span>
        <input type="text" class="word-term" placeholder="Woord" value="${escapeHtml(term)}" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
        <input type="text" class="word-definition" placeholder="Vertaling" value="${escapeHtml(definition)}" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false">
        <button class="btn-remove" onclick="removeWordEntry(this)" title="Verwijderen">
            <i class="fas fa-times"></i>
        </button>
    `;
    wordsList.appendChild(entry);
    
    // Auto-add new entry when typing in last field
    const defInput = entry.querySelector('.word-definition');
    defInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            const entries = document.querySelectorAll('.word-entry');
            if (entry === entries[entries.length - 1]) {
                e.preventDefault();
                addWordEntry();
                setTimeout(() => {
                    const newEntry = document.querySelector('.word-entry:last-child .word-term');
                    newEntry.focus();
                }, 50);
            }
        }
    });
}

function removeWordEntry(btn) {
    const entry = btn.closest('.word-entry');
    entry.remove();
    updateEntryNumbers();
}

function updateEntryNumbers() {
    document.querySelectorAll('.word-entry').forEach((entry, index) => {
        entry.querySelector('.entry-number').textContent = index + 1;
    });
}

// ===== Subject Selection =====
document.querySelectorAll('.subject-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.subject-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('selected-subject').value = btn.dataset.subject;
        document.getElementById('selected-icon').value = btn.dataset.icon;

        const fromSearch = document.getElementById('lang-from-search');
        const toSearch = document.getElementById('lang-to-search');
        const langFromSelect = document.getElementById('lang-from');
        const langToSelect = document.getElementById('lang-to');
        if (langFromSelect) filterLanguageSelect(fromSearch?.value || '', langFromSelect);
        if (langToSelect) filterLanguageSelect(toSearch?.value || '', langToSelect);
    });
});

// ===== Import =====
let importSource = 'plain';

function setImportSource(source) {
    importSource = source;
    document.querySelectorAll('.import-source-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.source === source);
    });
    document.getElementById('import-instructions-plain').classList.toggle('hidden', source !== 'plain');
    document.getElementById('import-instructions-studygo').classList.toggle('hidden', source !== 'studygo');
    document.getElementById('import-instructions-jojoschool').classList.toggle('hidden', source !== 'jojoschool');

    const textarea = document.getElementById('import-text');
    if (source === 'studygo') {
        textarea.placeholder = 'Plak hier de gekopieerde StudyGo pagina...';
    } else if (source === 'jojoschool') {
        textarea.placeholder = 'Plak hier de gekopieerde JoJoSchool pagina...';
    } else {
        textarea.placeholder = 'woord1\tvertaling1\nwoord2\tvertaling2';
    }
}

function toggleImport() {
    document.getElementById('import-area').classList.toggle('hidden');
}

function detectSingleLanguage(text) {
    const languages = {
        'engels': 'Engels', 'english': 'Engels',
        'frans': 'Frans', 'french': 'Frans', 'français': 'Frans',
        'grieks': 'Grieks', 'greek': 'Grieks',
        'latijn': 'Latijn', 'latin': 'Latijn',
        'duits': 'Duits', 'german': 'Duits', 'deutsch': 'Duits',
        'spaans': 'Spaans', 'spanish': 'Spaans', 'español': 'Spaans',
        'italiaans': 'Italiaans', 'italian': 'Italiaans', 'italiano': 'Italiaans',
        'portugees': 'Portugees', 'portuguese': 'Portugees',
        'russisch': 'Russisch', 'russian': 'Russisch',
        'nederlands': 'Nederlands', 'dutch': 'Nederlands',
        'zweeds': 'Zweeds', 'swedish': 'Zweeds',
        'noors': 'Noors', 'norwegian': 'Noors',
        'deens': 'Deens', 'danish': 'Deens',
        'fins': 'Fins', 'finnish': 'Fins',
        'pools': 'Pools', 'polish': 'Pools',
        'tsjechisch': 'Tsjechisch', 'czech': 'Tsjechisch',
        'turks': 'Turks', 'turkish': 'Turks',
        'arabisch': 'Arabisch', 'arabic': 'Arabisch',
        'chinees': 'Chinees', 'chinese': 'Chinees',
        'japans': 'Japans', 'japanese': 'Japans',
        'koreaans': 'Koreaans', 'korean': 'Koreaans'
    };
    return languages[text.toLowerCase()] || null;
}

function parseStudyGoText(text) {
    const lines = text.split('\n').filter(line => line.trim());
    const skipHeaders = [
        'home', 'oefenen', 'forum', 'lessen', 'zoeken',
        'terug naar lijst', 'lijst printen', 'tabel', 'kaartjes'
    ];

    let title = '';
    let fromLang = '';
    let toLang = '';
    let wordStartIndex = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        const lower = line.toLowerCase();

        if (skipHeaders.includes(lower)) continue;

        // Check for chapter title
        if (/hoofdstuk|chapter|^\d|^[a-z]\./i.test(line)) {
            if (!title) {
                title = line;
            }
            continue;
        }

        // Check for language name
        const detectedLang = detectSingleLanguage(line);
        if (detectedLang) {
            fromLang = detectedLang;
            if (i + 1 < lines.length) {
                const secondLang = detectSingleLanguage(lines[i + 1].trim());
                if (secondLang) {
                    toLang = secondLang;
                    wordStartIndex = i + 2;
                    break;
                }
            }
        }
    }

    const pairs = [];
    for (let i = wordStartIndex; i < lines.length - 1; i += 2) {
        const word = lines[i].trim();
        const translation = lines[i + 1].trim();

        if (!word || !translation) continue;
        if (skipHeaders.includes(word.toLowerCase())) continue;
        if (skipHeaders.includes(translation.toLowerCase())) continue;

        pairs.push({ term: word, definition: translation });
    }

    return { title, fromLang, toLang, pairs };
}

function parseJojoSchoolText(text) {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);

    // Headers to filter out - more comprehensive list
    const skipPatterns = [
        /^nieuw$/i, /^woordenlijst$/i, /^stel je vraag$/i,
        /^mijn account$/i, /^blogs$/i, /^log uit$/i, /^upgrade$/i,
        /^start met oefenen$/i, /^stampen$/i, /^toets$/i, /^flashcard$/i,
        /^meerkeuze$/i, /^typen$/i, /^opslaan$/i, /^maak kopie$/i, /^delen$/i,
        /^verwijder$/i, /^bewerk$/i, /^ken je nog niet$/i, /^aan het leren$/i,
        /^gestampt!$/i, /^selecteer deze$/i, /^woorden in deze lijst/i,
        /^je bent/i, /^voortgang$/i, /^bekijk je voortgang/i, /^oefen opnieuw$/i,
        /^keer geoefend$/i, /^geen beoordelingen$/i, /^je bent goed op weg/i,
        /^ga verder waar je gebleven was/i, /^hervat sessie$/i, /^selecteer alle$/i,
        /^\d+,\d+$/i, /^topscore!/i, /^nog niet geoefend/i  // Scores and ratings
    ];

    let title = '';
    let fromLang = '';
    let wordLines = [];
    let seenFirstTitle = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip patterns
        if (skipPatterns.some(p => p.test(line))) continue;

        // Try to detect language early
        if (!fromLang && wordLines.length === 0) {
            const lang = detectSingleLanguage(line);
            if (lang) {
                fromLang = lang;
                continue;
            }
        }

        // Detect title (first substantial non-numeric line)
        if (!title && !seenFirstTitle && line.length > 3 && line.length < 150) {
            // Should not be just numbers, shouldn't look like a score
            if (!/^\d+$/.test(line) && !line.match(/^\d+[,.]\d+$/)) {
                title = line;
                seenFirstTitle = true;
                continue;
            }
        }

        // Only add to word lines after title is detected
        if (seenFirstTitle && line.length > 0) {
            wordLines.push(line);
        }
    }

    // Pair up consecutive lines - more robust
    const pairs = [];
    let i = 0;
    while (i < wordLines.length) {
        const word = wordLines[i];
        const translation = i + 1 < wordLines.length ? wordLines[i + 1] : null;

        // A valid pair needs both word and translation
        if (translation && word.length > 0 && translation.length > 0) {
            pairs.push({ term: word, definition: translation });
            i += 2;
        } else {
            // Skip unpaired lines
            i += 1;
        }
    }

    return { title, fromLang, toLang: 'Nederlands', pairs };
}

function importWords() {
    const text = document.getElementById('import-text').value;

    if (importSource === 'studygo') {
        const result = parseStudyGoText(text);

        if (result.pairs.length === 0) {
            alert('Geen woordparen gevonden. Controleer of je de juiste tekst hebt geplakt.');
            return;
        }

        // Auto-fill title if empty
        const titleInput = document.getElementById('list-title');
        if (!titleInput.value.trim() && result.title) {
            titleInput.value = result.title;
        }

        // Auto-fill languages if not set
        const langFrom = document.getElementById('lang-from');
        const langTo = document.getElementById('lang-to');
        if (!langFrom.value && result.fromLang) {
            langFrom.value = result.fromLang;
        }
        if (!langTo.value && result.toLang) {
            langTo.value = result.toLang;
        }

        // Clear empty entries
        const wordsList = document.getElementById('words-list');
        const existingEntries = Array.from(wordsList.querySelectorAll('.word-entry'));
        const allEmpty = existingEntries.length > 0 && existingEntries.every(entry => {
            const term = entry.querySelector('.word-term').value.trim();
            const def = entry.querySelector('.word-definition').value.trim();
            return !term && !def;
        });
        if (allEmpty) {
            wordsList.innerHTML = '';
        }

        result.pairs.forEach(pair => {
            addWordEntry(pair.term, pair.definition);
        });
    } else if (importSource === 'jojoschool') {
        const result = parseJojoSchoolText(text);

        if (result.pairs.length === 0) {
            alert('Geen woordparen gevonden. Controleer of je de juiste tekst hebt geplakt.');
            return;
        }

        // Auto-fill title if empty
        const titleInput = document.getElementById('list-title');
        if (!titleInput.value.trim() && result.title) {
            titleInput.value = result.title;
        }

        // Auto-fill languages if not set
        const langFrom = document.getElementById('lang-from');
        const langTo = document.getElementById('lang-to');
        if (!langFrom.value && result.fromLang) {
            langFrom.value = result.fromLang;
        }
        if (!langTo.value && result.toLang) {
            langTo.value = result.toLang;
        }

        // Clear empty entries
        const wordsList = document.getElementById('words-list');
        const existingEntries = Array.from(wordsList.querySelectorAll('.word-entry'));
        const allEmpty = existingEntries.length > 0 && existingEntries.every(entry => {
            const term = entry.querySelector('.word-term').value.trim();
            const def = entry.querySelector('.word-definition').value.trim();
            return !term && !def;
        });
        if (allEmpty) {
            wordsList.innerHTML = '';
        }

        result.pairs.forEach(pair => {
            addWordEntry(pair.term, pair.definition);
        });
    } else {
        const lines = text.trim().split('\n');

        const wordsList = document.getElementById('words-list');
        const existingEntries = Array.from(wordsList.querySelectorAll('.word-entry'));
        const allEmpty = existingEntries.length > 0 && existingEntries.every(entry => {
            const term = entry.querySelector('.word-term').value.trim();
            const def = entry.querySelector('.word-definition').value.trim();
            return !term && !def;
        });
        if (allEmpty) {
            wordsList.innerHTML = '';
        }

        lines.forEach(line => {
            const parts = line.split('\t');
            if (parts.length >= 2) {
                addWordEntry(parts[0].trim(), parts[1].trim());
            }
        });
    }

    document.getElementById('import-text').value = '';
    document.getElementById('import-area').classList.add('hidden');
}

// ===== Save List =====
async function saveList() {
    const title = document.getElementById('list-title').value.trim();
    const langFrom = document.getElementById('lang-from').value.trim();
    const langTo = document.getElementById('lang-to').value.trim();
    const subject = document.getElementById('selected-subject').value;
    const icon = document.getElementById('selected-icon').value || 'fa-book';
    const isPublic = isCloudEnabled() ? (document.getElementById('list-public')?.checked !== false) : false;
    const existingList = editingListId ? wordLists.find(l => l.id === editingListId) : null;
    const statsById = (existingList?.words || []).reduce((acc, w) => {
        acc[w.id] = w.stats || { correct: 0, wrong: 0 };
        return acc;
    }, {});
    
    if (!title) {
        alert('Voer een titel in voor je woordenlijst');
        return;
    }

    if (!langFrom || !langTo) {
        alert('Kies beide talen voor je woordenlijst');
        return;
    }
    
    const words = [];
    document.querySelectorAll('.word-entry').forEach(entry => {
        const term = entry.querySelector('.word-term').value.trim();
        const definition = entry.querySelector('.word-definition').value.trim();
        if (term && definition) {
            const existingId = entry.dataset.wordId;
            const wordId = existingId || generateId();
            words.push({
                id: wordId,
                term,
                definition,
                stats: statsById[wordId] || { correct: 0, wrong: 0 }
            });
        }
    });
    
    if (words.length === 0) {
        alert('Voeg minimaal één woord toe');
        return;
    }
    
    if (editingListId) {
        const listIndex = wordLists.findIndex(l => l.id === editingListId);
        if (listIndex >= 0) {
            wordLists[listIndex] = {
                ...wordLists[listIndex],
                title,
                langFrom,
                langTo,
                subject,
                icon,
                words,
                isPublic
            };
        }
    } else {
        const newList = {
            id: generateId(),
            title,
            langFrom,
            langTo,
            subject,
            icon,
            words,
            isPublic,
            createdAt: new Date().toISOString()
        };
        wordLists.push(newList);
    }

    if (authUser && supabaseClient) {
        try {
            await saveListToRemote(editingListId || wordLists[wordLists.length - 1].id);
            await loadRemoteLists();
        } catch (err) {
            console.error('Online opslaan mislukt, lokaal opgeslagen.', err);
            saveData();
            alert('Online opslaan mislukt. Je lijst is wel lokaal opgeslagen. Controleer je RLS policies.');
        }
    } else {
        saveData();
    }

    showHome();
}

// ===== Edit/Delete List =====
function editCurrentList() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;
    
    editingListId = list.id;
    document.getElementById('create-title').textContent = 'Lijst bewerken';
    document.getElementById('list-title').value = list.title;
    document.getElementById('lang-from').value = list.langFrom || '';
    document.getElementById('lang-to').value = list.langTo || '';
    document.getElementById('selected-subject').value = list.subject;
    document.getElementById('selected-icon').value = list.icon;
    
    document.querySelectorAll('.subject-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.subject === list.subject);
    });
    
    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = '';
    list.words.forEach(word => addWordEntry(word.term, word.definition, word.id));

    const publicToggle = document.getElementById('list-public');
    if (publicToggle) publicToggle.checked = isCloudEnabled() ? !!list.isPublic : false;

    const fromSearch = document.getElementById('lang-from-search');
    const toSearch = document.getElementById('lang-to-search');
    const langFromSelect = document.getElementById('lang-from');
    const langToSelect = document.getElementById('lang-to');
    if (langFromSelect) filterLanguageSelect(fromSearch?.value || '', langFromSelect);
    if (langToSelect) filterLanguageSelect(toSearch?.value || '', langToSelect);
    
    showView('create-view');
}

async function deleteCurrentList() {
    // allow fallback to dataset on container if currentListId was lost
    const container = document.querySelector('.list-detail-container');
    const id = currentListId || (container && container.dataset.listId);

    if (!id) {
        alert('Geen woordenlijst geselecteerd om te verwijderen.');
        return;
    }

    if (!confirm('Weet je zeker dat je deze woordenlijst wilt verwijderen?')) return;

    // show immediate UI feedback by disabling delete button
    const deleteBtn = document.querySelector('.btn-danger');
    if (deleteBtn) deleteBtn.disabled = true;

    const beforeCount = wordLists.length;
    wordLists = wordLists.filter(l => l.id !== id);

    if (wordLists.length === beforeCount) {
        // nothing removed — restore button and warn
        if (deleteBtn) deleteBtn.disabled = false;
        alert('Woordlijst niet gevonden of al verwijderd.');
        return;
    }

    if (authUser && supabaseClient) {
        await deleteListFromRemote(id);
        await loadRemoteLists();
    } else {
        saveData();
    }
    // clear any stored active session for this list
    const active = JSON.parse(localStorage.getItem('activeStudySession') || '{}');
    if (active && active.listId === id) localStorage.removeItem('activeStudySession');

    showHome();
}

// ===== Merge Functions =====
function toggleMergeMode() {
    mergeMode = !mergeMode;
    selectedListsForMerge = [];
    renderWordLists();

    const mergeBtn = document.getElementById('merge-mode-btn');
    const mergeActionBtn = document.getElementById('merge-action-btn');

    if (mergeBtn) {
        if (mergeMode) {
            mergeBtn.innerHTML = '<i class="fas fa-times"></i> Annuleren';
            mergeBtn.classList.add('active');
        } else {
            mergeBtn.innerHTML = '<i class="fas fa-layer-group"></i> Samenvoegen';
            mergeBtn.classList.remove('active');
        }
    }

    if (mergeActionBtn) {
        mergeActionBtn.classList.add('hidden');
    }
}

function toggleListSelection(listId) {
    if (!mergeMode) return;

    const index = selectedListsForMerge.indexOf(listId);
    if (index > -1) {
        selectedListsForMerge.splice(index, 1);
    } else {
        selectedListsForMerge.push(listId);
    }

    renderWordLists();
}

function updateMergeButton() {
    const mergeActionBtn = document.getElementById('merge-action-btn');
    if (!mergeActionBtn) return;

    if (mergeMode && selectedListsForMerge.length >= 2) {
        mergeActionBtn.classList.remove('hidden');
        mergeActionBtn.textContent = `${selectedListsForMerge.length} lijsten samenvoegen`;
    } else {
        mergeActionBtn.classList.add('hidden');
    }
}

function mergeLists() {
    if (selectedListsForMerge.length < 2) {
        alert('Selecteer minstens 2 woordenlijsten om samen te voegen.');
        return;
    }

    const selectedLists = wordLists.filter(l => selectedListsForMerge.includes(l.id));

    // Verzamel alle woorden en verwijder duplicaten
    const allWords = [];
    const seenTerms = new Set();

    selectedLists.forEach(list => {
        list.words.forEach(word => {
            const key = `${word.term.toLowerCase()}-${word.definition.toLowerCase()}`;
            if (!seenTerms.has(key)) {
                seenTerms.add(key);
                allWords.push({
                    id: word.id || generateId(),
                    term: word.term,
                    definition: word.definition,
                    stats: word.stats || { correct: 0, wrong: 0 }
                });
            }
        });
    });

    // Bepaal gedeelde eigenschappen
    const firstList = selectedLists[0];
    const allSameLang = selectedLists.every(l =>
        l.langFrom === firstList.langFrom &&
        l.langTo === firstList.langTo
    );
    const allSameSubject = selectedLists.every(l => l.subject === firstList.subject);

    // Vul het create-view formulier in
    document.getElementById('list-title').value = selectedLists.map(l => l.title).join(' + ');
    document.getElementById('selected-subject').value = allSameSubject ? firstList.subject : '';
    document.getElementById('selected-icon').value = allSameSubject ? firstList.icon : 'fa-book';

    // Update subject button selection
    document.querySelectorAll('.subject-btn').forEach(btn => {
        if (allSameSubject && btn.dataset.subject === firstList.subject) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Vul taalkeuzes in
    if (allSameLang) {
        document.getElementById('lang-from').value = firstList.langFrom;
        document.getElementById('lang-to').value = firstList.langTo;
    } else {
        document.getElementById('lang-from').value = '';
        document.getElementById('lang-to').value = '';
    }

    // Verwijder oude woorden en voeg nieuwe toe
    document.getElementById('words-container').innerHTML = '';
    allWords.forEach(word => {
        addWordEntry(word.term, word.definition, word.id, word.stats);
    });

    // Reset merge mode en ga naar create view
    mergeMode = false;
    selectedListsForMerge = [];
    editingListId = null;

    showCreateList();
}

async function exportCurrentList() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const header = `Titel:\t${list.title}\nTalen:\t${list.langFrom} -> ${list.langTo}\n\n`;
    const content = list.words.map(w => `${w.term}\t${w.definition}`).join('\n');
    const text = header + content;

    try {
        await navigator.clipboard.writeText(text);
        alert('Woordlijst gekopieerd naar je klembord.');
    } catch (err) {
        console.error('Kopiëren mislukt', err);
        alert('Kopiëren naar klembord is mislukt. Probeer het in een veilige (https) omgeving.');
    }
}

function buildShareUrlForList(list) {
    const baseUrl = `${window.location.origin}${window.location.pathname}`;
    const data = (list.words || []).map(w => `${w.term}\t${w.definition}`).join('\n');
    const params = new URLSearchParams({
        import: '1',
        title: list.title || '',
        langFrom: list.langFrom || '',
        langTo: list.langTo || '',
        data
    });
    return `${baseUrl}?${params.toString()}`;
}

function openQrShareModal() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const shareUrl = buildShareUrlForList(list);
    const qrImage = document.getElementById('qr-share-image');
    const linkInput = document.getElementById('qr-share-link');
    const modal = document.getElementById('qr-share-modal');
    if (!qrImage || !linkInput || !modal) return;

    const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(shareUrl)}`;
    qrImage.src = qrSrc;
    linkInput.value = shareUrl;
    modal.classList.remove('hidden');
}

function closeQrShareModal() {
    const modal = document.getElementById('qr-share-modal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

async function copyQrShareLink() {
    const input = document.getElementById('qr-share-link');
    if (!input || !input.value) return;
    await navigator.clipboard.writeText(input.value);
    alert('Deellink gekopieerd!');
}

// ===== Supabase Auth & Sync =====
function initSupabase() {
    if (!isCloudEnabled()) return;
    if (!window.supabase) return;

    const SUPABASE_URL = 'https://sngiduythwiuthrtzmch.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuZ2lkdXl0aHdpdXRocnR6bWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNDY5MzUsImV4cCI6MjA4NTYyMjkzNX0.xNecbmT6VRPPhBVnW5WQv-QdJp4o2MDZq4tV-jsJXLI';

    // Basic sanity-checks to avoid accidental DNS errors with placeholder values
    if (SUPABASE_URL.includes('YOUR_PROJECT') || SUPABASE_ANON_KEY.includes('YOUR_ANON_KEY')) {
        console.error('Supabase niet geconfigureerd — voeg SUPABASE_URL en SUPABASE_ANON_KEY toe in app.js');
        document.getElementById('auth-login-btn')?.classList.add('hidden');
        document.getElementById('auth-signup-btn')?.classList.add('hidden');
        return;
    }

    // Create or reuse the client to avoid multiple GoTrue instances
    if (window.__loek_supabase_client) {
        supabaseClient = window.__loek_supabase_client;
        console.info('Reusing existing Supabase client instance.');
    } else {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        window.__loek_supabase_client = supabaseClient;
        // Expose config for debug helpers
        window.__LOEK_SUPABASE_CONFIG = { url: SUPABASE_URL, anonKey: SUPABASE_ANON_KEY };
        console.info('Supabase client initialized. Ensure you have created RLS policies (see README/SQL) to protect user data.');
    }

    supabaseClient.auth.getSession().then(({ data }) => {
        authUser = data.session?.user || null;
        updateAuthUI();
        if (authUser) {
            loadRemoteLists();
        }
    });

    supabaseClient.auth.onAuthStateChange((_event, session) => {
        authUser = session?.user || null;
        updateAuthUI();
        if (authUser) {
            loadRemoteLists();
        } else {
            wordLists = JSON.parse(localStorage.getItem('wordLists')) || [];
            renderWordLists();
        }
    });
}

function updateAuthUI() {
    const loginBtn = document.getElementById('auth-login-btn');
    const signupBtn = document.getElementById('auth-signup-btn');
    const logoutBtn = document.getElementById('auth-logout-btn');
    const userLabel = document.getElementById('auth-user');
    const menuBtn = document.getElementById('auth-menu-btn');
    const avatarInitial = document.getElementById('auth-avatar-initial');

    if (authUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (signupBtn) signupBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        if (userLabel) {
            userLabel.textContent = authUser.email;
            userLabel.classList.remove('hidden');
        }
        if (menuBtn) menuBtn.classList.add('logged-in');
        if (avatarInitial) {
            const initial = authUser.email?.trim()?.[0] || '?';
            avatarInitial.textContent = initial.toUpperCase();
        }
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (signupBtn) signupBtn.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
        if (userLabel) {
            userLabel.textContent = '';
            userLabel.classList.add('hidden');
        }
        if (menuBtn) menuBtn.classList.remove('logged-in');
        if (avatarInitial) avatarInitial.textContent = '?';
    }
}

function toggleAuthMenu(event) {
    if (!isCloudEnabled()) return;
    event.stopPropagation();
    const menu = document.getElementById('auth-menu');
    if (!menu) return;
    menu.classList.toggle('hidden');
}

function closeAuthMenu() {
    const menu = document.getElementById('auth-menu');
    if (!menu) return;
    menu.classList.add('hidden');
}

function openAuthModal(mode) {
    if (!isCloudEnabled()) return;
    authMode = mode;
    closeAuthMenu();
    document.getElementById('auth-modal').classList.remove('hidden');
    document.getElementById('auth-title').innerHTML = mode === 'signup'
        ? '<i class="fas fa-user-plus"></i> Account maken'
        : '<i class="fas fa-user"></i> Inloggen';
    document.getElementById('auth-submit-btn').innerHTML = mode === 'signup'
        ? '<i class="fas fa-check"></i> Registreren'
        : '<i class="fas fa-check"></i> Inloggen';
    document.getElementById('auth-error').classList.add('hidden');
}

function closeAuthModal() {
    document.getElementById('auth-modal').classList.add('hidden');
}

function openAppSettings() {
    const modal = document.getElementById('app-settings-modal');
    const toggle = document.getElementById('cloud-enabled-toggle');
    if (toggle) toggle.checked = isCloudEnabled();
    const darkToggle = document.getElementById('dark-mode-toggle');
    if (darkToggle) darkToggle.checked = isDarkModeEnabled();
    const logoToggle = document.getElementById('dynamic-logo-toggle');
    if (logoToggle) logoToggle.checked = isDynamicLogoEnabled();
    const colorPicker = document.getElementById('accent-color-picker');
    const colorInput = document.getElementById('accent-color-input');
    const accent = getAccentColor();
    if (colorPicker) colorPicker.value = accent;
    if (colorInput) colorInput.value = accent;
    renderPresetColors();
    const lastTab = localStorage.getItem(LAST_SETTINGS_TAB_KEY) || 'general';
    setAppSettingsTab(lastTab);
    if (modal) modal.classList.remove('hidden');
}

function closeAppSettings() {
    const modal = document.getElementById('app-settings-modal');
    if (modal) modal.classList.add('hidden');
}

function saveAppSettings() {
    // Settings now auto-save on change, so this just closes the modal
    closeAppSettings();
}

function setAppSettingsTab(tab) {
    const tabs = document.querySelectorAll('.settings-tabs .tab-btn');
    const panels = document.querySelectorAll('.tab-panels .tab-panel');
    tabs.forEach(btn => btn.classList.toggle('active', btn.dataset.tab === tab));
    panels.forEach(panel => panel.classList.toggle('active', panel.id === `tab-${tab}`));
    localStorage.setItem(LAST_SETTINGS_TAB_KEY, tab);
}

function isDarkModeEnabled() {
    return localStorage.getItem(DARK_MODE_SETTINGS_KEY) === 'true';
}

function setDarkModeEnabled(enabled) {
    localStorage.setItem(DARK_MODE_SETTINGS_KEY, enabled ? 'true' : 'false');
    applyTheme();
}

function isDynamicLogoEnabled() {
    const val = localStorage.getItem(DYNAMIC_LOGO_SETTINGS_KEY);
    if (val === null) return true; // Default ON
    return val === 'true';
}

function setDynamicLogoEnabled(enabled) {
    localStorage.setItem(DYNAMIC_LOGO_SETTINGS_KEY, enabled ? 'true' : 'false');
    applyTheme();
}

function applyTheme() {
    const enabled = isDarkModeEnabled();
    const dynamicLogo = isDynamicLogoEnabled();
    document.body.classList.toggle('dark', enabled);
    document.body.classList.toggle('dynamic-logo-enabled', dynamicLogo);
    applyAccentColor(getAccentColor());
}

function updateFavicon(primary, dark) {
    const isDynamic = isDynamicLogoEnabled();
    // Default colors as sent by user
    let faceColor = "#fdc204";
    let noseColor = "#e89d05";

    // Always use original colors for default yellow, otherwise follow dynamic setting
    if (isDynamic && primary !== '#FFD93D') {
        faceColor = primary;
        noseColor = dark;
    }

    const svgTemplate = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="176" height="208" viewBox="0 0 176 208">
        <g transform="translate(-159.0253,-68.68503)">
            <path d="M181.26891,221.58907c0,-35.86713 -15.34531,-76.82861 -15.34531,-95.60829c0,-13.0457 32.33336,-40.63191 45.79687,-40.63191c17.32149,0 57.70153,0 86.87844,0c15.47817,0 31.1881,20.35903 31.1881,31.69111c0,18.98627 0,71.43517 0,108.68152c0,17.97676 -33.55751,45.55451 -48.41883,45.55451c-14.73709,0 -33.52207,-14.97104 -60.10484,-14.97104c-22.08538,0 -39.99443,-14.61957 -39.99443,-34.71588z" fill="#fcf1d1" stroke="#000000" stroke-width="10.5"/>
            <path d="M164.2753,236.84929c0,-35.86713 0,-89.17972 0,-107.9594c0,-13.0457 16.98805,-28.2808 30.45156,-28.2808c17.32149,0 62.41166,0 91.58857,0c15.47817,0 26.47797,12.50881 26.47797,23.84089c0,18.98627 0,79.2854 0,116.53174c0,17.97676 -19.7093,30.58347 -34.57062,30.58347c-14.73709,0 -47.37028,0 -73.95305,0c-22.08538,0 -39.99443,-14.61957 -39.99443,-34.71588z" fill="${faceColor}" stroke="#000000" stroke-width="10.5"/>
            <path d="M190.45269,198.23019l-25.47516,-7.12449" fill="none" stroke="#000000" stroke-width="10.5" stroke-linecap="round"/>
            <path d="M231.85421,218.76247c0,-1.27379 -0.52642,-3.29545 -0.61386,-5.61272c-0.26314,-6.9742 -0.32251,-16.62602 -0.32251,-16.62602h16.38644c0,0 -0.26981,10.85447 -0.74615,17.80403c-0.1172,1.70987 -1.12659,3.18335 -1.12659,4.20061c0,2.35306 0.114,10.27828 -7.02376,9.84237c-5.5897,-0.09866 -6.55357,-7.7658 -6.55357,-9.60827z" fill="${noseColor}"/>
            <path d="M231.1334,195.44147c1.09524,-2.06216 4.9423,-2.34092 6.96327,-2.34092c1.7688,0 5.76702,0.55632 6.84807,2.57501" fill="none" stroke="#000000" stroke-width="10.5" stroke-linecap="round"/>
            <path d="M231.42856,202.26057c0,11.56814 -9.60111,20.94597 -21.44468,20.94597c-11.84357,0 -21.44468,-9.37783 -21.44468,-20.94597c0,-11.56814 9.60111,-20.94597 21.44468,-20.94597c11.84357,0 21.44468,9.37783 21.44468,20.94597z" fill="#fcfcfc" stroke="#000000" stroke-width="8.5"/>
            <path d="M288.39697,202.81283c0,11.56814 -9.60111,20.94597 -21.44468,20.94597c-11.84357,0 -21.44469,-9.37783 -21.44469,-20.94597c0,-11.56814 9.60112,-20.94597 21.44469,-20.94597c11.84357,0 21.44468,9.37783 21.44468,20.94597z" fill="#fcfcfc" stroke="#000000" stroke-width="8.5"/>
            <path d="M288.42805,196.44152l21.26151,-5.95403" fill="none" stroke="#000000" stroke-width="10.5" stroke-linecap="round"/>
            <path d="M256.90206,237.9935c0,0 -3.16122,15.66449 -17.08871,15.45007c-14.93715,-0.57176 -17.08872,-15.45007 -17.08872,-15.45007" fill="none" stroke="#000000" stroke-width="5.5" stroke-linecap="round"/>
            <path d="M205.64506,200.0706c0,-3.61999 2.93458,-6.55457 6.55457,-6.55457c3.61999,0 6.55458,2.93458 6.55458,6.55458c0,3.61999 -2.93458,6.55458 -6.55457,6.55458c-3.61999,0 -6.55457,-2.93458 -6.55457,-6.55457z" fill="#000000" stroke="#000000" stroke-width="0.5"/>
            <path d="M262.58891,199.787c0,-3.61999 2.93458,-6.55457 6.55457,-6.55457c3.61999,0 6.55458,2.93458 6.55458,6.55458c0,3.61999 -2.93459,6.55458 -6.55457,6.55458c-3.61999,0 -6.55457,-2.93458 -6.55457,-6.55457z" fill="#000000" stroke="none" stroke-width="0"/>
            <path d="M200.71999,159.49466c0,0 5.23481,-8.77689 12.63142,-9.9159c10.80313,-1.66359 18.26872,6.40452 18.26872,6.40452" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
            <path d="M248.94293,156.21738c0,0 6.85263,-6.20051 17.86228,-5.44591c8.9574,0.61395 13.03785,8.95729 13.03785,8.95729" fill="none" stroke="#000000" stroke-width="6" stroke-linecap="round"/>
            <path d="M209.3206,116.68132c-9.91379,-3.09959 -18.80188,-14.9667 -23.63838,-22.56556c-14.59159,-22.92555 4.61742,-15.45305 6.78667,-14.61521c7.0794,2.50232 18.23168,10.40104 13.37438,-2.67487c-4.02674,-5.94388 3.66876,-6.3546 7.48965,-5.61724c3.8209,0.73736 19.00336,12.23009 23.00392,11.76945c3.14477,-0.3621 -3.45621,-7.61097 -0.53498,-9.62955c4.0414,-2.79261 11.97713,-2.89832 18.18915,0.80246c2.37993,1.41783 27.55058,25.1354 21.22596,27.7469c-3.30286,1.36379 -9.26644,1.78611 -13.70766,3.09569c-6.71153,1.97902 -13.26955,4.47796 -19.95993,6.13634c-14.09302,3.49331 -26.39174,7.37657 -32.22878,5.55159z" fill="#000000" stroke="#000000" stroke-width="4.5" stroke-linecap="round"/>
        </g>
    </svg>`;

    const encodedSvg = window.btoa(svgTemplate);
    const link = document.querySelector("link[rel*='icon']");
    if (link) {
        link.href = `data:image/svg+xml;base64,${encodedSvg}`;
    }
}

function normalizeHexColor(value) {
    if (!value) return null;
    const hex = value.trim();
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) return hex.toUpperCase();
    if (/^#[0-9A-Fa-f]{3}$/.test(hex)) {
        return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`.toUpperCase();
    }
    return null;
}

function getAccentColor() {
    return normalizeHexColor(localStorage.getItem(ACCENT_COLOR_SETTINGS_KEY)) || DEFAULT_ACCENT_COLOR;
}

function setAccentColor(value) {
    const normalized = normalizeHexColor(value) || DEFAULT_ACCENT_COLOR;
    localStorage.setItem(ACCENT_COLOR_SETTINGS_KEY, normalized);
    applyAccentColor(normalized);
}

function resetAccentColor() {
    setAccentColor(DEFAULT_ACCENT_COLOR);
    const colorPicker = document.getElementById('accent-color-picker');
    const colorInput = document.getElementById('accent-color-input');
    if (colorPicker) colorPicker.value = DEFAULT_ACCENT_COLOR;
    if (colorInput) colorInput.value = DEFAULT_ACCENT_COLOR;
}

function applyAccentColor(color) {
    const normalized = normalizeHexColor(color) || DEFAULT_ACCENT_COLOR;
    const isDark = isDarkModeEnabled();
    const palette = buildAccentPalette(normalized, isDark);
    const root = document.documentElement;
    root.style.setProperty('--primary-yellow', palette.primary);
    root.style.setProperty('--primary-yellow-dark', palette.dark);
    root.style.setProperty('--primary-glow', palette.glow);
    
    // In dark mode, primary-yellow-light should be semi-transparent
    if (isDark) {
        root.style.setProperty('--primary-yellow-light', palette.glow);
        root.style.setProperty('--bg-cream', palette.bgCreamDark);
        root.style.setProperty('--bg-light', palette.bgLightDark);
    } else {
        root.style.setProperty('--primary-yellow-light', palette.light);
        root.style.setProperty('--bg-cream', palette.bgCream);
        root.style.setProperty('--bg-light', palette.bgLight);
    }

    // Update Favicon with dynamic colors
    updateFavicon(palette.primary, palette.dark);

    // Special handling for default yellow theme
    document.body.classList.toggle('default-yellow-theme', normalized === '#FFD93D');
}

function buildAccentPalette(hex, isDarkMode = false) {
    const rgb = hexToRgb(hex);
    if (!rgb) {
        return { 
            primary: DEFAULT_ACCENT_COLOR, 
            dark: '#E6B800', 
            light: '#FFF3B8', 
            glow: 'rgba(255, 217, 61, 0.3)',
            bgCream: '#FFFEF7',
            bgCreamDark: '#0b0f17',
            bgLight: '#FFF9E6',
            bgLightDark: '#111827'
        };
    }

    const glow = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${isDarkMode ? 0.2 : 0.35})`;
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    
    // Detect if color is dark (lightness < 0.5)
    const isColorDark = hsl.l < 0.5;
    
    // For icons: if color is dark, make them lighter
    let dark, light;
    if (isColorDark) {
        // Lighten for dark colors
        dark = hslToHex(hsl.h, clamp(hsl.s * 0.9, 0.3, 1), clamp(hsl.l + 0.15, 0.4, 0.7));
        light = hslToHex(hsl.h, clamp(hsl.s * 0.7, 0.2, 1), clamp(hsl.l + 0.35, 0.7, 0.95));
    } else {
        // Darken for light colors
        dark = hslToHex(hsl.h, hsl.s, clamp(hsl.l - 0.2, 0.1, 0.9));
        light = hslToHex(hsl.h, clamp(hsl.s - 0.05, 0.15, 1), clamp(hsl.l + 0.28, 0.2, 0.95));
    }
    
    // Background cream - subtle tinted version
    const bgCream = hslToHex(hsl.h, clamp(hsl.s * 0.15, 0.05, 0.15), clamp(hsl.l + 0.42, 0.92, 0.99));
    
    // Background light - slightly less subtle
    const bgLight = hslToHex(hsl.h, clamp(hsl.s * 0.25, 0.08, 0.25), clamp(hsl.l + 0.38, 0.88, 0.96));
    
    // Dark mode background - darker tinted version
    const bgCreamDark = hslToHex(hsl.h, clamp(hsl.s * 0.25, 0.08, 0.25), clamp(hsl.l * 0.15, 0.04, 0.1));
    
    // Dark mode bg-light - slightly lighter than bg-cream
    const bgLightDark = hslToHex(hsl.h, clamp(hsl.s * 0.3, 0.1, 0.35), clamp(hsl.l * 0.25, 0.06, 0.13));
    
    return { primary: hex.toUpperCase(), dark, light, glow, bgCream, bgLight, bgCreamDark, bgLightDark };
}

function hexToRgb(hex) {
    const normalized = normalizeHexColor(hex);
    if (!normalized) return null;
    const value = normalized.slice(1);
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return { r, g, b };
}

function rgbToHsl(r, g, b) {
    const rn = r / 255;
    const gn = g / 255;
    const bn = b / 255;
    const max = Math.max(rn, gn, bn);
    const min = Math.min(rn, gn, bn);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
        if (max === rn) h = ((gn - bn) / delta) % 6;
        else if (max === gn) h = (bn - rn) / delta + 2;
        else h = (rn - gn) / delta + 4;
        h = Math.round(h * 60);
        if (h < 0) h += 360;
    }
    const l = (max + min) / 2;
    const s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    return { h: h / 360, s, l };
}

function hslToHex(h, s, l) {
    const { r, g, b } = hslToRgb(h, s, l);
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hslToRgb(h, s, l) {
    const hue = h * 360;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((hue / 60) % 2 - 1));
    const m = l - c / 2;
    let r1 = 0;
    let g1 = 0;
    let b1 = 0;

    if (hue >= 0 && hue < 60) {
        r1 = c; g1 = x; b1 = 0;
    } else if (hue >= 60 && hue < 120) {
        r1 = x; g1 = c; b1 = 0;
    } else if (hue >= 120 && hue < 180) {
        r1 = 0; g1 = c; b1 = x;
    } else if (hue >= 180 && hue < 240) {
        r1 = 0; g1 = x; b1 = c;
    } else if (hue >= 240 && hue < 300) {
        r1 = x; g1 = 0; b1 = c;
    } else {
        r1 = c; g1 = 0; b1 = x;
    }

    return {
        r: Math.round((r1 + m) * 255),
        g: Math.round((g1 + m) * 255),
        b: Math.round((b1 + m) * 255)
    };
}

function toHex(value) {
    return value.toString(16).padStart(2, '0');
}

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function renderPresetColors() {
    const container = document.getElementById('preset-colors');
    if (!container) return;
    const currentColor = getAccentColor();
    container.innerHTML = PRESET_COLORS.map(color => `
        <button class="preset-color-btn ${color === currentColor ? 'active' : ''}" 
                style="background-color: ${color};"
                onclick="selectPresetColor('${color}')"
                aria-label="Kleur ${color}">
            ${color === currentColor ? '<i class="fas fa-check"></i>' : ''}
        </button>
    `).join('');
}

function selectPresetColor(color) {
    const normalized = normalizeHexColor(color) || DEFAULT_ACCENT_COLOR;
    setAccentColor(normalized);
    const colorPicker = document.getElementById('accent-color-picker');
    const colorInput = document.getElementById('accent-color-input');
    if (colorPicker) colorPicker.value = normalized;
    if (colorInput) colorInput.value = normalized;
    renderPresetColors();
}

function isCloudEnabled() {
    const value = localStorage.getItem(CLOUD_SETTINGS_KEY);
    if (value === null) return true;
    return value === 'true';
}

function setCloudEnabled(enabled) {
    localStorage.setItem(CLOUD_SETTINGS_KEY, enabled ? 'true' : 'false');
    applyCloudState();
}

function applyCloudState() {
    const enabled = isCloudEnabled();
    document.body.classList.toggle('cloud-disabled', !enabled);

    if (!enabled) {
        // Reset cloud state
        supabaseClient = null;
        authUser = null;
        closeAuthMenu();
        updateAuthUI();

        const publicInput = document.getElementById('public-search-input');
        const publicResults = document.getElementById('public-search-results');
        if (publicInput) publicInput.value = '';
        if (publicResults) {
            publicResults.innerHTML = '';
            publicResults.classList.add('hidden');
        }
    } else {
        initSupabase();
    }
}

async function submitAuth() {
    if (!isCloudEnabled()) return;
    if (!supabaseClient) return;
    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value.trim();
    const errorEl = document.getElementById('auth-error');

    if (!email || !password) {
        errorEl.textContent = 'Vul e-mail en wachtwoord in.';
        errorEl.classList.remove('hidden');
        return;
    }

    let result;
    if (authMode === 'signup') {
        result = await supabaseClient.auth.signUp({ email, password });
    } else {
        result = await supabaseClient.auth.signInWithPassword({ email, password });
    }

    if (result.error) {
        errorEl.textContent = result.error.message;
        errorEl.classList.remove('hidden');
        return;
    }

    closeAuthModal();
    closeAuthMenu();
}

async function logout() {
    if (!isCloudEnabled()) return;
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
}

async function loadRemoteLists() {
    if (!supabaseClient || !authUser) return;
    const { data, error } = await supabaseClient
        .from('word_lists')
        .select('*')
        .eq('user_id', authUser.id)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Load lists failed', error);
        alert('Online lijsten laden is mislukt. Controleer je Supabase RLS policies.');
        return;
    }

    wordLists = (data || []).map(row => ({
        id: row.id,
        title: row.title,
        langFrom: row.lang_from,
        langTo: row.lang_to,
        subject: row.subject,
        icon: row.icon,
        words: row.words || [],
        isPublic: row.is_public,
        createdAt: row.created_at
    }));

    saveData();
    renderWordLists();
}

function isValidUUID(str) {
    return typeof str === 'string' && /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str);
}

async function saveListToRemote(listId) {
    if (!supabaseClient || !authUser) return;
    const list = wordLists.find(l => l.id === listId);
    if (!list) return;

    const searchText = list.words.map(w => `${w.term} ${w.definition}`).join(' ').slice(0, 2000);

    // Build payload and omit id if it's not a valid UUID so Postgres can generate one
    const payload = {
        user_id: authUser.id,
        title: list.title,
        lang_from: list.langFrom,
        lang_to: list.langTo,
        subject: list.subject,
        icon: list.icon,
        words: list.words,
        is_public: !!list.isPublic,
        search_text: searchText,
        updated_at: new Date().toISOString()
    };
    if (isValidUUID(list.id)) payload.id = list.id;

    try {
        // Log session/token presence to help debug auth related 400s
        try {
            const sess = await supabaseClient.auth.getSession();
            console.debug('Supabase session present:', !!sess?.data?.session);
        } catch (e) {
            console.debug('Could not read session prior to save:', e?.message || e);
        }

        // Request returning rows so we can capture generated UUIDs
        const resp = await supabaseClient
            .from('word_lists')
            .upsert(payload, { onConflict: 'id' })
            .select('*');

        if (resp.error) {
            // Log detailed response for debugging
            console.error('Save list failed (detailed):', {
                status: resp.status || 'unknown',
                error: resp.error,
                data: resp.data
            });

            // Attempt a manual REST call to capture full response body for debugging
            try {
                await debugRestSave(list);
            } catch (e) {
                console.error('Manual REST debug save also failed:', e);
            }

            throw resp.error;
        }

        // If DB generated an id (when we omitted id), update local list id with returned value
        if (resp.data && resp.data[0] && resp.data[0].id && !isValidUUID(list.id)) {
            list.id = resp.data[0].id;
            saveData();
            renderWordLists();
        }

        return resp.data;
    } catch (err) {
        console.error('Save list exception:', err);
        throw err;
    }
}

async function deleteListFromRemote(listId) {
    if (!supabaseClient || !authUser) return;
    await supabaseClient
        .from('word_lists')
        .delete()
        .eq('id', listId)
        .eq('user_id', authUser.id);
}

// Debug helper: perform manual REST request to Supabase to capture full response body
async function debugRestSave(list) {
    const cfg = window.__LOEK_SUPABASE_CONFIG;
    if (!cfg || !cfg.url) {
        console.warn('Supabase config not exposed on window; cannot run debug REST save.');
        return;
    }

    // Try to get a user access token
    let token = null;
    try {
        const sess = await supabaseClient.auth.getSession();
        token = sess?.data?.session?.access_token || null;
    } catch (e) {
        console.debug('Could not read access token for debug saving:', e?.message || e);
    }

    // Build REST payload, omit id if it's not a valid UUID
    const restPayload = [{
        user_id: list.userId || list.user_id || (authUser && authUser.id),
        title: list.title,
        lang_from: list.langFrom,
        lang_to: list.langTo,
        subject: list.subject,
        icon: list.icon,
        words: list.words,
        is_public: !!list.isPublic,
        search_text: (list.words || []).map(w => `${w.term} ${w.definition}`).join(' ').slice(0,2000),
        updated_at: new Date().toISOString()
    }];
    if (isValidUUID(list.id)) restPayload[0].id = list.id;

    const url = `${cfg.url.replace(/\/$/, '')}/rest/v1/word_lists?on_conflict=id`;
    const headers = {
        'Content-Type': 'application/json',
        apikey: cfg.anonKey
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    console.debug('Debug REST save request url:', url);
    console.debug('Debug REST save request headers:', Object.keys(headers));
    console.debug('Debug REST save payload sample:', payload[0]);

    const resp = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
    });

    const text = await resp.text();
    console.error('Debug REST save response status:', resp.status, resp.statusText);
    console.error('Debug REST save response body:', text);
    if (!resp.ok) throw new Error(`Debug REST save failed: ${resp.status}`);
    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

function debouncedPublicSearch() {
    clearTimeout(publicSearchTimer);
    publicSearchTimer = setTimeout(() => {
        performSearch();
    }, 200);
}

// ===== Subsite Registry =====
const subsiteRegistry = [
    {
        title: 'Griekse Aoristus Oefenen',
        description: 'Oefen Griekse aoristus vormen (pseudo-sigmatisch, thematisch, imperfect)',
        url: 'aoristus/',
        icon: 'fa-university',
        tags: ['grieks', 'aoristus', 'werkwoorden', 'vervoegen', 'greek', 'conjugation', 'aorist']
    },
    {
        title: 'Duitse Oefeningen',
        description: 'Modale werkwoorden, derde naamval, voornaamwoorden, der/ein-groep',
        url: 'du/',
        icon: 'fa-flag',
        tags: ['duits', 'german', 'deutsch', 'modale werkwoorden', 'dativ', 'derde naamval', 'voornaamwoorden', 'der', 'ein', 'naamval', 'grammatica']
    },
    {
        title: 'Duitse Modale Werkwoorden',
        description: 'Oefen dürfen, können, mögen, müssen, sollen, wollen',
        url: 'du/modale-werkwoorden/',
        icon: 'fa-flag',
        tags: ['duits', 'modale werkwoorden', 'dürfen', 'können', 'mögen', 'müssen', 'sollen', 'wollen', 'modal']
    },
    {
        title: 'Duits - Derde Naamval (Dativ)',
        description: 'Oefen de Duitse derde naamval (Dativ)',
        url: 'du/derde-naamval/',
        icon: 'fa-flag',
        tags: ['duits', 'dativ', 'derde naamval', 'naamval', 'grammatica']
    },
    {
        title: 'Duits - Persoonlijke Voornaamwoorden',
        description: 'Oefen Duitse persoonlijke voornaamwoorden',
        url: 'du/Persvnw/',
        icon: 'fa-flag',
        tags: ['duits', 'voornaamwoorden', 'persoonlijk', 'pronouns', 'grammatica']
    },
    {
        title: 'Duits - Der- en Ein-Groep',
        description: 'Oefen de der- en ein-groep in alle naamvallen',
        url: 'du/der_ein-gruppe/',
        icon: 'fa-flag',
        tags: ['duits', 'der', 'ein', 'naamval', 'grammatica', 'artikel']
    },
    {
        title: 'English Learning Hub',
        description: 'Engels leren: grammatica en woordenschat',
        url: 'en/',
        icon: 'fa-flag-usa',
        tags: ['engels', 'english', 'grammar', 'vocabulary', 'hub']
    },
    {
        title: 'English Grammar Practice',
        description: 'Oefen Engelse werkwoordstijden (tenses)',
        url: 'english_verbs/',
        icon: 'fa-flag-usa',
        tags: ['engels', 'english', 'grammar', 'verbs', 'tenses', 'werkwoorden', 'present simple', 'past simple', 'present perfect', 'continuous']
    },
    {
        title: 'Engels Woorden Leren',
        description: 'Leer Engelse woorden met flashcards en spelling',
        url: 'english_words/',
        icon: 'fa-flag-usa',
        tags: ['engels', 'english', 'woorden', 'words', 'vocabulary', 'woordenschat', 'flashcards', 'spelling']
    },
    {
        title: 'Latijn Oefenen',
        description: 'Latijnse grammatica: werkwoorden, naamwoorden, voornaamwoorden',
        url: 'la/',
        icon: 'fa-book-open',
        tags: ['latijn', 'latin', 'grammatica', 'werkwoorden', 'naamwoorden', 'vervoegen']
    },
    {
        title: 'Latijn - Betrekkelijk Voornaamwoord',
        description: 'Oefen Latijnse betrekkelijke voornaamwoorden',
        url: 'la/betr_vnw/',
        icon: 'fa-book-open',
        tags: ['latijn', 'voornaamwoord', 'betrekkelijk', 'relative pronoun', 'grammatica']
    },
    {
        title: 'Latijn - Werkwoorden Oefenen',
        description: 'Oefen Latijnse werkwoorden en vervoegingen',
        url: 'la/ww/',
        icon: 'fa-book-open',
        tags: ['latijn', 'werkwoorden', 'vervoegen', 'conjugation', 'verbs']
    },
    {
        title: 'Latijn - Stamtijden Oefenen',
        description: 'Oefen Latijnse stamtijden',
        url: 'la/stamtijden/',
        icon: 'fa-book-open',
        tags: ['latijn', 'stamtijden', 'stem forms', 'werkwoorden']
    },
    {
        title: 'Latijn - Onregelmatige Werkwoorden',
        description: 'Oefen Latijnse onregelmatige werkwoorden',
        url: 'la/onregelmatige_ww/',
        icon: 'fa-book-open',
        tags: ['latijn', 'onregelmatig', 'irregular', 'werkwoorden']
    },
    {
        title: 'Latijn - Woorden Oefenen',
        description: 'Oefen Latijnse woordenschat',
        url: 'la/words/',
        icon: 'fa-book-open',
        tags: ['latijn', 'woorden', 'woordenschat', 'vocabulary']
    },
    {
        title: 'Latijn - Zelfstandig Naamwoord',
        description: 'Oefen Latijnse zelfstandige naamwoorden en verbuigingen',
        url: 'la/zn/',
        icon: 'fa-book-open',
        tags: ['latijn', 'zelfstandig naamwoord', 'naamwoord', 'noun', 'declension', 'verbuiging']
    }
];

function searchSubsites(query) {
    const q = query.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 0);

    return subsiteRegistry.filter(site => {
        const searchText = (site.title + ' ' + site.description + ' ' + site.tags.join(' ')).toLowerCase();
        return words.every(word => searchText.includes(word));
    });
}

function searchLocalLists(query) {
    const q = query.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 0);

    return wordLists.filter(list => {
        const searchText = [
            list.title,
            list.langFrom,
            list.langTo,
            list.subject,
            ...(list.words || []).map(w => w.term + ' ' + w.definition)
        ].join(' ').toLowerCase();
        return words.every(word => searchText.includes(word));
    });
}

async function performSearch() {
    const mobileOverlay = document.getElementById('mobile-search-overlay');
    const mobileInput = document.getElementById('mobile-public-search-input');
    const desktopInput = document.getElementById('public-search-input');

    const isMobileOpen = mobileOverlay && !mobileOverlay.classList.contains('hidden');
    const input = isMobileOpen ? (mobileInput || desktopInput) : (desktopInput || mobileInput);
    const results = isMobileOpen ? document.getElementById('mobile-public-search-results') : document.getElementById('public-search-results');
    if (!input || !results) return;

    const query = (input.value || '').trim();
    if (!query) {
        results.innerHTML = '';
        results.classList.add('hidden');
        return;
    }

    let html = '';

    // Search subsites
    const subsiteResults = searchSubsites(query);
    if (subsiteResults.length > 0) {
        html += subsiteResults.map(site => `
            <div class="public-list-card subsite-card">
                <div class="public-list-info">
                    <div class="public-list-title"><i class="fas ${site.icon}" style="color:var(--primary-yellow-dark);margin-right:0.4rem;"></i>${escapeHtml(site.title)}</div>
                    <div class="public-list-meta">${escapeHtml(site.description)}</div>
                </div>
                <a href="${site.url}" class="btn btn-primary subsite-link">
                    <i class="fas fa-external-link-alt"></i> Openen
                </a>
            </div>
        `).join('');
    }

    // Search local lists
    const localResults = searchLocalLists(query);
    if (localResults.length > 0) {
        html += localResults.map(list => `
            <div class="public-list-card">
                <div class="public-list-info">
                    <div class="public-list-title"><i class="fas ${list.icon || 'fa-book'}" style="color:var(--primary-yellow-dark);margin-right:0.4rem;"></i>${escapeHtml(list.title)}</div>
                    <div class="public-list-meta">${escapeHtml(list.langFrom || '')} → ${escapeHtml(list.langTo || '')} • ${list.words?.length || 0} woordjes</div>
                </div>
                <button class="btn btn-primary" onclick="showListDetail('${list.id}')">
                    <i class="fas fa-play"></i> Oefenen
                </button>
            </div>
        `).join('');
    }

    // Search cloud lists if enabled
    if (isCloudEnabled() && supabaseClient) {
        try {
            const { data, error } = await supabaseClient
                .from('word_lists')
                .select('id,title,lang_from,lang_to,subject,icon,words,user_id')
                .eq('is_public', true)
                .or(`title.ilike.%${query}%,search_text.ilike.%${query}%`)
                .order('updated_at', { ascending: false })
                .limit(20);

            if (!error && data && data.length > 0) {
                html += data.map(list => `
                    <div class="public-list-card">
                        <div class="public-list-info">
                            <div class="public-list-title"><i class="fas fa-cloud" style="color:var(--primary-yellow-dark);margin-right:0.4rem;"></i>${escapeHtml(list.title)}</div>
                            <div class="public-list-meta">${escapeHtml(list.lang_from)} → ${escapeHtml(list.lang_to)} • ${list.words?.length || 0} woordjes</div>
                        </div>
                        <button class="btn btn-primary" onclick="importPublicList('${list.id}')">
                            <i class="fas fa-download"></i> Importeren
                        </button>
                    </div>
                `).join('');
            }
        } catch (e) {
            // Cloud search failed, that's fine
        }
    }

    if (!html) {
        results.innerHTML = '<p class="public-search-empty">Geen resultaten gevonden.</p>';
    } else {
        results.innerHTML = html;
    }
    results.classList.remove('hidden');
}

// Mobile search open/close helpers
function openMobileSearch() {
    const overlay = document.getElementById('mobile-search-overlay');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    const mobileInput = document.getElementById('mobile-public-search-input');
    const desktopInput = document.getElementById('public-search-input');
    if (mobileInput && desktopInput) mobileInput.value = desktopInput.value || '';
    setTimeout(() => {
        const focusInput = document.getElementById('mobile-public-search-input');
        if (focusInput) focusInput.focus();
    }, 50);
    // mark mobile nav search button active
    const navBtn = document.getElementById('mobile-nav-search-btn');
    if (navBtn) navBtn.classList.add('active');
}

function closeMobileSearch() {
    const overlay = document.getElementById('mobile-search-overlay');
    if (!overlay) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
    const mobileResults = document.getElementById('mobile-public-search-results');
    if (mobileResults) {
        mobileResults.innerHTML = '';
        mobileResults.classList.add('hidden');
    }
    // remove active state from mobile nav search button
    const navBtn = document.getElementById('mobile-nav-search-btn');
    if (navBtn) navBtn.classList.remove('active');
}

async function importPublicList(listId) {
    if (!isCloudEnabled()) return;
    if (!supabaseClient) return;
    const { data, error } = await supabaseClient
        .from('word_lists')
        .select('*')
        .eq('id', listId)
        .single();

    if (error || !data) return;

    // Check if list already exists locally (by title and words to catch duplicates)
    const existingList = wordLists.find(list =>
        list.title === data.title &&
        list.langFrom === data.lang_from &&
        list.langTo === data.lang_to &&
        list.words.length === (data.words || []).length
    );

    if (existingList) {
        // List already exists, just show it
        showListDetail(existingList.id);
        return;
    }

    const newList = {
        id: generateId(),
        title: data.title,
        langFrom: data.lang_from,
        langTo: data.lang_to,
        subject: data.subject,
        icon: data.icon,
        words: data.words || [],
        isPublic: false,
        createdAt: new Date().toISOString()
    };

    wordLists.push(newList);

    let openListId = newList.id;
    if (authUser) {
        const saved = await saveListToRemote(newList.id);
        if (saved && saved[0]?.id) openListId = saved[0].id;
        await loadRemoteLists();
    } else {
        saveData();
        renderWordLists();
    }

    showListDetail(openListId);
}

// ===== Study Mode Settings =====
function startStudyMode(mode, options = {}) {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list || list.words.length === 0) return;

    currentStudyMode = mode;
    studySession.emergencyMode = !!options.emergencyMode;
    studySession.emergencyWordIds = Array.isArray(options.emergencyWordIds) ? options.emergencyWordIds : [];

    if (mode === 'connect') {
        studySession.selectedWordIds = getSelectedWordIdsForStudy();
        initConnectMode();
        return;
    }

    // Show settings block only for modes that use answer-input settings
    const typingSettings = document.getElementById('typing-settings');
    const usesTyping = mode === 'steps' || mode === 'typing' || mode === 'exam';
    typingSettings.classList.toggle('hidden', !usesTyping);

    const learnStagesSettings = document.getElementById('learn-stages-settings');
    if (learnStagesSettings) {
        learnStagesSettings.classList.toggle('hidden', mode !== 'steps');
    }

    const emergencyHint = document.getElementById('emergency-hint');
    if (emergencyHint) {
        emergencyHint.classList.toggle('hidden', !studySession.emergencyMode);
    }

    document.getElementById('settings-modal').classList.remove('hidden');
}

function closeSettingsModal() {
    document.getElementById('settings-modal').classList.add('hidden');
}

// Direction button handlers
document.querySelectorAll('.direction-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.direction-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

function confirmStartStudy() {
    const direction = document.querySelector('.direction-btn.active').dataset.direction;
    const acceptSlash = document.getElementById('accept-slash-answers').checked;
    const ignoreParentheses = document.getElementById('ignore-parentheses').checked;
    const selectedWordIds = studySession.emergencyMode && studySession.emergencyWordIds?.length
        ? [...studySession.emergencyWordIds]
        : getSelectedWordIdsForStudy();
    const hintsEnabled = true;
    const allowMinorTypos = !!document.getElementById('allow-minor-typos')?.checked;
    const caseSensitiveAnswers = !!document.getElementById('case-sensitive-answers')?.checked;
    const strictDiacritics = !!document.getElementById('strict-diacritics')?.checked;
    const learnStages = currentStudyMode === 'steps'
        ? getEnabledLearnStages()
        : ['typing'];

    if (currentStudyMode === 'steps' && learnStages.length === 0) {
        alert('Kies minimaal 1 onderdeel voor Leren-modus.');
        return;
    }

    studySession = {
        ...studySession,
        direction,
        acceptSlash,
        ignoreParentheses,
        hintsEnabled,
        allowMinorTypos,
        caseSensitiveAnswers,
        strictDiacritics,
        learnStages,
        startedAt: Date.now(),
        correctCount: 0,
        wrongCount: 0,
        sessionResults: {},
        selectedWordIds,
        hintUsageByWord: {},
        hintPenalizedWords: [],
        hintPenalty: 0,
        pendingAnswers: [],
        stepsWrongWords: [],
        stepsReviewMode: false,
        stepsReviewQueue: [],
        stepsReviewIndex: 0
    };

    // Update lastStudied timestamp when starting practice
    if (currentListId) {
        const list = wordLists.find(l => l.id === currentListId);
        if (list) {
            list.lastStudied = Date.now();
            saveData();
        }
    }

    closeSettingsModal();

    switch (currentStudyMode) {
        case 'steps':
            initStepsMode();
            break;
        case 'typing':
            initTypingMode();
            break;
        case 'cards':
            initCardsMode();
            break;
        case 'exam':
            initExamMode();
            break;
        case 'connect':
            initConnectMode();
            break;
    }

    clearActiveSession();
}

// ===== Answer Checking =====
function normalizeAnswer(answer, acceptSlash, ignoreParentheses) {
    let normalized = (answer || '').trim();

    if (!studySession.caseSensitiveAnswers) {
        normalized = normalized.toLowerCase();
    }

    if (!studySession.strictDiacritics) {
        normalized = stripDiacriticsAndLooseMarks(normalized);
    } else {
        normalized = normalizeQuoteMarks(normalized);
    }
    
    if (ignoreParentheses) {
        normalized = normalized.replace(/\([^)]*\)/g, '').trim();
    }
    
    return normalized;
}

function checkAnswer(userAnswer, correctAnswer) {
    const { acceptSlash, ignoreParentheses } = studySession;
    
    const normalizedUser = normalizeAnswer(userAnswer, acceptSlash, ignoreParentheses);
    let normalizedCorrect = normalizeAnswer(correctAnswer, acceptSlash, ignoreParentheses);
    
    // Direct match
    if (normalizedUser === normalizedCorrect) return true;

    // Accept optional sb/sth tokens in correct answers
    if (containsOptionalTokens(correctAnswer)) {
        const strippedUser = stripOptionalTokens(userAnswer, ignoreParentheses);
        const strippedCorrect = stripOptionalTokens(correctAnswer, ignoreParentheses);
        if (strippedUser === strippedCorrect) return true;
    }
    
    // Check slash alternatives
    if (acceptSlash && correctAnswer.includes('/')) {
        const alternatives = correctAnswer.split('/').map(a => 
            normalizeAnswer(a.trim(), false, ignoreParentheses)
        );
        if (alternatives.includes(normalizedUser)) return true;
    }

    if (studySession.allowMinorTypos && isMinorTypoMatch(userAnswer, correctAnswer)) {
        return true;
    }
    
    return false;
}

function getSubjectForCurrentList() {
    const list = wordLists.find(l => l.id === currentListId);
    return (list?.subject || '').toLowerCase().trim();
}

function isWordPracticed(word) {
    const stats = word?.stats || { correct: 0, wrong: 0 };
    return (stats.correct + stats.wrong) > 0;
}

function findRelatedWordHint(userAnswer, correctAnswer, currentWordId) {
    const subject = getSubjectForCurrentList();
    if (!subject) return null;

    const normalizedUser = normalizeAnswer(userAnswer, false, studySession.ignoreParentheses);
    if (!normalizedUser) return null;

    const normalizedCorrect = normalizeAnswer(correctAnswer, false, studySession.ignoreParentheses);

    for (const list of wordLists) {
        if ((list.subject || '').toLowerCase().trim() !== subject) continue;
        for (const word of (list.words || [])) {
            if (!isWordPracticed(word)) continue;
            if (currentWordId && word.id === currentWordId) continue;

            const termNorm = normalizeAnswer(word.term || '', false, studySession.ignoreParentheses);
            const defNorm = normalizeAnswer(word.definition || '', false, studySession.ignoreParentheses);

            if (termNorm && termNorm === normalizedUser && termNorm !== normalizedCorrect) {
                return { matched: word.term, counterpart: word.definition };
            }

            if (defNorm && defNorm === normalizedUser && defNorm !== normalizedCorrect) {
                return { matched: word.definition, counterpart: word.term };
            }
        }
    }

    return null;
}

function buildRelatedWordHint(userAnswer, correctAnswer, currentWordId) {
    const match = findRelatedWordHint(userAnswer, correctAnswer, currentWordId);
    if (!match) return '';
    return `
        <div class="other-word-hint">
            <i class="fas fa-lightbulb"></i>
            <span><strong>${escapeHtml(match.matched)}</strong> is het woord voor <strong>${escapeHtml(match.counterpart)}</strong>.</span>
        </div>
    `;
}

function containsOptionalTokens(answer) {
    return /\b(sb|sth)\b/i.test(answer);
}

function stripOptionalTokens(answer, ignoreParentheses) {
    let normalized = normalizeAnswer(answer, false, ignoreParentheses);
    normalized = normalized.replace(/\b(sb|sth)\b/gi, '');
    normalized = normalized.replace(/\s*\/\s*/g, ' ');
    normalized = normalized.replace(/\s+/g, ' ').trim();
    return normalized;
}

function getQuestion(word) {
    const { direction } = studySession;
    
    if (direction === 'mixed') {
        return Math.random() < 0.5 
            ? { question: word.term, answer: word.definition, isTermToDef: true }
            : { question: word.definition, answer: word.term, isTermToDef: false };
    }
    
    return direction === 'term-def'
        ? { question: word.term, answer: word.definition, isTermToDef: true }
        : { question: word.definition, answer: word.term, isTermToDef: false };
}

function buildHintText(correctAnswer, level) {
    const answer = (correctAnswer || '').trim();
    if (!answer) return 'Geen hint beschikbaar.';

    if (level === 1) {
        const firstChar = Array.from(answer).find(ch => /[\p{L}\p{N}]/u.test(ch)) || answer[0];
        return `Hint 1: Eerste letter: ${firstChar}`;
    }

    if (level === 2) {
        const dotted = Array.from(answer).map(ch => /\s/.test(ch) ? ' ' : '•').join('');
        return `Hint 2: Lengte: ${dotted}`;
    }

    const vowels = /[aeiouyáàâäãåéèêëíìîïóòôöõúùûü]/i;
    const masked = Array.from(answer)
        .map(ch => {
            if (/\s/.test(ch)) return ' ';
            return vowels.test(ch) ? ch : '_';
        })
        .join('');
    return `Hint 3: Klinkers: ${masked}`;
}

function renderHintButton(wordId, correctAnswer, hintContainerId) {
    return '';
}

function requestHint(wordId, correctAnswer, hintContainerId) {
    return;
}

function startGhostTimer() {
    return;
}

function stopGhostTimer() {
    return;
}

function finalizeGhostRecord() {
    return null;
}

function renderExamSummary() {
    if (!isExamModeActive()) return '';
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return '';

    const wordsById = (list.words || []).reduce((acc, w) => {
        acc[w.id] = w;
        return acc;
    }, {});

    const wrongAnswers = (studySession.pendingAnswers || []).filter(item => !item.isCorrect);
    const rows = wrongAnswers.map(item => {
        const word = wordsById[item.wordId];
        const left = word ? escapeHtml(word.term) : '-';
        const right = word ? escapeHtml(word.definition) : '-';
        return `
            <div class="summary-row wrong">
                <span class="summary-term">${left}</span>
                <span class="summary-def">${right}</span>
                <span class="summary-stats">Jij: ${escapeHtml(item.userAnswer || '(leeg)')} • Juist: ${escapeHtml(item.correctAnswer || '-')}</span>
            </div>
        `;
    }).join('');

    if (!rows) {
        return '<p class="summary-empty">Perfect: geen fouten gemaakt in de toets.</p>';
    }

    return `
        <h4>Jouw fouten (${wrongAnswers.length})</h4>
        ${rows}
    `;
}

function normalizeForSimilarity(text) {
    return (text || '')
        .toString()
        .toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function levenshteinDistance(a, b) {
    const s = normalizeForSimilarity(a);
    const t = normalizeForSimilarity(b);
    if (s === t) return 0;
    if (!s.length) return t.length;
    if (!t.length) return s.length;

    const m = s.length;
    const n = t.length;
    const dp = new Array(n + 1);
    for (let j = 0; j <= n; j++) dp[j] = j;

    for (let i = 1; i <= m; i++) {
        let prev = dp[0];
        dp[0] = i;
        const si = s.charCodeAt(i - 1);
        for (let j = 1; j <= n; j++) {
            const tmp = dp[j];
            const cost = si === t.charCodeAt(j - 1) ? 0 : 1;
            dp[j] = Math.min(
                dp[j] + 1,
                dp[j - 1] + 1,
                prev + cost
            );
            prev = tmp;
        }
    }

    return dp[n];
}

function similarityScore(a, b) {
    const s = normalizeForSimilarity(a);
    const t = normalizeForSimilarity(b);
    const maxLen = Math.max(s.length, t.length);
    if (maxLen === 0) return 1;
    const dist = levenshteinDistance(s, t);
    return 1 - (dist / maxLen);
}

function pickSimilarWrongOptions(correctAnswer, candidates, count) {
    const correctNorm = normalizeForSimilarity(correctAnswer);
    const unique = [];
    const seen = new Set();

    candidates.forEach(c => {
        const value = (c || '').toString();
        const norm = normalizeForSimilarity(value);
        if (!norm) return;
        if (norm === correctNorm) return;
        if (seen.has(norm)) return;
        seen.add(norm);
        unique.push({ value, score: similarityScore(value, correctAnswer) });
    });

    unique.sort((a, b) => b.score - a.score);
    const top = unique.slice(0, Math.max(10, count));
    const picked = top.slice(0, count).map(x => x.value);

    if (picked.length < count) {
        const rest = unique.slice(top.length);
        while (picked.length < count && rest.length > 0) {
            picked.push(rest.shift().value);
        }
    }

    return picked.slice(0, count);
}

// ===== STEPS MODE (STAMPEN) =====
function initStepsMode() {
    const list = wordLists.find(l => l.id === currentListId);

    const selectedWords = getStudyWordsFromSelection(list.words);
    if (!selectedWords.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }
    studySession.words = shuffleArray([...selectedWords]);
    studySession.learnedWords = [];
    studySession.activeSlots = [];
    studySession.nextWordIndex = 0;
    studySession.slotIndex = 0;
    studySession.roundVisits = 0;
    studySession.currentWordId = null;
    studySession.wordProgress = {};
    studySession.stepsWrongWords = [];
    studySession.stepsReviewMode = false;
    studySession.stepsReviewQueue = [];
    studySession.stepsReviewIndex = 0;

    studySession.words.forEach(word => {
        studySession.wordProgress[word.id] = {
            phase: getFirstLearnStage(),
            done: false,
            typingRemaining: 1,
            typingCooldown: 0
        };
    });

    fillActiveSlots();

    showView('study-steps-view');
    updateStepsProgress();
    showNextStepQuestion();
}

function getFirstLearnStage() {
    const stages = studySession.learnStages || [];
    return stages.length ? stages[0] : 'typing';
}

function getNextLearnStage(currentPhase) {
    const stages = studySession.learnStages || ['typing'];
    const index = stages.indexOf(currentPhase);
    if (index === -1) return null;
    return stages[index + 1] || null;
}

function advanceLearnPhase(wordId) {
    const progress = studySession.wordProgress[wordId];
    if (!progress) return;
    const nextPhase = getNextLearnStage(progress.phase);
    if (!nextPhase) {
        markWordLearned(wordId);
        return;
    }
    progress.phase = nextPhase;
    if (nextPhase === 'typing') {
        progress.typingRemaining = 1;
    }
}

function fillActiveSlots() {
    while (studySession.activeSlots.length < 4 && studySession.nextWordIndex < studySession.words.length) {
        const nextWord = studySession.words[studySession.nextWordIndex];
        studySession.activeSlots.push(nextWord.id);
        studySession.nextWordIndex++;
    }
}

function replaceCompletedSlots() {
    const remaining = studySession.activeSlots.filter(wordId =>
        wordId && !studySession.wordProgress[wordId].done
    );
    studySession.activeSlots = remaining;
    fillActiveSlots();
    studySession.slotIndex = 0;
    studySession.roundVisits = 0;
}

function updateStepsProgress() {
    const baseTotal = studySession.words.length;
    const reviewTotal = new Set(studySession.stepsWrongWords || []).size;
    const total = baseTotal + (reviewTotal > 0 ? reviewTotal : 0);

    const learned = studySession.learnedWords.length;
    const reviewDone = studySession.stepsReviewMode ? (studySession.stepsReviewCorrectIds || []).length : 0;
    const done = Math.min(total, learned + reviewDone);
    const percent = total > 0 ? (done / total) * 100 : 0;

    document.getElementById('steps-progress').style.width = `${percent}%`;
    document.getElementById('steps-progress-text').textContent = `${done}/${total}`;
}

function showNextStepQuestion() {
    if (studySession.stepsReviewMode) {
        showNextStepsReviewQuestion();
        return;
    }

    if (studySession.learnedWords.length === studySession.words.length) {
        if (studySession.stepsWrongWords.length > 0) {
            startStepsReviewTyping();
            return;
        }
        showComplete();
        return;
    }

    reduceStepsCooldowns();

    if (studySession.activeSlots.length === 0) {
        fillActiveSlots();
    }

    if (studySession.roundVisits >= studySession.activeSlots.length) {
        replaceCompletedSlots();
    }

    const wordId = getNextActiveWordId();
    if (!wordId) {
        replaceCompletedSlots();
        const retryWordId = getNextActiveWordId();
        if (!retryWordId) {
            setTimeout(() => showNextStepQuestion(), 200);
            return;
        }
        return showNextStepQuestion();
    }

    const word = studySession.words.find(w => w.id === wordId);
    if (!word) {
        showNextStepQuestion();
        return;
    }

    const progress = studySession.wordProgress[wordId];
    const qa = getQuestion(word);
    studySession.currentWordId = wordId;

    if (progress.phase === 'flash') {
        showStepFlash(word, qa);
        return;
    }

    if (progress.phase === 'choice') {
        showStepChoice(word, qa);
        return;
    }

    if (progress.phase === 'copy') {
        showStepCopy(word, qa);
        return;
    }

    if (progress.phase === 'hint') {
        showStepHint(word, qa);
        return;
    }

    if (progress.phase === 'typing') {
        showStepTyping(word, qa);
    }
}

function getNextActiveWordId() {
    const totalSlots = studySession.activeSlots.length;
    if (totalSlots === 0) return null;

    let tries = 0;
    while (tries < totalSlots) {
        const idx = studySession.slotIndex % totalSlots;
        const wordId = studySession.activeSlots[idx];
        studySession.slotIndex = (idx + 1) % totalSlots;
        studySession.roundVisits++;
        tries++;

        if (wordId && !studySession.wordProgress[wordId].done) {
            const progress = studySession.wordProgress[wordId];
            if (progress.phase === 'typing' && progress.typingCooldown > 0) {
                continue;
            }
            return wordId;
        }
    }

    // If all active typing words are on cooldown, allow next available word
    for (let i = 0; i < totalSlots; i++) {
        const wordId = studySession.activeSlots[i];
        if (wordId && !studySession.wordProgress[wordId].done) {
            return wordId;
        }
    }

    return null;
}

function reduceStepsCooldowns() {
    Object.values(studySession.wordProgress).forEach(progress => {
        if (progress.typingCooldown > 0) {
            progress.typingCooldown--;
        }
    });
}

function showStepFlash(word, qa) {
    const content = document.getElementById('steps-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="flip-hint">Klik op de kaart om het antwoord te zien</div>
            <div class="flip-card" id="step-flash-card" onclick="flipStepFlash()">
                <div class="flip-card-inner" id="step-flash-inner">
                    <div class="flip-card-front">
                        <p>${escapeHtml(qa.question)}</p>
                    </div>
                    <div class="flip-card-back">
                        <p>${escapeHtml(qa.answer)}</p>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary" id="step-flash-next" onclick="continueStepFlash('${word.id}')" style="display: none;">
                <i class="fas fa-arrow-right"></i> Volgende
            </button>
        </div>
    `;
}

function flipStepFlash() {
    const card = document.getElementById('step-flash-card');
    const nextBtn = document.getElementById('step-flash-next');
    if (card) {
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped') && nextBtn) {
            nextBtn.style.display = 'block';
        }
    }
}

function continueStepFlash(wordId) {
    advanceLearnPhase(wordId);
    showNextStepQuestion();
}

function showStepCopy(word, qa) {
    const content = document.getElementById('steps-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-pencil-alt"></i> Overtypen
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <p class="setting-hint">Voorbeeld: ${escapeHtml(qa.answer)}</p>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-copy-input"
                       placeholder="Typ exact over..." autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepCopy('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="step-copy-submit" onclick="checkStepCopy('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
            <div id="step-copy-feedback"></div>
        </div>
    `;
    setTimeout(() => document.getElementById('step-copy-input')?.focus(), 100);
}

function checkStepCopy(wordId, correct) {
    const input = document.getElementById('step-copy-input');
    const feedback = document.getElementById('step-copy-feedback');
    const submitBtn = document.getElementById('step-copy-submit');
    if (!input || !feedback) return;

    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    input.classList.remove('correct', 'wrong');
    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        input.classList.add('correct');
        studySession.correctCount++;
        playCorrectSound();
        advanceLearnPhase(wordId);
        feedback.innerHTML = `
            <div class="feedback-message correct"><i class="fas fa-check-circle"></i> Goed overgetypt!</div>
            <button class="btn btn-primary btn-next" onclick="showNextStepQuestion()"><i class="fas fa-arrow-right"></i> Volgende vraag</button>
        `;
    } else {
        input.classList.add('wrong');
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        const diff = buildTypingDiff(userAnswer, correct);
        feedback.innerHTML = `
            <div class="feedback-message wrong"><i class="fas fa-times-circle"></i> Nog niet goed, probeer opnieuw.</div>
            ${diff}
            <button class="btn btn-primary btn-next" onclick="showNextStepQuestion()"><i class="fas fa-arrow-right"></i> Volgende vraag</button>
        `;
    }

    input.disabled = true;
    if (submitBtn) submitBtn.classList.add('hidden');
    saveActiveSession();
}

function showStepHint(word, qa) {
    const content = document.getElementById('steps-content');
    const hintPattern = buildHintPattern(qa.answer);
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-lightbulb"></i> Hint-modus
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <p class="setting-hint">Hint: ${escapeHtml(hintPattern)}</p>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-hint-input"
                       placeholder="Typ het volledige antwoord..." autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepHint('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="step-hint-submit" onclick="checkStepHint('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
            <div id="step-hint-feedback"></div>
        </div>
    `;
    setTimeout(() => document.getElementById('step-hint-input')?.focus(), 100);
}

function checkStepHint(wordId, correct) {
    const input = document.getElementById('step-hint-input');
    const feedback = document.getElementById('step-hint-feedback');
    const submitBtn = document.getElementById('step-hint-submit');
    if (!input || !feedback) return;

    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    input.classList.remove('correct', 'wrong');
    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        input.classList.add('correct');
        studySession.correctCount++;
        playCorrectSound();
        advanceLearnPhase(wordId);
        feedback.innerHTML = `
            <div class="feedback-message correct"><i class="fas fa-check-circle"></i> Top!</div>
            <button class="btn btn-primary btn-next" onclick="showNextStepQuestion()"><i class="fas fa-arrow-right"></i> Volgende vraag</button>
        `;
    } else {
        input.classList.add('wrong');
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        const diff = buildTypingDiff(userAnswer, correct);
        feedback.innerHTML = `
            <div class="feedback-message wrong"><i class="fas fa-times-circle"></i> Fout.</div>
            ${diff}
            <button class="btn btn-primary btn-next" onclick="showNextStepQuestion()"><i class="fas fa-arrow-right"></i> Volgende vraag</button>
        `;
    }

    input.disabled = true;
    if (submitBtn) submitBtn.classList.add('hidden');
    saveActiveSession();
}

function showStepChoice(word, qa) {
    const list = wordLists.find(l => l.id === currentListId);
    const otherWords = list.words.filter(w => w.id !== word.id);
    const candidateStrings = otherWords.map(w => (qa.isTermToDef ? w.definition : w.term));
    const wrongOptions = pickSimilarWrongOptions(qa.answer, candidateStrings, 3);
    const options = shuffleArray([qa.answer, ...wrongOptions]);

    const content = document.getElementById('steps-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-list-ul"></i> Meerkeuze
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="choice-options">
                ${options.map((opt) => `
                    <button class="choice-btn" onclick="checkStepChoice('${word.id}', this, '${escapeHtml(opt).replace(/'/g, "\\'")}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                        ${escapeHtml(opt)}
                    </button>
                `).join('')}
            </div>
            <div id="step-choice-feedback"></div>
        </div>
    `;
}

function checkStepChoice(wordId, btn, selected, correct) {
    const isCorrect = checkAnswer(selected, correct);
    const buttons = document.querySelectorAll('.choice-btn');
    const feedback = document.getElementById('step-choice-feedback');
    const examMode = isExamModeActive();

    buttons.forEach(b => {
        b.disabled = true;
        if (!examMode && checkAnswer(b.textContent.trim(), correct)) {
            b.classList.add('correct');
        }
    });

    pushPendingAnswer(wordId, selected, correct, isCorrect);

    if (isCorrect) {
        if (!examMode) {
            btn.classList.add('correct');
        }
        studySession.correctCount++;
        if (!examMode) {
            playCorrectSound();
        }
        advanceLearnPhase(wordId);
        if (feedback) {
            feedback.innerHTML = examMode
                ? `
                <button class="btn btn-primary btn-next" onclick="continueStepChoice()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            `
                : `
                <div class="feedback-msg correct">
                    <i class="fas fa-check-circle"></i> Goed zo!
                </div>
            `;
        }
    } else {
        if (!examMode) {
            btn.classList.add('wrong');
        }
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        if (feedback) {
            feedback.innerHTML = `
                <button class="btn btn-primary btn-next" onclick="continueStepChoice()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            `;
        }
    }

    recordAnswer(wordId, isCorrect);
    saveActiveSession();

    if (isCorrect && !examMode) {
        setTimeout(() => showNextStepQuestion(), 900);
    }
}

function continueStepChoice() {
    showNextStepQuestion();
}

function showStepTyping(word, qa) {
    const content = document.getElementById('steps-content');
    const hintUi = renderHintButton(word.id, qa.answer, 'step-typing-hint');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-keyboard"></i> Typen
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-typing-input"
                       placeholder="Type je antwoord..." autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="step-typing-submit" onclick="checkStepTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
            ${hintUi}
            <div id="step-typing-feedback"></div>
        </div>
    `;

    setTimeout(() => document.getElementById('step-typing-input').focus(), 100);
}

function checkStepTyping(wordId, correct) {
    const input = document.getElementById('step-typing-input');
    const feedback = document.getElementById('step-typing-feedback');
    const submitBtn = document.getElementById('step-typing-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const progress = studySession.wordProgress[wordId];
    const examMode = isExamModeActive();

    input.classList.remove('correct', 'wrong');
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);

    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        if (!examMode) {
            input.classList.add('correct');
        }
        studySession.correctCount++;
        if (!examMode) {
            playCorrectSound();
        }
        if (progress.typingRemaining > 0) {
            progress.typingRemaining--;
        }

        if (progress.typingRemaining === 0) {
            advanceLearnPhase(wordId);
            updateStepsProgress();
            feedback.innerHTML = examMode ? `
                <div class="feedback-message">
                    <i class="fas fa-check"></i> Antwoord opgeslagen.
                </div>
                <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            ` : `
                <div class="feedback-message correct">
                    <i class="fas fa-check-circle"></i> Goed!
                </div>
                <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            `;
            input.disabled = true;
            if (submitBtn) {
                submitBtn.classList.add('hidden');
            }
            saveActiveSession();
            return;
        }

        progress.typingCooldown = Math.max(progress.typingCooldown, 3);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> Antwoord opgeslagen.
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        ` : `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed! Nog ${progress.typingRemaining}x
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        `;
        input.value = '';
        input.disabled = true;
        if (submitBtn) {
            submitBtn.classList.add('hidden');
        }
        saveActiveSession();
        return;
    } else {
        if (!examMode) {
            input.classList.add('wrong');
        }
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        progress.typingRemaining = 2;
        progress.typingCooldown = Math.max(progress.typingCooldown, 3);
        const diff = buildTypingDiff(userAnswer, correct);
        const relatedHint = buildRelatedWordHint(userAnswer, correct, wordId);
        if (feedback) {
            feedback.innerHTML = examMode ? `
                <div class="feedback-message">
                    <i class="fas fa-check"></i> Antwoord opgeslagen.
                </div>
                <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            ` : `
                <div class="feedback-message wrong">
                    <i class="fas fa-times-circle"></i> Fout.
                </div>
                ${diff}
                ${relatedHint}
                <div class="feedback-actions">
                    <button class="btn btn-secondary btn-intended" onclick="acceptIntendedStepTyping('${wordId}')">
                        <i class="fas fa-check"></i> Ik bedoelde dit
                    </button>
                    <button class="btn btn-primary btn-next" onclick="continueStepTyping()">
                        <i class="fas fa-arrow-right"></i> Volgende vraag
                    </button>
                </div>
            `;
        }
        input.disabled = true;
        if (submitBtn) {
            submitBtn.classList.add('hidden');
        }
        saveActiveSession();
    }
}

function continueStepTyping() {
    showNextStepQuestion();
}

function markWordLearned(wordId) {
    if (!studySession.learnedWords.includes(wordId)) {
        studySession.learnedWords.push(wordId);
    }
    if (studySession.wordProgress[wordId]) {
        studySession.wordProgress[wordId].phase = 'done';
        studySession.wordProgress[wordId].done = true;
    }
}

function startStepsReviewTyping() {
    studySession.stepsReviewMode = true;
    studySession.stepsReviewQueue = shuffleArray([...new Set(studySession.stepsWrongWords)]);
    studySession.stepsReviewIndex = 0;
    studySession.stepsReviewCorrectIds = [];
    studySession.stepsReviewUniqueCount = studySession.stepsReviewQueue.length;
    updateStepsProgress();
    showNextStepsReviewQuestion();
}

function showNextStepsReviewQuestion() {
    const correctIds = studySession.stepsReviewCorrectIds || [];
    const uniqueCount = studySession.stepsReviewUniqueCount || new Set(studySession.stepsWrongWords).size;

    if (correctIds.length >= uniqueCount) {
        showComplete();
        return;
    }

    if (studySession.stepsReviewIndex >= studySession.stepsReviewQueue.length) {
        showComplete();
        return;
    }

    const wordId = studySession.stepsReviewQueue[studySession.stepsReviewIndex];
    const word = studySession.words.find(w => w.id === wordId);
    if (!word) {
        studySession.stepsReviewIndex++;
        showNextStepsReviewQuestion();
        return;
    }

    const qa = getQuestion(word);
    const content = document.getElementById('steps-content');
    const hintUi = renderHintButton(word.id, qa.answer, 'step-review-hint');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-repeat"></i> Herhaling (foute woorden)
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-review-input"
                       placeholder="Type je antwoord..." autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepReviewTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="step-review-submit" onclick="checkStepReviewTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
            ${hintUi}
            <div id="step-review-feedback"></div>
        </div>
    `;

    setTimeout(() => document.getElementById('step-review-input').focus(), 100);
}

function checkStepReviewTyping(wordId, correct) {
    const input = document.getElementById('step-review-input');
    const feedback = document.getElementById('step-review-feedback');
    const submitBtn = document.getElementById('step-review-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const examMode = isExamModeActive();

    input.classList.remove('correct', 'wrong');
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);

    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        if (!examMode) {
            input.classList.add('correct');
            playCorrectSound();
        }
        if (!studySession.stepsReviewCorrectIds) studySession.stepsReviewCorrectIds = [];
        if (!studySession.stepsReviewCorrectIds.includes(wordId)) {
            studySession.stepsReviewCorrectIds.push(wordId);
        }
        updateStepsProgress();
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> Antwoord opgeslagen.
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        ` : `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed!
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        `;
    } else {
        if (!examMode) {
            input.classList.add('wrong');
        }
        // Re-add to the end of the queue so it comes back
        studySession.stepsReviewQueue.push(wordId);
        const diff = buildTypingDiff(userAnswer, correct);
        const relatedHint = buildRelatedWordHint(userAnswer, correct, wordId);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> Antwoord opgeslagen.
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        ` : `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
            ${relatedHint}
            <div class="feedback-actions">
                <button class="btn btn-secondary btn-intended" onclick="acceptIntendedStepReview('${wordId}')">
                    <i class="fas fa-check"></i> Ik bedoelde dit
                </button>
                <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            </div>
        `;
    }

    input.disabled = true;
    if (submitBtn) {
        submitBtn.classList.add('hidden');
    }
    saveActiveSession();
}

function continueStepReviewTyping() {
    studySession.stepsReviewIndex++;
    updateStepsProgress();
    showNextStepsReviewQuestion();
}

// ===== TYPING MODE =====
function initTypingMode() {
    const list = wordLists.find(l => l.id === currentListId);

    const selectedWords = getStudyWordsFromSelection(list.words);
    if (!selectedWords.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }
    studySession.words = shuffleArray([...selectedWords]);
    studySession.currentIndex = 0;
    studySession.typingProgress = {};
    
    studySession.words.forEach(word => {
        studySession.typingProgress[word.id] = {
            correctInARow: 0,
            needsExtraCorrect: 0,
            completed: false,
            cooldown: 0
        };
    });
    studySession.typingWrongWords = [];
    studySession.typingReviewMode = false;
    studySession.typingReviewQueue = [];
    studySession.typingReviewIndex = 0;
    
    showView('study-typing-view');
    startGhostTimer();
    updateTypingProgress();
    showNextTypingQuestion();
}

function updateTypingProgress() {
    const baseTotal = studySession.words.length;
    const reviewTotal = new Set(studySession.typingWrongWords || []).size;
    const total = baseTotal + (reviewTotal > 0 ? reviewTotal : 0);

    const completed = Object.values(studySession.typingProgress).filter(p => p.completed).length;
    const reviewDone = studySession.typingReviewMode ? (studySession.typingReviewCorrectIds || []).length : 0;
    const done = Math.min(total, completed + reviewDone);
    const percent = total > 0 ? (done / total) * 100 : 0;

    document.getElementById('typing-progress').style.width = `${percent}%`;
    document.getElementById('typing-progress-text').textContent = `${done}/${total}`;
}

function showNextTypingQuestion() {
    if (studySession.typingReviewMode) {
        showNextTypingReviewQuestion();
        return;
    }
    let nextWord = getNextTypingWord();

    if (!nextWord) {
        reduceTypingCooldowns();
        nextWord = getNextTypingWord();
    }

    if (!nextWord) {
        if (studySession.typingWrongWords && studySession.typingWrongWords.length > 0) {
            startTypingReview();
            return;
        }
        showComplete();
        return;
    }
    
    reduceTypingCooldowns();
    const qa = getQuestion(nextWord);
    const progress = studySession.typingProgress[nextWord.id];
    const extraHint = progress.needsExtraCorrect > 0 
        ? `<p class="extra-hint">Nog ${progress.needsExtraCorrect}x goed typen</p>` 
        : '';
    const hintUi = renderHintButton(nextWord.id, qa.answer, 'typing-hint-box');
    
    const content = document.getElementById('typing-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-keyboard"></i> Typen
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            ${extraHint}
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="typing-input" 
                       placeholder="Type je antwoord..." autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkTypingAnswer('${nextWord.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="typing-submit" onclick="checkTypingAnswer('${nextWord.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
            ${hintUi}
            <div id="typing-feedback"></div>
        </div>
    `;
    
    setTimeout(() => document.getElementById('typing-input').focus(), 100);
}

function checkTypingAnswer(wordId, correct) {
    const input = document.getElementById('typing-input');
    const feedback = document.getElementById('typing-feedback');
    const submitBtn = document.getElementById('typing-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const progress = studySession.typingProgress[wordId];
    const examMode = isExamModeActive();

    input.classList.remove('correct', 'wrong');
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);

    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        if (!examMode) {
            input.classList.add('correct');
        }
        studySession.correctCount++;
        if (!examMode) {
            playCorrectSound();
        }

        if (progress.needsExtraCorrect > 0) {
            progress.needsExtraCorrect--;
        }

        if (progress.needsExtraCorrect === 0) {
            progress.completed = true;
            feedback.innerHTML = examMode ? `
                <div class="feedback-message">
                    <i class="fas fa-check"></i> Antwoord opgeslagen.
                </div>
                <button class="btn btn-primary btn-next" onclick="continueTyping()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            ` : `
                <div class="feedback-message correct">
                    <i class="fas fa-check-circle"></i> Goed!
                </div>
                <button class="btn btn-primary btn-next" onclick="continueTyping()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            `;
            updateTypingProgress();
            input.disabled = true;
            if (submitBtn) {
                submitBtn.classList.add('hidden');
            }
            saveActiveSession();
            return;
        }

        progress.cooldown = Math.max(progress.cooldown, 3);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> Antwoord opgeslagen.
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        ` : `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed! Nog ${progress.needsExtraCorrect}x
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        `;
        input.value = '';
        input.disabled = true;
        if (submitBtn) {
            submitBtn.classList.add('hidden');
        }
        saveActiveSession();
    } else {
        if (!examMode) {
            input.classList.add('wrong');
        }
        studySession.wrongCount++;
        progress.needsExtraCorrect = 2;
        // Bij kleine sets (<4 woorden), zorg dat foute woorden afwisselen door hogere cooldown
        const cooldownValue = studySession.words.length < 4 ? 8 : 4;
        progress.cooldown = Math.max(progress.cooldown, cooldownValue);
        if (!studySession.typingWrongWords.includes(wordId)) {
            studySession.typingWrongWords.push(wordId);
        }
        const diff = buildTypingDiff(userAnswer, correct);
        const relatedHint = buildRelatedWordHint(userAnswer, correct, wordId);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> Antwoord opgeslagen.
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        ` : `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
            ${relatedHint}
            <div class="feedback-actions">
                <button class="btn btn-secondary btn-intended" onclick="acceptIntendedTyping('${wordId}')">
                    <i class="fas fa-check"></i> Ik bedoelde dit
                </button>
                <button class="btn btn-primary btn-next" onclick="continueTyping()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            </div>
        `;
        input.disabled = true;
        if (submitBtn) {
            submitBtn.classList.add('hidden');
        }
        saveActiveSession();
    }
}

function startTypingReview() {
    studySession.typingReviewMode = true;
    studySession.typingReviewQueue = shuffleArray([...new Set(studySession.typingWrongWords)]);
    studySession.typingReviewIndex = 0;
    studySession.typingReviewCorrectIds = [];
    studySession.typingReviewUniqueCount = studySession.typingReviewQueue.length;
    updateTypingProgress();
    showNextTypingReviewQuestion();
}

function showNextTypingReviewQuestion() {
    const correctIds = studySession.typingReviewCorrectIds || [];
    const uniqueCount = studySession.typingReviewUniqueCount || new Set(studySession.typingWrongWords).size;

    if (correctIds.length >= uniqueCount) {
        showComplete();
        return;
    }

    if (studySession.typingReviewIndex >= studySession.typingReviewQueue.length) {
        showComplete();
        return;
    }

    const wordId = studySession.typingReviewQueue[studySession.typingReviewIndex];
    const word = studySession.words.find(w => w.id === wordId);
    if (!word) {
        studySession.typingReviewIndex++;
        showNextTypingReviewQuestion();
        return;
    }

    const qa = getQuestion(word);
    const content = document.getElementById('typing-content');
    const hintUi = renderHintButton(word.id, qa.answer, 'typing-review-hint');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-repeat"></i> Herhaling (foute woorden)
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="typing-review-input" 
                       placeholder="Type je antwoord..." autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkTypingReview('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="typing-review-submit" onclick="checkTypingReview('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
            ${hintUi}
            <div id="typing-review-feedback"></div>
        </div>
    `;

    setTimeout(() => document.getElementById('typing-review-input').focus(), 100);
}

function checkTypingReview(wordId, correct) {
    const input = document.getElementById('typing-review-input');
    const feedback = document.getElementById('typing-review-feedback');
    const submitBtn = document.getElementById('typing-review-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const examMode = isExamModeActive();

    input.classList.remove('correct', 'wrong');
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);
    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        if (!examMode) {
            input.classList.add('correct');
            playCorrectSound();
        }
        if (!studySession.typingReviewCorrectIds) studySession.typingReviewCorrectIds = [];
        if (!studySession.typingReviewCorrectIds.includes(wordId)) {
            studySession.typingReviewCorrectIds.push(wordId);
        }
        updateTypingProgress();
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> Antwoord opgeslagen.
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        ` : `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed!
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        `;
    } else {
        if (!examMode) {
            input.classList.add('wrong');
        }
        // Re-add to the end of the queue so it comes back
        studySession.typingReviewQueue.push(wordId);
        const diff = buildTypingDiff(userAnswer, correct);
        const relatedHint = buildRelatedWordHint(userAnswer, correct, wordId);
        feedback.innerHTML = examMode ? `
            <div class="feedback-message">
                <i class="fas fa-check"></i> Antwoord opgeslagen.
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        ` : `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
            ${relatedHint}
            <div class="feedback-actions">
                <button class="btn btn-secondary btn-intended" onclick="acceptIntendedTypingReview('${wordId}')">
                    <i class="fas fa-check"></i> Ik bedoelde dit
                </button>
                <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            </div>
        `;
    }

    input.disabled = true;
    if (submitBtn) {
        submitBtn.classList.add('hidden');
    }
    saveActiveSession();
}

function continueTypingReview() {
    studySession.typingReviewIndex++;
    updateTypingProgress();
    showNextTypingReviewQuestion();
}

function continueTyping() {
    showNextTypingQuestion();
}

function getNextTypingWord() {
    const available = studySession.words.find(w => {
        const progress = studySession.typingProgress[w.id];
        return !progress.completed && progress.cooldown === 0;
    });
    if (available) return available;

    return studySession.words.find(w => {
        const progress = studySession.typingProgress[w.id];
        return !progress.completed;
    }) || null;
}

function reduceTypingCooldowns() {
    studySession.words.forEach(w => {
        const progress = studySession.typingProgress[w.id];
        if (progress.cooldown > 0) {
            progress.cooldown--;
        }
    });
}

// ===== TOETS MODE =====
function initExamMode() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const selectedWords = getStudyWordsFromSelection(list.words);
    if (!selectedWords.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }

    studySession.words = shuffleArray([...selectedWords]);
    studySession.currentIndex = 0;
    studySession.pendingAnswers = [];

    showView('study-exam-view');
    updateExamProgress();
    showNextExamQuestion();
}

function updateExamProgress() {
    const total = studySession.words.length || 0;
    const done = Math.min(studySession.currentIndex, total);
    const percent = total > 0 ? (done / total) * 100 : 0;
    const bar = document.getElementById('exam-progress');
    const text = document.getElementById('exam-progress-text');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${done}/${total}`;
}

function showNextExamQuestion() {
    if (studySession.currentIndex >= studySession.words.length) {
        showComplete();
        return;
    }

    const word = studySession.words[studySession.currentIndex];
    const qa = getQuestion(word);
    const content = document.getElementById('exam-content');
    if (!content) return;

    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label"><i class="fas fa-clipboard-check"></i> Toets</div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="exam-input"
                       placeholder="Type je antwoord..." autofocus autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false"
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); submitExamAnswer('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" onclick="submitExamAnswer('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-arrow-right"></i> Volgende
                </button>
            </div>
            <p class="setting-hint">Feedback krijg je pas op het einde.</p>
        </div>
    `;

    setTimeout(() => document.getElementById('exam-input')?.focus(), 100);
}

function submitExamAnswer(wordId, correct) {
    const input = document.getElementById('exam-input');
    if (!input) return;
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);

    if (isCorrect) {
        studySession.correctCount++;
    } else {
        studySession.wrongCount++;
    }

    recordAnswer(wordId, isCorrect);
    pushPendingAnswer(wordId, userAnswer, correct, isCorrect);

    studySession.currentIndex++;
    updateExamProgress();
    saveActiveSession();
    showNextExamQuestion();
}

// ===== KOPPELRACE MODE =====
let connectState = {
    cards: [],
    matchedPairIds: [],
    selectedCardIds: [],
    totalPairs: 0,
    timeLeft: 0,
    timer: null,
    lockInput: false
};

function initConnectMode() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const selectedWords = getStudyWordsFromSelection(list.words);
    if (!selectedWords.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }

    const words = shuffleArray([...selectedWords]).slice(0, Math.min(8, selectedWords.length));
    const cards = [];
    words.forEach(word => {
        cards.push({ cardId: `${word.id}-t`, pairId: word.id, label: word.term });
        cards.push({ cardId: `${word.id}-d`, pairId: word.id, label: word.definition });
    });

    connectState.cards = shuffleArray(cards);
    connectState.matchedPairIds = [];
    connectState.selectedCardIds = [];
    connectState.totalPairs = words.length;
    connectState.timeLeft = Math.max(45, words.length * 12);
    connectState.lockInput = false;

    studySession.correctCount = 0;
    studySession.wrongCount = 0;

    if (connectState.timer) clearInterval(connectState.timer);
    connectState.timer = setInterval(() => {
        connectState.timeLeft--;
        updateConnectHeader();
        if (connectState.timeLeft <= 0) {
            finishConnectMode(false);
        }
    }, 1000);

    showView('study-connect-view');
    updateConnectHeader();
    renderConnectBoard();
}

function updateConnectHeader() {
    const matched = connectState.matchedPairIds.length;
    const total = connectState.totalPairs || 0;
    const percent = total > 0 ? (matched / total) * 100 : 0;

    const bar = document.getElementById('connect-progress');
    const text = document.getElementById('connect-progress-text');
    const timer = document.getElementById('connect-timer');
    if (bar) bar.style.width = `${percent}%`;
    if (text) text.textContent = `${matched}/${total}`;
    if (timer) {
        const min = Math.floor(Math.max(connectState.timeLeft, 0) / 60);
        const sec = Math.max(connectState.timeLeft, 0) % 60;
        timer.textContent = `${min}:${sec.toString().padStart(2, '0')}`;
    }
}

function renderConnectBoard() {
    const container = document.getElementById('connect-content');
    if (!container) return;

    const selected = new Set(connectState.selectedCardIds);
    const matched = new Set(connectState.matchedPairIds);

    container.innerHTML = `
        <div class="question-card">
            <div class="question-type-label"><i class="fas fa-link"></i> Koppelrace</div>
            <p class="setting-hint">Kies telkens 2 kaartjes die bij elkaar horen.</p>
            <div class="choice-options">
                ${connectState.cards.map(card => {
                    const isMatched = matched.has(card.pairId);
                    const isSelected = selected.has(card.cardId);
                    const classes = [isMatched ? 'correct' : '', isSelected ? 'selected' : ''].filter(Boolean).join(' ');
                    return `
                        <button class="choice-btn ${classes}" ${isMatched ? 'disabled' : ''}
                                onclick="pickConnectCard('${card.cardId}')">
                            ${escapeHtml(card.label)}
                        </button>
                    `;
                }).join('')}
            </div>
        </div>
    `;
}

function pickConnectCard(cardId) {
    if (connectState.lockInput) return;
    if (connectState.selectedCardIds.includes(cardId)) return;

    const card = connectState.cards.find(c => c.cardId === cardId);
    if (!card) return;
    if (connectState.matchedPairIds.includes(card.pairId)) return;

    connectState.selectedCardIds.push(cardId);
    renderConnectBoard();

    if (connectState.selectedCardIds.length < 2) return;

    connectState.lockInput = true;
    const [firstId, secondId] = connectState.selectedCardIds;
    const first = connectState.cards.find(c => c.cardId === firstId);
    const second = connectState.cards.find(c => c.cardId === secondId);
    const isMatch = first && second && first.pairId === second.pairId;

    setTimeout(() => {
        if (isMatch) {
            connectState.matchedPairIds.push(first.pairId);
            studySession.correctCount++;
            playCorrectSound();
            recordAnswer(first.pairId, true);
        } else {
            studySession.wrongCount++;
            if (first) recordAnswer(first.pairId, false);
            if (second) recordAnswer(second.pairId, false);
        }

        connectState.selectedCardIds = [];
        connectState.lockInput = false;
        updateConnectHeader();

        if (connectState.matchedPairIds.length >= connectState.totalPairs) {
            finishConnectMode(true);
            return;
        }

        renderConnectBoard();
    }, 450);
}

function finishConnectMode(won) {
    if (connectState.timer) {
        clearInterval(connectState.timer);
        connectState.timer = null;
    }

    document.getElementById('stat-correct').textContent = studySession.correctCount;
    document.getElementById('stat-wrong').textContent = studySession.wrongCount;

    const msg = won
        ? 'Koppelrace gehaald! Je hebt alle paren op tijd verbonden.'
        : 'Tijd op! Probeer opnieuw en versla de klok.';
    document.getElementById('complete-message').innerHTML = msg;
    document.getElementById('complete-summary').innerHTML =
        `<p class="summary-empty">Gevonden paren: ${connectState.matchedPairIds.length}/${connectState.totalPairs}</p>`;

    if (won) {
        playCompleteSound();
        createConfetti();
    }

    showView('complete-view');
    clearActiveSession();
}

// ===== Utility Functions =====
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Woordkaartjes Mode =====
let cardsState = {
    currentIndex: 0,
    deck: [],
    correctCards: [],
    wrongCards: [],
    isFlipped: false
};

let cardSwipeState = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    isDragging: false,
    startTime: 0
};

function initCardsMode() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const words = getStudyWordsFromSelection(list.words);
    if (!words.length) {
        alert('Geen woorden gevonden met je huidige selectie/filters.');
        showListDetail(currentListId);
        return;
    }
    cardsState.deck = shuffleArray(words);
    cardsState.correctCards = [];
    cardsState.wrongCards = [];
    cardsState.currentIndex = 0;
    cardsState.isFlipped = false;

    studySession.correctCount = 0;
    studySession.wrongCount = 0;

    showView('study-cards-view');
    startGhostTimer();
    updateCardsProgress();
    showCurrentCard();

    // Keyboard shortcuts
    document.addEventListener('keydown', handleCardsKeys);

    // Setup swipe handlers
    setupCardSwipeHandlers();
}

function handleCardsKeys(e) {
    if (!document.getElementById('study-cards-view').classList.contains('active')) return;

    if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        flipCard();
    } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        markCard(true);
    } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        markCard(false);
    }
}

function showCurrentCard() {
    if (cardsState.currentIndex >= cardsState.deck.length) {
        // Check if we have wrong cards to review
        if (cardsState.wrongCards.length > 0) {
            showCardsReviewPrompt();
        } else {
            finalizeCardSession();
        }
        return;
    }

    const word = cardsState.deck[cardsState.currentIndex];
    const qa = getQuestion(word);
    cardsState.isFlipped = false;

    const content = document.getElementById('cards-content');
    content.innerHTML = `
        <div class="word-card" id="word-card" onclick="flipCard()">
            <div class="word-card-inner">
                <div class="word-card-face word-card-front">
                    <p>${escapeHtml(qa.question)}</p>
                </div>
                <div class="word-card-face word-card-back">
                    <p>${escapeHtml(qa.answer)}</p>
                </div>
            </div>
        </div>
        <p class="card-hint">Swipe links (fout) of rechts (goed) • Of tik om te flippen</p>
        <div class="cards-actions" style="display: none;">
            <button class="card-action-btn card-action-wrong" onclick="markCard(false)">
                <i class="fas fa-times"></i> Fout
            </button>
            <button class="card-action-btn card-action-right" onclick="markCard(true)">
                <i class="fas fa-check"></i> Goed
            </button>
        </div>
    `;

    updateCardsProgress();
}

function flipCard() {
    const card = document.getElementById('word-card');
    if (card) {
        card.classList.toggle('flipped');
        cardsState.isFlipped = !cardsState.isFlipped;

        // Show/hide buttons based on flip state
        const actions = document.querySelector('.cards-actions');
        if (actions) {
            if (cardsState.isFlipped) {
                actions.style.display = 'flex';
            } else {
                actions.style.display = 'none';
            }
        }
    }
}

function markCard(correct) {
    const word = cardsState.deck[cardsState.currentIndex];
    const card = document.getElementById('word-card');

    // Add fly out animation
    if (card) {
        card.classList.add(correct ? 'fly-out-right' : 'fly-out-left');
    }

    if (correct) {
        cardsState.correctCards.push(word);
        studySession.correctCount++;
        playCorrectSound();
    } else {
        cardsState.wrongCards.push(word);
        studySession.wrongCount++;
    }

    recordAnswer(word.id, correct);
    cardsState.currentIndex++;

    setTimeout(() => showCurrentCard(), 400);
}

function setupCardSwipeHandlers() {
    const container = document.getElementById('cards-content');
    if (!container) return;

    // Use pointer events for better cross-device support
    container.addEventListener('pointerdown', onCardPointerDown, { passive: false });
    container.addEventListener('pointermove', onCardPointerMove, { passive: false });
    container.addEventListener('pointerup', onCardPointerUp);
    container.addEventListener('pointercancel', onCardPointerCancel);
}

function onCardPointerDown(e) {
    const card = e.target.closest('.word-card');
    if (!card) return;

    cardSwipeState.isDragging = true;
    cardSwipeState.startX = e.clientX || e.touches?.[0]?.clientX || 0;
    cardSwipeState.startY = e.clientY || e.touches?.[0]?.clientY || 0;
    cardSwipeState.currentX = cardSwipeState.startX;
    cardSwipeState.currentY = cardSwipeState.startY;
    cardSwipeState.startTime = Date.now();

    card.style.transition = 'none';
}

function onCardPointerMove(e) {
    if (!cardSwipeState.isDragging) return;

    const card = document.getElementById('word-card');
    if (!card) return;

    cardSwipeState.currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    cardSwipeState.currentY = e.clientY || e.touches?.[0]?.clientY || 0;

    const deltaX = cardSwipeState.currentX - cardSwipeState.startX;
    const deltaY = cardSwipeState.currentY - cardSwipeState.startY;

    // Only drag if horizontal movement is dominant
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
        e.preventDefault();

        const rotate = deltaX / 20;
        const opacity = 1 - Math.abs(deltaX) / 300;

        card.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg)`;
        card.style.opacity = Math.max(0.3, opacity);

        // Visual feedback
        const container = document.getElementById('study-cards-view');
        if (deltaX < -50) {
            container.classList.add('swipe-hint-left');
            container.classList.remove('swipe-hint-right');
        } else if (deltaX > 50) {
            container.classList.add('swipe-hint-right');
            container.classList.remove('swipe-hint-left');
        } else {
            container.classList.remove('swipe-hint-left', 'swipe-hint-right');
        }
    }
}

function onCardPointerUp(e) {
    if (!cardSwipeState.isDragging) return;

    cardSwipeState.isDragging = false;

    const card = document.getElementById('word-card');
    const container = document.getElementById('study-cards-view');
    if (!card) return;

    const deltaX = cardSwipeState.currentX - cardSwipeState.startX;
    const deltaTime = Date.now() - cardSwipeState.startTime;
    const velocity = Math.abs(deltaX) / deltaTime;

    container.classList.remove('swipe-hint-left', 'swipe-hint-right');

    // Check if swipe threshold met
    const swipeThreshold = 80;
    const velocityThreshold = 0.5;

    if (Math.abs(deltaX) > swipeThreshold || velocity > velocityThreshold) {
        // Swipe successful - mark card
        if (deltaX > 0) {
            markCard(true); // Swipe right = correct
        } else {
            markCard(false); // Swipe left = wrong
        }
    } else {
        // Reset card position
        card.style.transition = 'all 0.3s ease';
        card.style.transform = '';
        card.style.opacity = '';

        setTimeout(() => {
            card.style.transition = '';
        }, 300);
    }
}

function onCardPointerCancel(e) {
    if (!cardSwipeState.isDragging) return;

    cardSwipeState.isDragging = false;

    const card = document.getElementById('word-card');
    const container = document.getElementById('study-cards-view');

    if (card) {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = '';
        card.style.opacity = '';
    }

    if (container) {
        container.classList.remove('swipe-hint-left', 'swipe-hint-right');
    }
}

function updateCardsProgress() {
    const total = cardsState.deck.length;
    const current = cardsState.currentIndex + 1;
    const percent = total > 0 ? (cardsState.currentIndex / total) * 100 : 0;

    const progressBar = document.getElementById('cards-progress');
    if (progressBar) {
        progressBar.style.width = `${percent}%`;
    }

    const progressText = document.getElementById('cards-progress-text');
    if (progressText) {
        progressText.textContent = `${Math.min(current, total)}/${total}`;
    }
}

function showCardsReviewPrompt() {
    const content = document.getElementById('cards-content');
    content.innerHTML = `
        <div class="question-card">
            <h3>Wil je de foute kaartjes herhalen?</h3>
            <p style="margin: 1rem 0; color: var(--text-medium);">
                Je hebt ${cardsState.wrongCards.length} ${cardsState.wrongCards.length === 1 ? 'kaartje' : 'kaartjes'} fout.
            </p>
            <div class="cards-actions" style="flex-direction: column;">
                <button class="btn btn-primary" onclick="retryWrongCards()">
                    <i class="fas fa-redo"></i> Ja, herhaal fouten
                </button>
                <button class="btn btn-secondary" onclick="finalizeCardSession()">
                    <i class="fas fa-check"></i> Nee, afronden
                </button>
            </div>
        </div>
    `;
}

function retryWrongCards() {
    cardsState.deck = shuffleArray([...cardsState.wrongCards]);
    cardsState.wrongCards = [];
    cardsState.currentIndex = 0;
    cardsState.isFlipped = false;
    showCurrentCard();
}

function finalizeCardSession() {
    cleanupCardHandlers();
    finalizeSessionStats();

    // Update last studied timestamp
    if (currentListId) {
        const list = wordLists.find(l => l.id === currentListId);
        if (list) {
            list.lastStudied = Date.now();
            saveData();
        }
    }

    document.getElementById('stat-correct').textContent = studySession.correctCount;
    document.getElementById('stat-wrong').textContent = studySession.wrongCount;

    const accuracy = studySession.correctCount + studySession.wrongCount > 0
        ? Math.round((studySession.correctCount / (studySession.correctCount + studySession.wrongCount)) * 100)
        : 100;

    const effectiveCorrect = Math.max(0, studySession.correctCount - (studySession.hintPenalty || 0));
    const grade = calculateGrade(effectiveCorrect, studySession.wrongCount);
    const gradeValue = parseFloat(grade);
    let gradeClass = 'grade-mid';
    if (gradeValue < 5.5) {
        gradeClass = 'grade-low';
    } else if (gradeValue > 8) {
        gradeClass = 'grade-high';
    }

    const hintPart = studySession.hintPenalty > 0
        ? ` Hints gebruikt: -${studySession.hintPenalty.toFixed(1)} punt(en).`
        : '';
    document.getElementById('complete-message').innerHTML =
        `Je hebt alle woordjes geoefend met ${accuracy}% nauwkeurigheid (cijfer <span class="grade-score ${gradeClass}">${grade}</span>).${hintPart}`;

    playCompleteSound();
    createConfetti();
    showView('complete-view');
    clearActiveSession();
}

function showComplete() {
    finalizeSessionStats();

    // Update last studied timestamp
    if (currentListId) {
        const list = wordLists.find(l => l.id === currentListId);
        if (list) {
            list.lastStudied = Date.now();
            saveData();
        }
    }

    document.getElementById('stat-correct').textContent = studySession.correctCount;
    document.getElementById('stat-wrong').textContent = studySession.wrongCount;

    const accuracy = studySession.correctCount + studySession.wrongCount > 0
        ? Math.round((studySession.correctCount / (studySession.correctCount + studySession.wrongCount)) * 100)
        : 100;

    const effectiveCorrect = Math.max(0, studySession.correctCount - (studySession.hintPenalty || 0));
    const grade = calculateGrade(effectiveCorrect, studySession.wrongCount);
    const gradeValue = parseFloat(grade);
    let gradeClass = 'grade-mid';
    if (gradeValue < 5.5) {
        gradeClass = 'grade-low';
    } else if (gradeValue > 8) {
        gradeClass = 'grade-high';
    }

    const hintPart = studySession.hintPenalty > 0
        ? ` Hints gebruikt: -${studySession.hintPenalty.toFixed(1)} punt(en).`
        : '';
    document.getElementById('complete-message').innerHTML =
        `Je hebt alle woordjes geoefend met ${accuracy}% nauwkeurigheid (cijfer <span class="grade-score ${gradeClass}">${grade}</span>).${hintPart}`;

    playCompleteSound();
    createConfetti();
    showView('complete-view');
    clearActiveSession();
}

function cleanupCardHandlers() {
    document.removeEventListener('keydown', handleCardsKeys);

    const container = document.getElementById('cards-content');
    if (container) {
        container.removeEventListener('pointerdown', onCardPointerDown);
        container.removeEventListener('pointermove', onCardPointerMove);
        container.removeEventListener('pointerup', onCardPointerUp);
        container.removeEventListener('pointercancel', onCardPointerCancel);
    }
}

function exitStudy() {
    // Cleanup cards mode handlers if in cards mode
    if (currentStudyMode === 'cards') {
        cleanupCardHandlers();
    }

    if (currentStudyMode === 'connect' && connectState.timer) {
        clearInterval(connectState.timer);
        connectState.timer = null;
    }

    // Keep session saved so user can resume later (don't clear it)

    // Return to list detail view
    if (currentListId) {
        showListDetail(currentListId);
    } else {
        showHome();
    }
}

function restartStudy() {
    if (currentListId && currentStudyMode) {
        startStudyMode(currentStudyMode);
    } else {
        showHome();
    }
}

function restoreLastView() {
    const lastView = localStorage.getItem(LAST_VIEW_KEY);
    const lastListId = localStorage.getItem(LAST_LIST_ID_KEY);
    const lastStudyMode = localStorage.getItem(LAST_STUDY_MODE_KEY);

    // Only restore if we have valid data
    if (!lastView || lastView === 'home-view' || lastView === 'create-view' || lastView === 'complete-view') {
        return; // Show default home view
    }

    // For study views, try to restore session from localStorage
    if (lastView.startsWith('study-')) {
        const raw = localStorage.getItem('activeStudySession');
        if (raw) {
            try {
                const data = JSON.parse(raw);
                if (data && data.state && data.state.words && data.state.words.length > 0) {
                    studySession = data.state;
                    currentStudyMode = data.mode;
                    currentListId = data.listId;

                    switch (currentStudyMode) {
                        case 'steps':
                            showView('study-steps-view');
                            updateStepsProgress();
                            if (studySession.stepsReviewMode) {
                                showNextStepsReviewQuestion();
                            } else {
                                showNextStepQuestion();
                            }
                            return;
                        case 'typing':
                            showView('study-typing-view');
                            updateTypingProgress();
                            if (studySession.typingReviewMode) {
                                showNextTypingReviewQuestion();
                            } else {
                                showNextTypingQuestion();
                            }
                            return;
                        case 'exam':
                            showView('study-exam-view');
                            updateExamProgress();
                            showNextExamQuestion();
                            return;
                        case 'cards':
                            // Cards mode can't be easily restored mid-session, show list instead
                            if (data.listId) {
                                const list = wordLists.find(l => l.id === data.listId);
                                if (list) {
                                    showListDetail(data.listId);
                                    return;
                                }
                            }
                            return;
                    }
                }
            } catch (e) {
                console.error('Failed to restore study session:', e);
                localStorage.removeItem('activeStudySession');
            }
        }
        return; // Session ended, show home
    }

    // For list view, restore the list if it exists
    if (lastView === 'list-view' && lastListId) {
        const list = wordLists.find(l => l.id === lastListId);
        if (list) {
            showListDetail(lastListId);
            return;
        }
    }
}

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    ensureAllWordMetadata();
    saveData();
    renderWordLists();

    applyTheme();
    applyCloudState();

    const colorPicker = document.getElementById('accent-color-picker');
    const colorInput = document.getElementById('accent-color-input');
    if (colorPicker && colorInput) {
        const syncAccentInputs = (value, save = false) => {
            const normalized = normalizeHexColor(value) || getAccentColor();
            colorPicker.value = normalized;
            colorInput.value = normalized;
            applyAccentColor(normalized);
            if (save) {
                setAccentColor(normalized);
                renderPresetColors();
            }
        };

        colorPicker.addEventListener('input', (e) => syncAccentInputs(e.target.value, true));
        colorInput.addEventListener('change', (e) => syncAccentInputs(e.target.value, true));
    }
    
    // Setup language search filters
    setupLanguageSearch();

    // Setup keyboard controls
    setupKeyboardControls();

    // Apply import from URL if present
    applyImportFromUrl();

    // Close auth menu when clicking outside
    document.addEventListener('click', (event) => {
        const menu = document.getElementById('auth-menu');
        const btn = document.getElementById('auth-menu-btn');
        if (!menu || !btn) return;
        if (menu.classList.contains('hidden')) return;
        if (menu.contains(event.target) || btn.contains(event.target)) return;
        closeAuthMenu();
    });

    // Close search results when clicking outside
    document.addEventListener('click', (event) => {
        const searchContainer = document.querySelector('.header-search');
        const results = document.getElementById('public-search-results');
        if (!searchContainer || !results) return;
        if (results.classList.contains('hidden')) return;
        if (searchContainer.contains(event.target)) return;
        results.classList.add('hidden');
    });

    // Restore last view (session persistence)
    restoreLastView();
});

function applyImportFromUrl() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('import') !== '1') return;

    const title = params.get('title') ? decodeURIComponent(params.get('title')) : '';
    const langFrom = params.get('langFrom') ? decodeURIComponent(params.get('langFrom')) : '';
    const langTo = params.get('langTo') ? decodeURIComponent(params.get('langTo')) : '';
    const dataRaw = params.get('data') ? decodeURIComponent(params.get('data')) : '';

    showCreateList();

    if (title) {
        document.getElementById('list-title').value = title;
    }

    setSelectValue('lang-from', langFrom);
    setSelectValue('lang-to', langTo);

    // Update search inputs
    const fromSearch = document.getElementById('lang-from-search');
    const toSearch = document.getElementById('lang-to-search');
    if (fromSearch && langFrom) fromSearch.value = langFrom;
    if (toSearch && langTo) toSearch.value = langTo;

    const wordsList = document.getElementById('words-list');
    wordsList.innerHTML = '';

    const pairs = dataRaw.split('\n').map(line => line.split('\t')).filter(p => p.length >= 2);
    if (pairs.length === 0) {
        addWordEntry();
        return;
    }

    pairs.forEach(([term, definition]) => {
        addWordEntry(term.trim(), definition.trim());
    });

    // Clean URL
    window.history.replaceState({}, document.title, window.location.pathname);
}

function setSelectValue(selectId, value) {
    const select = document.getElementById(selectId);
    if (!select) return;

    const options = Array.from(select.options);
    const match = options.find(o => o.textContent.toLowerCase() === (value || '').toLowerCase());
    if (match) {
        select.value = match.textContent;
    }
}

function setupKeyboardControls() {
    document.addEventListener('keydown', (e) => {
        const settingsModal = document.getElementById('settings-modal');
        if (settingsModal && !settingsModal.classList.contains('hidden')) return;

        const stepsView = document.getElementById('study-steps-view');
        const typingView = document.getElementById('study-typing-view');
        const cardsView = document.getElementById('study-cards-view');
        const examView = document.getElementById('study-exam-view');
        const connectView = document.getElementById('study-connect-view');
        const inStudyView =
            (stepsView && stepsView.classList.contains('active')) ||
            (typingView && typingView.classList.contains('active')) ||
            (cardsView && cardsView.classList.contains('active')) ||
            (examView && examView.classList.contains('active')) ||
            (connectView && connectView.classList.contains('active'));

        if (!inStudyView) return;

        if (e.key === 'Escape') {
            e.preventDefault();
            exitStudy();
            return;
        }

        if (e.ctrlKey && (e.key === 'h' || e.key === 'H')) {
            e.preventDefault();
            triggerCurrentHint();
            return;
        }

        const activeElement = document.activeElement;
        const isTypingField = activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) && !activeElement.disabled;
        if (isTypingField) return;

        if (stepsView && stepsView.classList.contains('active')) {
            handleStepsKeyboard(e);
        }

        if (typingView && typingView.classList.contains('active')) {
            handleTypingKeyboard(e);
        }
    });
}

function triggerCurrentHint() {
    return;
}

function handleStepsKeyboard(e) {
    const choiceButtons = document.querySelectorAll('.choice-options .choice-btn');
    if (choiceButtons.length > 0) {
        const index = getNumberKeyIndex(e);
        if (index !== null && choiceButtons[index]) {
            e.preventDefault();
            choiceButtons[index].click();
            return;
        }

        const choiceNextBtn = document.querySelector('#step-choice-feedback .btn-next');
        if (choiceNextBtn && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            choiceNextBtn.click();
            return;
        }
    }

    const flashCard = document.getElementById('step-flash-card');
    const flashNextBtn = document.getElementById('step-flash-next');
    if (flashCard) {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (!flashCard.classList.contains('flipped')) {
                flipStepFlash();
            } else if (flashNextBtn && flashNextBtn.style.display !== 'none') {
                flashNextBtn.click();
            }
            return;
        }
    }

    const typingInput = document.getElementById('step-typing-input');
    const typingContinueBtn = document.querySelector('#step-typing-feedback .btn-next');
    if (typingInput && typingInput.disabled && typingContinueBtn && e.key === 'Enter') {
        e.preventDefault();
        typingContinueBtn.click();
    }

    const reviewInput = document.getElementById('step-review-input');
    const reviewContinueBtn = document.querySelector('#step-review-feedback .btn-next');
    if (reviewInput && reviewInput.disabled && reviewContinueBtn && e.key === 'Enter') {
        e.preventDefault();
        reviewContinueBtn.click();
    }
}

function handleTypingKeyboard(e) {
    const typingInput = document.getElementById('typing-input');
    const typingContinueBtn = document.querySelector('#typing-feedback .btn-next');
    if (typingInput && typingInput.disabled && typingContinueBtn && e.key === 'Enter') {
        e.preventDefault();
        typingContinueBtn.click();
    }

    const reviewInput = document.getElementById('typing-review-input');
    const reviewContinueBtn = document.querySelector('#typing-review-feedback .btn-next');
    if (reviewInput && reviewInput.disabled && reviewContinueBtn && e.key === 'Enter') {
        e.preventDefault();
        reviewContinueBtn.click();
    }
}

function getNumberKeyIndex(e) {
    const keyMap = {
        'Digit1': 0,
        'Digit2': 1,
        'Digit3': 2,
        'Digit4': 3,
        'Numpad1': 0,
        'Numpad2': 1,
        'Numpad3': 2,
        'Numpad4': 3
    };
    return keyMap[e.code] ?? null;
}

function setupLanguageSearch() {
    const langFromSearch = document.getElementById('lang-from-search');
    const langToSearch = document.getElementById('lang-to-search');
    const langFromSelect = document.getElementById('lang-from');
    const langToSelect = document.getElementById('lang-to');

    if (langFromSearch && langFromSelect) {
        langFromSearch.addEventListener('input', (e) => {
            filterLanguageSelect(e.target.value, langFromSelect);
        });
    }

    if (langToSearch && langToSelect) {
        langToSearch.addEventListener('input', (e) => {
            filterLanguageSelect(e.target.value, langToSelect);
        });
    }
}

function getSubjectLanguageLabel() {
    const subject = document.getElementById('selected-subject')?.value || '';
    const map = {
        nederlands: 'Nederlands',
        engels: 'Engels',
        frans: 'Frans',
        duits: 'Duits',
        spaans: 'Spaans',
        italiaans: 'Italiaans',
        latijn: 'Latijn',
        grieks: 'Grieks'
    };
    return map[subject] || null;
}

function applyLanguageSubjectFilter(selectElement) {
    const subjectLang = getSubjectLanguageLabel();
    const options = selectElement.querySelectorAll('option');
    const allowed = subjectLang ? ['nederlands', subjectLang.toLowerCase()] : null;

    options.forEach(option => {
        if (option.value === '') {
            option.style.display = 'block';
            return;
        }

        if (!allowed) {
            option.style.display = 'block';
            return;
        }

        const text = option.textContent.toLowerCase();
        option.style.display = allowed.includes(text) ? 'block' : 'none';
    });

    if (subjectLang) {
        const current = (selectElement.value || '').toLowerCase();
        const target = selectElement.id === 'lang-from'
            ? subjectLang
            : (subjectLang.toLowerCase() === 'nederlands' ? 'Nederlands' : 'Nederlands');
        if (current && !allowed.includes(current)) {
            selectElement.value = target;
        }
    }
}

function filterLanguageSelect(searchTerm, selectElement) {
    const options = selectElement.querySelectorAll('option');
    const term = (searchTerm || '').toLowerCase().trim();

    if (!term) {
        applyLanguageSubjectFilter(selectElement);
        return;
    }

    options.forEach(option => {
        if (option.value === '') {
            option.style.display = 'block';
            return;
        }

        const text = option.textContent.toLowerCase();
        if (text.includes(term)) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
}

function buildTypingDiff(userAnswer, correctAnswer) {
    const user = normalizeAnswer(userAnswer, false, studySession.ignoreParentheses);
    const correct = normalizeAnswer(correctAnswer, false, studySession.ignoreParentheses);

    if (!user.length && !correct.length) {
        return `
            <div class="correct-answer-display">
                <div>Jij typte: <strong>(leeg)</strong></div>
                <div>Juiste antwoord: <strong>(leeg)</strong></div>
            </div>
        `;
    }

    if (!user.length) {
        return `
            <div class="typing-diff">
                <div class="diff-row">
                    <span class="diff-label">Jij:</span>
                    <span class="diff-text"><span class="diff-char missing">(leeg)</span></span>
                </div>
                <div class="diff-row">
                    <span class="diff-label">Juist:</span>
                    <span class="diff-text"><span class="diff-char expected">${escapeHtml(correct)}</span></span>
                </div>
            </div>
        `;
    }

    // Split into words for word-level alignment
    const userWords = user.split(/(\s+)/);
    const correctWords = correct.split(/(\s+)/);

    // Use word-level LCS to align words, then character-level diff within mismatched words
    const wordOps = alignWords(
        userWords.filter(w => w.trim()),
        correctWords.filter(w => w.trim())
    );

    let userHtml = [];
    let correctHtml = [];

    for (const op of wordOps) {
        if (op.type === 'equal') {
            userHtml.push(`<span class="diff-char correct">${escapeHtml(op.userWord)}</span>`);
            correctHtml.push(`<span class="diff-char correct">${escapeHtml(op.correctWord)}</span>`);
        } else if (op.type === 'replace') {
            // Character-level diff within the word
            const charDiff = charLevelDiff(op.userWord, op.correctWord);
            userHtml.push(charDiff.userHtml);
            correctHtml.push(charDiff.correctHtml);
        } else if (op.type === 'insert') {
            // Word missing from user's answer
            userHtml.push(`<span class="diff-char missing">_</span>`);
            correctHtml.push(`<span class="diff-char expected">${escapeHtml(op.correctWord)}</span>`);
        } else if (op.type === 'delete') {
            // Extra word in user's answer
            userHtml.push(`<span class="diff-char wrong">${escapeHtml(op.userWord)}</span>`);
            correctHtml.push(`<span class="diff-char expected"></span>`);
        }
    }

    return `
        <div class="typing-diff">
            <div class="diff-row">
                <span class="diff-label">Jij:</span>
                <span class="diff-text">${userHtml.join(' ')}</span>
            </div>
            <div class="diff-row">
                <span class="diff-label">Juist:</span>
                <span class="diff-text">${correctHtml.join(' ')}</span>
            </div>
        </div>
    `;
}

function alignWords(userWords, correctWords) {
    const m = userWords.length;
    const n = correctWords.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (userWords[i - 1].toLowerCase() === correctWords[j - 1].toLowerCase()) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                // Partial match gets lower cost than complete mismatch
                const similarity = wordSimilarity(userWords[i - 1], correctWords[j - 1]);
                const replaceCost = similarity > 0.5 ? 0.5 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1,
                    dp[i][j - 1] + 1,
                    dp[i - 1][j - 1] + replaceCost
                );
            }
        }
    }

    // Traceback
    const ops = [];
    let i = m, j = n;
    while (i > 0 || j > 0) {
        if (i > 0 && j > 0) {
            const isEqual = userWords[i - 1].toLowerCase() === correctWords[j - 1].toLowerCase();
            const similarity = wordSimilarity(userWords[i - 1], correctWords[j - 1]);
            const replaceCost = isEqual ? 0 : (similarity > 0.5 ? 0.5 : 1);

            if (dp[i][j] === dp[i - 1][j - 1] + replaceCost) {
                if (isEqual) {
                    ops.push({ type: 'equal', userWord: userWords[i - 1], correctWord: correctWords[j - 1] });
                } else {
                    ops.push({ type: 'replace', userWord: userWords[i - 1], correctWord: correctWords[j - 1] });
                }
                i--; j--;
                continue;
            }
        }
        if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            ops.push({ type: 'delete', userWord: userWords[i - 1] });
            i--;
            continue;
        }
        if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            ops.push({ type: 'insert', correctWord: correctWords[j - 1] });
            j--;
            continue;
        }
        break;
    }

    return ops.reverse();
}

function wordSimilarity(a, b) {
    if (!a || !b) return 0;
    const la = a.toLowerCase();
    const lb = b.toLowerCase();
    if (la === lb) return 1;
    const maxLen = Math.max(la.length, lb.length);
    if (maxLen === 0) return 1;
    const dist = levenshteinDistance(la, lb);
    return 1 - dist / maxLen;
}

function levenshteinDistance(a, b) {
    const m = a.length, n = b.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            const cost = a[i - 1] === b[j - 1] ? 0 : 1;
            dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
            // Handle transpositions (adjacent char swap)
            if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
            }
        }
    }
    return dp[m][n];
}

function charLevelDiff(userWord, correctWord) {
    const uChars = Array.from(userWord);
    const cChars = Array.from(correctWord);
    const m = uChars.length;
    const n = cChars.length;

    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            // Case-insensitive and accent-tolerant comparison
            const uChar = uChars[i - 1];
            const cChar = cChars[j - 1];
            const cost = charsMatch(uChar, cChar) ? 0 : 1;
            dp[i][j] = Math.min(
                dp[i - 1][j] + 1,
                dp[i][j - 1] + 1,
                dp[i - 1][j - 1] + cost
            );
            // Transposition
            if (i > 1 && j > 1 && charsMatch(uChars[i - 1], cChars[j - 2]) && charsMatch(uChars[i - 2], cChars[j - 1])) {
                dp[i][j] = Math.min(dp[i][j], dp[i - 2][j - 2] + 1);
            }
        }
    }

    // Traceback
    const userParts = [];
    const correctParts = [];
    let i = m, j = n;

    while (i > 0 || j > 0) {
        if (i > 0 && j > 0) {
            const cost = charsMatch(uChars[i - 1], cChars[j - 1]) ? 0 : 1;
            if (dp[i][j] === dp[i - 1][j - 1] + cost) {
                if (cost === 0) {
                    userParts.push(`<span class="diff-char correct">${escapeHtml(uChars[i - 1])}</span>`);
                    correctParts.push(`<span class="diff-char correct">${escapeHtml(cChars[j - 1])}</span>`);
                } else {
                    userParts.push(`<span class="diff-char wrong">${escapeHtml(uChars[i - 1])}</span>`);
                    correctParts.push(`<span class="diff-char expected">${escapeHtml(cChars[j - 1])}</span>`);
                }
                i--; j--;
                continue;
            }
            // Check transposition
            if (i > 1 && j > 1 && charsMatch(uChars[i - 1], cChars[j - 2]) && charsMatch(uChars[i - 2], cChars[j - 1]) && dp[i][j] === dp[i - 2][j - 2] + 1) {
                userParts.push(`<span class="diff-char wrong">${escapeHtml(uChars[i - 1])}</span>`);
                userParts.push(`<span class="diff-char wrong">${escapeHtml(uChars[i - 2])}</span>`);
                correctParts.push(`<span class="diff-char expected">${escapeHtml(cChars[j - 1])}</span>`);
                correctParts.push(`<span class="diff-char expected">${escapeHtml(cChars[j - 2])}</span>`);
                i -= 2; j -= 2;
                continue;
            }
        }
        if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
            userParts.push(`<span class="diff-char wrong">${escapeHtml(uChars[i - 1])}</span>`);
            i--;
            continue;
        }
        if (j > 0 && dp[i][j] === dp[i][j - 1] + 1) {
            correctParts.push(`<span class="diff-char expected">${escapeHtml(cChars[j - 1])}</span>`);
            j--;
            continue;
        }
        break;
    }

    return {
        userHtml: userParts.reverse().join(''),
        correctHtml: correctParts.reverse().join('')
    };
}

function charsMatch(a, b) {
    if (a === b) return true;
    // Case insensitive
    if (a.toLowerCase() === b.toLowerCase()) return true;
    // Accent-tolerant: normalize and compare
    const na = a.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const nb = b.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    return na === nb;
}

function recordAnswer(wordId, isCorrect) {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const word = list.words.find(w => w.id === wordId);
    if (!word) return;

    ensureWordMetadata(word);

    if (isCorrect) {
        word.stats.correct += 1;
    } else {
        word.stats.wrong += 1;
    }

    applyHintPenaltyIfNeeded(wordId, isCorrect);

    studySession.sessionResults[wordId] = studySession.sessionResults[wordId] || { correct: 0, wrong: 0 };
    if (isCorrect) {
        studySession.sessionResults[wordId].correct += 1;
    } else {
        studySession.sessionResults[wordId].wrong += 1;
    }

    saveData();
}

function overrideAnswerToCorrect(wordId) {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const word = list.words.find(w => w.id === wordId);
    if (!word) return;

    if (!word.stats) {
        word.stats = { correct: 0, wrong: 0 };
    }

    if (word.stats.wrong > 0) {
        word.stats.wrong -= 1;
    }
    word.stats.correct += 1;

    studySession.sessionResults[wordId] = studySession.sessionResults[wordId] || { correct: 0, wrong: 0 };
    if (studySession.sessionResults[wordId].wrong > 0) {
        studySession.sessionResults[wordId].wrong -= 1;
    }
    studySession.sessionResults[wordId].correct += 1;

    if (studySession.wrongCount > 0) {
        studySession.wrongCount -= 1;
    }
    studySession.correctCount += 1;

    saveData();
}

function acceptIntendedTyping(wordId) {
    overrideAnswerToCorrect(wordId);
    playCorrectSound();
    const progress = studySession.typingProgress[wordId];
    if (progress) {
        if (progress.needsExtraCorrect > 0) {
            progress.needsExtraCorrect--;
        }
        if (progress.needsExtraCorrect === 0) {
            progress.completed = true;
        } else {
            progress.cooldown = Math.max(progress.cooldown, 3);
        }
        updateTypingProgress();
    }
    saveActiveSession();
    showNextTypingQuestion();
}

function acceptIntendedStepTyping(wordId) {
    overrideAnswerToCorrect(wordId);
    playCorrectSound();
    const progress = studySession.wordProgress[wordId];
    if (progress) {
        if (progress.typingRemaining > 0) {
            progress.typingRemaining--;
        }
        if (progress.typingRemaining === 0) {
            markWordLearned(wordId);
        } else {
            progress.typingCooldown = Math.max(progress.typingCooldown, 3);
        }
        updateStepsProgress();
    }
    saveActiveSession();
    showNextStepQuestion();
}

function acceptIntendedTypingReview(wordId) {
    overrideAnswerToCorrect(wordId);
    playCorrectSound();
    if (!studySession.typingReviewCorrectIds) studySession.typingReviewCorrectIds = [];
    if (!studySession.typingReviewCorrectIds.includes(wordId)) {
        studySession.typingReviewCorrectIds.push(wordId);
    }
    updateTypingProgress();
    saveActiveSession();
    continueTypingReview();
}

function acceptIntendedStepReview(wordId) {
    overrideAnswerToCorrect(wordId);
    playCorrectSound();
    if (!studySession.stepsReviewCorrectIds) studySession.stepsReviewCorrectIds = [];
    if (!studySession.stepsReviewCorrectIds.includes(wordId)) {
        studySession.stepsReviewCorrectIds.push(wordId);
    }
    updateStepsProgress();
    saveActiveSession();
    continueStepReviewTyping();
}

function calculateGrade(correct, wrong) {
    const total = correct + wrong;
    if (total === 0) return '10.0';
    const accuracy = correct / total;
    const grade = 1 + accuracy * 9;
    return grade.toFixed(1);
}

function finalizeSessionStats() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;
    const summary = document.getElementById('complete-summary');
    if (!summary) return;

    if (isExamModeActive()) {
        const examRows = renderExamSummary();
        summary.innerHTML = examRows || '<p class="summary-empty">Geen antwoorden geregistreerd.</p>';
        return;
    }

    const wordsById = list.words.reduce((acc, w) => {
        acc[w.id] = w;
        return acc;
    }, {});

    const rows = Object.entries(studySession.sessionResults).map(([wordId, stats]) => {
        const word = wordsById[wordId];
        if (!word) return '';
        return `
            <div class="summary-row">
                <span class="summary-term">${escapeHtml(word.term)}</span>
                <span class="summary-def">${escapeHtml(word.definition)}</span>
                <span class="summary-stats">Goed: ${stats.correct} • Fout: ${stats.wrong}</span>
            </div>
        `;
    }).join('');

    summary.innerHTML = rows || '<p class="summary-empty">Geen antwoorden geregistreerd.</p>';
}

function saveActiveSession() {
    if (!currentListId || !currentStudyMode) return;
    const payload = {
        listId: currentListId,
        mode: currentStudyMode,
        state: studySession,
        savedAt: new Date().toISOString()
    };
    localStorage.setItem('activeStudySession', JSON.stringify(payload));
}

function clearActiveSession() {
    localStorage.removeItem('activeStudySession');
}

function updateResumeBanner() {
    const banner = document.getElementById('resume-banner');
    const text = document.getElementById('resume-text');
    if (!banner || !text) return;

    const raw = localStorage.getItem('activeStudySession');
    if (!raw) {
        banner.classList.add('hidden');
        return;
    }

    const data = JSON.parse(raw);
    if (!data || data.listId !== currentListId) {
        banner.classList.add('hidden');
        return;
    }

    banner.classList.remove('hidden');
    text.textContent = `Je hebt een sessie openstaan (${data.mode}).`;
}

function resumeStudy() {
    const raw = localStorage.getItem('activeStudySession');
    if (!raw) return;
    const data = JSON.parse(raw);
    if (!data || data.listId !== currentListId) return;

    studySession = data.state;
    currentStudyMode = data.mode;

    closeSettingsModal();

    switch (currentStudyMode) {
        case 'steps':
            showView('study-steps-view');
            updateStepsProgress();
            if (studySession.stepsReviewMode) {
                showNextStepsReviewQuestion();
            } else {
                showNextStepQuestion();
            }
            break;
        case 'typing':
            showView('study-typing-view');
            updateTypingProgress();
            if (studySession.typingReviewMode) {
                showNextTypingReviewQuestion();
            } else {
                showNextTypingQuestion();
            }
            break;
        case 'exam':
            showView('study-exam-view');
            updateExamProgress();
            showNextExamQuestion();
            break;
    }
}
