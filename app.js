// ===== Data Storage =====
let wordLists = JSON.parse(localStorage.getItem('wordLists')) || [];
let currentListId = null;
let currentStudyMode = null;
let editingListId = null;

// Study session state
let studySession = {
    words: [],
    currentIndex: 0,
    direction: 'term-def',
    acceptSlash: true,
    ignoreParentheses: true,
    correctCount: 0,
    wrongCount: 0,
    // Steps mode specific
    currentBatch: [],
    learnedWords: [],
    currentPhase: 'flashcard', // flashcard, choice, typing
    phaseIndex: 0,
    wrongInSession: [],
    wordProgress: {}, // Track progress per word: {flashcard: done, choice: done, typing: needsCorrect}
    // Typing mode specific
    typingProgress: {}, // wordId: {correctInARow: 0, needsExtraCorrect: 0}
    // Flashcards mode specific
    flashcardsDeck: [],
    flashcardsWrong: [],
    flashcardsCorrect: []
};

let flashcardSwipe = {
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    active: false,
    startTime: 0
};

let flashcardAnimating = false;
let flashcardHandlersAttached = false;

// ===== Save Data =====
function saveData() {
    localStorage.setItem('wordLists', JSON.stringify(wordLists));
}

// ===== Navigation =====
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewId.replace('-view', '')) {
            btn.classList.add('active');
        }
    });
}

function showHome() {
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
    
    document.getElementById('list-detail-icon').className = `fas ${list.icon || 'fa-book'}`;
    document.getElementById('list-detail-title').textContent = list.title;
    document.getElementById('list-detail-meta').textContent = 
        `${list.words.length} woordjes • ${list.langFrom} → ${list.langTo}`;
    
    // Update direction labels
    document.getElementById('dir-term-def').textContent = `${list.langFrom} → ${list.langTo}`;
    document.getElementById('dir-def-term').textContent = `${list.langTo} → ${list.langFrom}`;
    
    renderWordsPreview(list.words);
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
    
    container.innerHTML = wordLists.map(list => `
        <div class="word-list-card" onclick="showListDetail('${list.id}')">
            <div class="card-header">
                <div class="card-icon">
                    <i class="fas ${list.icon || 'fa-book'}"></i>
                </div>
                <div>
                    <div class="card-title">${escapeHtml(list.title)}</div>
                    <div class="card-meta">${list.words.length} woordjes</div>
                </div>
            </div>
            <div class="card-languages">
                <span>${escapeHtml(list.langFrom)}</span>
                <i class="fas fa-arrow-right"></i>
                <span>${escapeHtml(list.langTo)}</span>
            </div>
        </div>
    `).join('');
}

function renderWordsPreview(words) {
    const container = document.getElementById('words-preview-list');
    container.innerHTML = words.map(word => `
        <div class="preview-word-item">
            <span class="term">${escapeHtml(word.term)}</span>
            <span class="definition">${escapeHtml(word.definition)}</span>
        </div>
    `).join('');
}

// ===== Word Entry Management =====
function addWordEntry(term = '', definition = '') {
    const wordsList = document.getElementById('words-list');
    const entryNum = wordsList.children.length + 1;
    
    const entry = document.createElement('div');
    entry.className = 'word-entry';
    entry.innerHTML = `
        <span class="entry-number">${entryNum}</span>
        <input type="text" class="word-term" placeholder="Woord" value="${escapeHtml(term)}">
        <input type="text" class="word-definition" placeholder="Vertaling" value="${escapeHtml(definition)}">
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
    });
});

// ===== Import =====
function toggleImport() {
    document.getElementById('import-area').classList.toggle('hidden');
}

function importWords() {
    const text = document.getElementById('import-text').value;
    const lines = text.trim().split('\n');
    
    lines.forEach(line => {
        const parts = line.split('\t');
        if (parts.length >= 2) {
            addWordEntry(parts[0].trim(), parts[1].trim());
        }
    });
    
    document.getElementById('import-text').value = '';
    document.getElementById('import-area').classList.add('hidden');
}

// ===== Save List =====
function saveList() {
    const title = document.getElementById('list-title').value.trim();
    const langFrom = document.getElementById('lang-from').value.trim();
    const langTo = document.getElementById('lang-to').value.trim();
    const subject = document.getElementById('selected-subject').value;
    const icon = document.getElementById('selected-icon').value || 'fa-book';
    
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
            words.push({
                id: generateId(),
                term,
                definition
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
                words
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
            createdAt: new Date().toISOString()
        };
        wordLists.push(newList);
    }
    
    saveData();
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
    list.words.forEach(word => addWordEntry(word.term, word.definition));
    
    showView('create-view');
}

function deleteCurrentList() {
    if (!confirm('Weet je zeker dat je deze woordenlijst wilt verwijderen?')) return;
    
    wordLists = wordLists.filter(l => l.id !== currentListId);
    saveData();
    showHome();
}

function exportCurrentList() {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const header = `Titel:\t${list.title}\nTalen:\t${list.langFrom} -> ${list.langTo}\n\n`;
    const content = list.words.map(w => `${w.term}\t${w.definition}`).join('\n');
    const blob = new Blob([header + content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    const safeTitle = list.title.replace(/[^a-z0-9\-_]+/gi, '_').toLowerCase();
    a.href = url;
    a.download = `${safeTitle || 'woordenlijst'}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ===== Study Mode Settings =====
function startStudyMode(mode) {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list || list.words.length === 0) return;
    
    currentStudyMode = mode;
    
    // Show typing settings only for modes that use typing
    const typingSettings = document.getElementById('typing-settings');
    typingSettings.classList.toggle('hidden', mode === 'flashcards');
    
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
    
    studySession = {
        ...studySession,
        direction,
        acceptSlash,
        ignoreParentheses,
        correctCount: 0,
        wrongCount: 0
    };
    
    closeSettingsModal();
    
    switch (currentStudyMode) {
        case 'steps':
            initStepsMode();
            break;
        case 'typing':
            initTypingMode();
            break;
        case 'flashcards':
            initFlashcardsMode();
            break;
    }
}

// ===== Answer Checking =====
function normalizeAnswer(answer, acceptSlash, ignoreParentheses) {
    let normalized = answer.toLowerCase().trim();
    
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
    
    // Check slash alternatives
    if (acceptSlash && correctAnswer.includes('/')) {
        const alternatives = correctAnswer.split('/').map(a => 
            normalizeAnswer(a.trim(), false, ignoreParentheses)
        );
        if (alternatives.includes(normalizedUser)) return true;
    }
    
    return false;
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

// ===== STEPS MODE (STAMPEN) =====
function initStepsMode() {
    const list = wordLists.find(l => l.id === currentListId);

    studySession.words = shuffleArray([...list.words]);
    studySession.learnedWords = [];
    studySession.currentBatch = [];
    studySession.nextWordIndex = 0;
    studySession.currentPhase = 'flashcard';
    studySession.batchIndex = 0;
    studySession.choiceQueue = [];
    studySession.typingQueue = [];
    studySession.wordProgress = {};

    studySession.words.forEach(word => {
        studySession.wordProgress[word.id] = {
            typingNeedsExtra: 0
        };
    });

    fillStampenBatch();

    showView('study-steps-view');
    updateStepsProgress();
    showNextStepQuestion();
}

function fillStampenBatch() {
    while (studySession.currentBatch.length < 4 && studySession.nextWordIndex < studySession.words.length) {
        const nextWord = studySession.words[studySession.nextWordIndex];
        studySession.currentBatch.push(nextWord);
        studySession.nextWordIndex++;
    }
}

function updateStepsProgress() {
    const total = studySession.words.length;
    const learned = studySession.learnedWords.length;
    const percent = (learned / total) * 100;

    document.getElementById('steps-progress').style.width = `${percent}%`;
    document.getElementById('steps-progress-text').textContent = `${learned}/${total}`;
}

function showNextStepQuestion() {
    if (studySession.learnedWords.length === studySession.words.length) {
        showComplete();
        return;
    }

    if (studySession.currentBatch.length === 0) {
        fillStampenBatch();
    }

    if (studySession.currentPhase === 'flashcard') {
        if (studySession.batchIndex >= studySession.currentBatch.length) {
            studySession.currentPhase = 'choice';
            studySession.choiceQueue = studySession.currentBatch.map(w => w.id);
            showNextStepQuestion();
            return;
        }

        const word = studySession.currentBatch[studySession.batchIndex];
        const qa = getQuestion(word);
        showStepFlashcard(word, qa);
        return;
    }

    if (studySession.currentPhase === 'choice') {
        if (studySession.choiceQueue.length === 0) {
            studySession.currentPhase = 'typing';
            studySession.typingQueue = studySession.currentBatch.map(w => w.id);
            showNextStepQuestion();
            return;
        }

        const wordId = studySession.choiceQueue[0];
        const word = studySession.currentBatch.find(w => w.id === wordId);
        if (!word) {
            studySession.choiceQueue.shift();
            showNextStepQuestion();
            return;
        }
        const qa = getQuestion(word);
        showStepChoice(word, qa);
        return;
    }

    if (studySession.currentPhase === 'typing') {
        if (studySession.typingQueue.length === 0) {
            fillStampenBatch();
            studySession.currentPhase = 'flashcard';
            studySession.batchIndex = 0;
            showNextStepQuestion();
            return;
        }

        const wordId = studySession.typingQueue[0];
        const word = studySession.currentBatch.find(w => w.id === wordId);
        if (!word) {
            studySession.typingQueue.shift();
            showNextStepQuestion();
            return;
        }
        const qa = getQuestion(word);
        showStepTyping(word, qa);
    }
}

function showStepFlashcard(word, qa) {
    const content = document.getElementById('steps-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-clone"></i> Woordkaartje
            </div>
            <div class="flip-card" id="step-flip-card" onclick="flipStepCard()">
                <div class="flip-card-inner">
                    <div class="flip-card-front">
                        <p>${escapeHtml(qa.question)}</p>
                    </div>
                    <div class="flip-card-back">
                        <p>${escapeHtml(qa.answer)}</p>
                    </div>
                </div>
            </div>
            <p class="flip-hint">Klik om om te draaien</p>
            <button class="btn btn-primary btn-next hidden" id="step-next-btn" onclick="completeStepFlashcard()">
                <i class="fas fa-arrow-right"></i> Volgende
            </button>
        </div>
    `;
}

function flipStepCard() {
    const card = document.getElementById('step-flip-card');
    card.classList.toggle('flipped');
    document.getElementById('step-next-btn').classList.remove('hidden');
}

function completeStepFlashcard() {
    studySession.batchIndex++;
    showNextStepQuestion();
}

function showStepChoice(word, qa) {
    const list = wordLists.find(l => l.id === currentListId);
    const otherWords = list.words.filter(w => w.id !== word.id);
    const wrongOptions = shuffleArray(otherWords).slice(0, 3).map(w =>
        qa.isTermToDef ? w.definition : w.term
    );
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
                    <button class="choice-btn" onclick="checkStepChoice(this, '${escapeHtml(opt).replace(/'/g, "\\'")}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                        ${escapeHtml(opt)}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function checkStepChoice(btn, selected, correct) {
    const isCorrect = checkAnswer(selected, correct);
    const buttons = document.querySelectorAll('.choice-btn');

    buttons.forEach(b => {
        b.disabled = true;
        if (checkAnswer(b.textContent.trim(), correct)) {
            b.classList.add('correct');
        }
    });

    if (isCorrect) {
        btn.classList.add('correct');
        studySession.correctCount++;
        playCorrectSound();
        studySession.choiceQueue.shift();
    } else {
        btn.classList.add('wrong');
        studySession.wrongCount++;
        const wordId = studySession.choiceQueue.shift();
        studySession.choiceQueue.push(wordId);
    }

    setTimeout(() => showNextStepQuestion(), 700);
}

function showStepTyping(word, qa) {
    const progress = studySession.wordProgress[word.id];
    const extraNeeded = progress.typingNeedsExtra > 0
        ? `<p class="extra-hint">Nog ${progress.typingNeedsExtra}x goed typen</p>`
        : '';

    const content = document.getElementById('steps-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-keyboard"></i> Typen
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            ${extraNeeded}
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-typing-input"
                       placeholder="Type je antwoord..." autofocus
                       onkeydown="if(event.key==='Enter') checkStepTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                <button class="btn btn-primary typing-submit" onclick="checkStepTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
            <div id="step-typing-feedback"></div>
        </div>
    `;

    setTimeout(() => document.getElementById('step-typing-input').focus(), 100);
}

function checkStepTyping(wordId, correct) {
    const input = document.getElementById('step-typing-input');
    const feedback = document.getElementById('step-typing-feedback');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const progress = studySession.wordProgress[wordId];

    input.classList.remove('correct', 'wrong');

    if (isCorrect) {
        input.classList.add('correct');
        studySession.correctCount++;
        playCorrectSound();

        if (progress.typingNeedsExtra > 0) {
            progress.typingNeedsExtra--;
        }

        if (progress.typingNeedsExtra === 0) {
            markWordLearned(wordId);
            studySession.typingQueue.shift();
            updateStepsProgress();
            setTimeout(() => showNextStepQuestion(), 600);
            return;
        }

        feedback.innerHTML = `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed! Nog ${progress.typingNeedsExtra}x
            </div>
        `;
        input.value = '';
        input.focus();
    } else {
        input.classList.add('wrong');
        studySession.wrongCount++;
        
        // Move word to end of queue with 4-word delay
        const currentWord = studySession.currentBatch.find(w => w.id === wordId);
        if (currentWord) {
            studySession.typingQueue.shift();
            studySession.typingQueue.push(wordId);
            
            // Store that this word needs 2 extra correct tries
            progress.typingNeedsExtra = 2;
        }

        feedback.innerHTML = `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout. Je krijgt dit woord later opnieuw.
            </div>
        `;
        input.value = '';
        input.focus();
        
        setTimeout(() => showNextStepQuestion(), 800);
    }
}

function markWordLearned(wordId) {
    if (!studySession.learnedWords.includes(wordId)) {
        studySession.learnedWords.push(wordId);
        studySession.currentBatch = studySession.currentBatch.filter(w => w.id !== wordId);
        fillStampenBatch();
    }
}

// ===== TYPING MODE =====
function initTypingMode() {
    const list = wordLists.find(l => l.id === currentListId);
    
    studySession.words = shuffleArray([...list.words]);
    studySession.currentIndex = 0;
    studySession.typingProgress = {};
    
    studySession.words.forEach(word => {
        studySession.typingProgress[word.id] = {
            correctInARow: 0,
            needsExtraCorrect: 0,
            completed: false
        };
    });
    
    showView('study-typing-view');
    updateTypingProgress();
    showNextTypingQuestion();
}

function updateTypingProgress() {
    const total = studySession.words.length;
    const completed = Object.values(studySession.typingProgress).filter(p => p.completed).length;
    const percent = (completed / total) * 100;
    
    document.getElementById('typing-progress').style.width = `${percent}%`;
    document.getElementById('typing-progress-text').textContent = `${completed}/${total}`;
}

function showNextTypingQuestion() {
    // Find next incomplete word
    const incompleteWord = studySession.words.find(w => 
        !studySession.typingProgress[w.id].completed
    );
    
    if (!incompleteWord) {
        showComplete();
        return;
    }
    
    const qa = getQuestion(incompleteWord);
    const progress = studySession.typingProgress[incompleteWord.id];
    const extraHint = progress.needsExtraCorrect > 0 
        ? `<p class="extra-hint">Nog ${progress.needsExtraCorrect}x goed typen</p>` 
        : '';
    
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
                       placeholder="Type je antwoord..." autofocus
                       onkeydown="if(event.key==='Enter') checkTypingAnswer('${incompleteWord.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                <button class="btn btn-primary typing-submit" onclick="checkTypingAnswer('${incompleteWord.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
            <div id="typing-feedback"></div>
        </div>
    `;
    
    setTimeout(() => document.getElementById('typing-input').focus(), 100);
}

function checkTypingAnswer(wordId, correct) {
    const input = document.getElementById('typing-input');
    const feedback = document.getElementById('typing-feedback');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const progress = studySession.typingProgress[wordId];

    input.classList.remove('correct', 'wrong');

    if (isCorrect) {
        input.classList.add('correct');
        studySession.correctCount++;
        playCorrectSound();

        if (progress.needsExtraCorrect > 0) {
            progress.needsExtraCorrect--;
        }

        if (progress.needsExtraCorrect === 0) {
            progress.completed = true;
            feedback.innerHTML = `
                <div class="feedback-message correct">
                    <i class="fas fa-check-circle"></i> Goed!
                </div>
            `;
            updateTypingProgress();
            setTimeout(() => showNextTypingQuestion(), 600);
            return;
        }

        feedback.innerHTML = `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed! Nog ${progress.needsExtraCorrect}x
            </div>
        `;
        input.value = '';
        input.focus();
    } else {
        input.classList.add('wrong');
        studySession.wrongCount++;
        
        // Move to end with 4-word delay
        const incompleteWord = studySession.words.find(w => 
            !studySession.typingProgress[w.id].completed
        );
        
        if (incompleteWord && incompleteWord.id === wordId) {
            // Move this word to end of incomplete list
            const reordered = [];
            let foundWord = false;
            
            for (const w of studySession.words) {
                if (!studySession.typingProgress[w.id].completed) {
                    if (w.id === wordId && !foundWord) {
                        foundWord = true;
                    } else {
                        reordered.push(w);
                    }
                }
            }
            
            if (foundWord) {
                reordered.push(studySession.words.find(w => w.id === wordId));
            }
            
            // Reorder words array so wrong word appears later
            const completed = studySession.words.filter(w => studySession.typingProgress[w.id].completed);
            studySession.words = completed.concat(reordered);
            
            progress.needsExtraCorrect = 2;
        }

        feedback.innerHTML = `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout. Je krijgt dit woord later opnieuw.
            </div>
        `;
        input.value = '';
        input.focus();
        
        setTimeout(() => showNextTypingQuestion(), 800);
    }
}

// ===== FLASHCARDS MODE =====
function initFlashcardsMode() {
    const list = wordLists.find(l => l.id === currentListId);
    
    studySession.flashcardsDeck = shuffleArray([...list.words]);
    studySession.flashcardsWrong = [];
    studySession.flashcardsCorrect = [];
    studySession.currentIndex = 0;
    
    showView('study-flashcards-view');
    updateFlashcardsProgress();
    showCurrentFlashcard();
    
    // Add keyboard listener
    document.addEventListener('keydown', handleFlashcardKeys);

    ensureFlashcardSwipeHandlers();
}

function handleFlashcardKeys(e) {
    if (!document.getElementById('study-flashcards-view').classList.contains('active')) {
        return;
    }
    
    switch (e.key) {
        case ' ':
        case 'ArrowUp':
        case 'ArrowDown':
            e.preventDefault();
            toggleFlashcard();
            break;
        case 'ArrowLeft':
            e.preventDefault();
            markFlashcard(false);
            break;
        case 'ArrowRight':
            e.preventDefault();
            markFlashcard(true);
            break;
    }
}

function ensureFlashcardSwipeHandlers() {
    if (flashcardHandlersAttached) return;
    const flashcard = document.getElementById('flashcard');
    if (!flashcard) return;

    // Mouse events
    flashcard.addEventListener('mousedown', onFlashcardPointerDown);
    document.addEventListener('mousemove', onFlashcardPointerMove);
    document.addEventListener('mouseup', onFlashcardPointerUp);
    
    // Touch events
    flashcard.addEventListener('touchstart', onFlashcardPointerDown);
    document.addEventListener('touchmove', onFlashcardPointerMove, { passive: false });
    document.addEventListener('touchend', onFlashcardPointerUp);
    document.addEventListener('touchcancel', onFlashcardPointerCancel);

    flashcardHandlersAttached = true;
}

function onFlashcardPointerDown(e) {
    if (!document.getElementById('study-flashcards-view').classList.contains('active')) {
        return;
    }
    if (flashcardAnimating) return;
    
    flashcardSwipe.active = true;
    flashcardSwipe.startX = e.clientX || e.touches?.[0]?.clientX || 0;
    flashcardSwipe.startY = e.clientY || e.touches?.[0]?.clientY || 0;
    flashcardSwipe.currentX = flashcardSwipe.startX;
    flashcardSwipe.currentY = flashcardSwipe.startY;
    flashcardSwipe.startTime = Date.now();
}

function onFlashcardPointerMove(e) {
    if (!flashcardSwipe.active) return;
    
    const flashcard = document.getElementById('flashcard');
    flashcardSwipe.currentX = e.clientX || e.touches?.[0]?.clientX || 0;
    flashcardSwipe.currentY = e.clientY || e.touches?.[0]?.clientY || 0;
    
    const deltaX = flashcardSwipe.currentX - flashcardSwipe.startX;
    const deltaY = flashcardSwipe.currentY - flashcardSwipe.startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        e.preventDefault?.();
        const rotate = Math.max(Math.min(deltaX / 20, 15), -15);
        const scale = 1 - Math.abs(deltaX) / 1000;
        flashcard.style.transform = `translateX(${deltaX}px) rotate(${rotate}deg) scale(${Math.max(0.8, scale)})`;
        flashcard.style.opacity = Math.max(0.3, 1 - Math.abs(deltaX) / 500);
    }
}

function onFlashcardPointerUp(e) {
    if (!flashcardSwipe.active) return;
    flashcardSwipe.active = false;

    const flashcard = document.getElementById('flashcard');
    const deltaX = flashcardSwipe.currentX - flashcardSwipe.startX;
    const deltaY = flashcardSwipe.currentY - flashcardSwipe.startY;
    const duration = Date.now() - flashcardSwipe.startTime;

    // Check if swipe is significant
    const minDistance = 60;
    const maxDuration = 1000;
    const isSignificantSwipe = Math.abs(deltaX) > minDistance && 
                              Math.abs(deltaX) > Math.abs(deltaY) && 
                              duration < maxDuration;

    flashcard.style.transition = 'all 0.3s ease';
    
    if (isSignificantSwipe) {
        markFlashcard(deltaX > 0);
    } else {
        flashcard.style.transform = '';
        flashcard.style.opacity = '1';
        setTimeout(() => {
            flashcard.style.transition = '';
        }, 300);
    }
}

function onFlashcardPointerCancel() {
    flashcardSwipe.active = false;
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.style.transform = '';
        flashcard.style.opacity = '1';
    }
}

function updateFlashcardsProgress() {
    const total = studySession.flashcardsDeck.length + 
                  studySession.flashcardsCorrect.length + 
                  studySession.flashcardsWrong.length;
    const correct = studySession.flashcardsCorrect.length;
    const percent = (correct / total) * 100;
    
    document.getElementById('flashcards-progress').style.width = `${percent}%`;
    document.getElementById('flashcards-progress-text').textContent = 
        `${correct}/${total} goed`;
}

function showCurrentFlashcard() {
    if (studySession.flashcardsDeck.length === 0) {
        if (studySession.flashcardsWrong.length > 0) {
            // Reshuffle wrong cards
            studySession.flashcardsDeck = shuffleArray([...studySession.flashcardsWrong]);
            studySession.flashcardsWrong = [];
            showCurrentFlashcard();
        } else {
            // Complete!
            document.removeEventListener('keydown', handleFlashcardKeys);
            showComplete();
        }
        return;
    }
    
    const word = studySession.flashcardsDeck[0];
    const qa = getQuestion(word);
    
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flipped');
    flashcard.classList.remove('swipe-left', 'swipe-right');
    flashcard.style.transform = '';
    
    document.getElementById('flashcard-term').textContent = qa.question;
    document.getElementById('flashcard-definition').textContent = qa.answer;
}

function toggleFlashcard() {
    document.getElementById('flashcard').classList.toggle('flipped');
}

function markFlashcard(correct) {
    if (studySession.flashcardsDeck.length === 0) return;

    if (flashcardAnimating) return;
    flashcardAnimating = true;

    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('swipe-left', 'swipe-right');
    flashcard.classList.add(correct ? 'swipe-right' : 'swipe-left');

    setTimeout(() => {
        const word = studySession.flashcardsDeck.shift();

        if (correct) {
            studySession.flashcardsCorrect.push(word);
            studySession.correctCount++;
            playCorrectSound();
        } else {
            studySession.flashcardsWrong.push(word);
            studySession.wrongCount++;
        }

        updateFlashcardsProgress();
        showCurrentFlashcard();
        flashcardAnimating = false;
    }, 300);
}

// Flashcard click handler
document.getElementById('flashcard')?.addEventListener('click', toggleFlashcard);

// ===== Complete & Exit =====
function showComplete() {
    document.getElementById('stat-correct').textContent = studySession.correctCount;
    document.getElementById('stat-wrong').textContent = studySession.wrongCount;
    
    const accuracy = studySession.correctCount + studySession.wrongCount > 0
        ? Math.round((studySession.correctCount / (studySession.correctCount + studySession.wrongCount)) * 100)
        : 100;
    
    document.getElementById('complete-message').textContent = 
        `Je hebt alle woordjes geoefend met ${accuracy}% nauwkeurigheid!`;
    
    playCompleteSound();
    createConfetti();
    
    showView('complete-view');
}

function restartStudy() {
    confirmStartStudy();
}

function exitStudy() {
    document.removeEventListener('keydown', handleFlashcardKeys);
    showListDetail(currentListId);
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

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    renderWordLists();
    
    // Setup language search filters
    setupLanguageSearch();
    
    // Re-attach flashcard click handler
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.addEventListener('click', toggleFlashcard);
    }
});

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

function filterLanguageSelect(searchTerm, selectElement) {
    const options = selectElement.querySelectorAll('option');
    const term = searchTerm.toLowerCase();

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
