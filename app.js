// ===== Data Storage =====
let wordLists = JSON.parse(localStorage.getItem('wordLists')) || [];
let currentListId = null;
let currentStudyMode = null;
let editingListId = null;

// Supabase auth
let supabaseClient = null;
let authUser = null;
let authMode = 'login';
let publicSearchTimer = null;

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
    currentPhase: 'flashcard', // flashcard, choice, typing
    phaseIndex: 0,
    wrongInSession: [],
    wordProgress: {}, // Track progress per word: {flashcard: done, choice: done, typing: needsCorrect}
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
    const publicToggle = document.getElementById('list-public');
    if (publicToggle) publicToggle.checked = false;
    
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
    
    container.innerHTML = wordLists.map(list => `
        <div class="word-list-card" onclick="showListDetail('${list.id}')">
            <div class="card-header">
                <div class="card-icon">
                    <i class="fas ${list.icon || 'fa-book'}"></i>
                </div>
                <div>
                    <div class="card-title">${escapeHtml(list.title)}</div>
                    <div class="card-meta">${list.words.length} woordjes${list.isPublic ? ' • Openbaar' : ''}</div>
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
    if (!selectedIds.length) return words;
    return words.filter(w => selectedIds.includes(w.id));
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
    const isPublic = document.getElementById('list-public')?.checked || false;
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
    if (publicToggle) publicToggle.checked = !!list.isPublic;
    
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

// ===== Supabase Auth & Sync =====
function initSupabase() {
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

    // Create the client
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Helpful console note about security: anon key is public; use RLS to protect data
    console.info('Supabase client initialized. Ensure you have created RLS policies (see README/SQL) to protect user data.');

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

    if (authUser) {
        if (loginBtn) loginBtn.classList.add('hidden');
        if (signupBtn) signupBtn.classList.add('hidden');
        if (logoutBtn) logoutBtn.classList.remove('hidden');
        if (userLabel) {
            userLabel.textContent = authUser.email;
            userLabel.classList.remove('hidden');
        }
        if (menuBtn) menuBtn.classList.add('logged-in');
    } else {
        if (loginBtn) loginBtn.classList.remove('hidden');
        if (signupBtn) signupBtn.classList.remove('hidden');
        if (logoutBtn) logoutBtn.classList.add('hidden');
        if (userLabel) {
            userLabel.textContent = '';
            userLabel.classList.add('hidden');
        }
        if (menuBtn) menuBtn.classList.remove('logged-in');
    }
}

function toggleAuthMenu(event) {
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

async function submitAuth() {
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

async function saveListToRemote(listId) {
    if (!supabaseClient || !authUser) return;
    const list = wordLists.find(l => l.id === listId);
    if (!list) return;

    const searchText = list.words.map(w => `${w.term} ${w.definition}`).join(' ').slice(0, 2000);

    const { error } = await supabaseClient
        .from('word_lists')
        .upsert({
            id: list.id,
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
        }, { onConflict: 'id' });

    if (error) {
        console.error('Save list failed', error);
        throw error;
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

function debouncedPublicSearch() {
    clearTimeout(publicSearchTimer);
    publicSearchTimer = setTimeout(() => {
        searchPublicLists();
    }, 250);
}

async function searchPublicLists() {
    const input = document.getElementById('public-search-input');
    const results = document.getElementById('public-search-results');
    if (!input || !results) return;

    const query = input.value.trim();
    if (!query) {
        results.innerHTML = '';
        return;
    }

    if (!supabaseClient) {
        results.innerHTML = '<p class="public-search-empty">Log in om te zoeken.</p>';
        return;
    }

    const { data, error } = await supabaseClient
        .from('word_lists')
        .select('id,title,lang_from,lang_to,subject,icon,words,user_id')
        .eq('is_public', true)
        .or(`title.ilike.%${query}%,search_text.ilike.%${query}%`)
        .order('updated_at', { ascending: false })
        .limit(20);

    if (error) {
        results.innerHTML = '<p class="public-search-empty">Zoeken mislukt.</p>';
        return;
    }

    if (!data || data.length === 0) {
        results.innerHTML = '<p class="public-search-empty">Geen resultaten.</p>';
        return;
    }

    results.innerHTML = data.map(list => `
        <div class="public-list-card">
            <div class="public-list-info">
                <div class="public-list-title">${escapeHtml(list.title)}</div>
                <div class="public-list-meta">${escapeHtml(list.lang_from)} → ${escapeHtml(list.lang_to)} • ${list.words?.length || 0} woordjes</div>
            </div>
            <button class="btn btn-primary" onclick="importPublicList('${list.id}')">
                <i class="fas fa-plus"></i> Importeer
            </button>
        </div>
    `).join('');
}

async function importPublicList(listId) {
    if (!supabaseClient) return;
    const { data, error } = await supabaseClient
        .from('word_lists')
        .select('*')
        .eq('id', listId)
        .single();

    if (error || !data) return;

    const newList = {
        id: generateId(),
        title: `${data.title} (kopie)`,
        langFrom: data.lang_from,
        langTo: data.lang_to,
        subject: data.subject,
        icon: data.icon,
        words: data.words || [],
        isPublic: false,
        createdAt: new Date().toISOString()
    };

    wordLists.push(newList);

    if (authUser) {
        await saveListToRemote(newList.id);
        await loadRemoteLists();
    } else {
        saveData();
        renderWordLists();
    }
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
    const selectedWordIds = getSelectedWordIdsForStudy();
    
    studySession = {
        ...studySession,
        direction,
        acceptSlash,
        ignoreParentheses,
        correctCount: 0,
        wrongCount: 0,
        sessionResults: {},
        selectedWordIds,
        stepsWrongWords: [],
        stepsReviewMode: false,
        stepsReviewQueue: [],
        stepsReviewIndex: 0
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

    clearActiveSession();
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
    
    return false;
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

// ===== STEPS MODE (STAMPEN) =====
function initStepsMode() {
    const list = wordLists.find(l => l.id === currentListId);

    const selectedWords = getStudyWordsFromSelection(list.words);
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
            phase: 'flashcard',
            done: false,
            typingRemaining: 0,
            typingCooldown: 0
        };
    });

    fillActiveSlots();

    showView('study-steps-view');
    updateStepsProgress();
    showNextStepQuestion();
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
    const total = studySession.words.length;
    const learned = studySession.learnedWords.length;
    const percent = (learned / total) * 100;

    document.getElementById('steps-progress').style.width = `${percent}%`;
    document.getElementById('steps-progress-text').textContent = `${learned}/${total}`;
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

    if (progress.phase === 'flashcard') {
        showStepFlashcard(word, qa);
        return;
    }

    if (progress.phase === 'choice') {
        showStepChoice(word, qa);
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
    const wordId = studySession.currentWordId;
    if (wordId && studySession.wordProgress[wordId]) {
        studySession.wordProgress[wordId].phase = 'choice';
    }
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
        if (studySession.wordProgress[wordId]) {
            studySession.wordProgress[wordId].phase = 'typing';
        }
    } else {
        btn.classList.add('wrong');
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        if (feedback) {
            feedback.innerHTML = `
                <div class="correct-answer-display">
                    Het juiste antwoord was: <strong>${escapeHtml(correct)}</strong>
                </div>
                <button class="btn btn-primary btn-next" onclick="continueStepChoice()">
                    <i class="fas fa-arrow-right"></i> Volgende vraag
                </button>
            `;
        }
    }

    recordAnswer(wordId, isCorrect);
    saveActiveSession();

    if (isCorrect) {
        setTimeout(() => showNextStepQuestion(), 900);
    }
}

function continueStepChoice() {
    showNextStepQuestion();
}

function showStepTyping(word, qa) {
    const content = document.getElementById('steps-content');
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-keyboard"></i> Typen
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-typing-input"
                       placeholder="Type je antwoord..." autofocus
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="step-typing-submit" onclick="checkStepTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
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
    const submitBtn = document.getElementById('step-typing-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const progress = studySession.wordProgress[wordId];

    input.classList.remove('correct', 'wrong');

    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        input.classList.add('correct');
        studySession.correctCount++;
        playCorrectSound();
        if (progress.typingRemaining > 0) {
            progress.typingRemaining--;
        }

        if (progress.typingRemaining === 0) {
            markWordLearned(wordId);
            updateStepsProgress();
            feedback.innerHTML = `
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
        feedback.innerHTML = `
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
        input.classList.add('wrong');
        studySession.wrongCount++;
        studySession.stepsWrongWords.push(wordId);
        progress.typingRemaining = 2;
        progress.typingCooldown = Math.max(progress.typingCooldown, 3);
        const diff = buildTypingDiff(userAnswer, correct);
        if (feedback) {
            feedback.innerHTML = `
                <div class="feedback-message wrong">
                    <i class="fas fa-times-circle"></i> Fout.
                </div>
                ${diff}
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
    showNextStepsReviewQuestion();
}

function showNextStepsReviewQuestion() {
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
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-repeat"></i> Herhaling (foute woorden)
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="step-review-input"
                       placeholder="Type je antwoord..." autofocus
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkStepReviewTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="step-review-submit" onclick="checkStepReviewTyping('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
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

    input.classList.remove('correct', 'wrong');

    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        input.classList.add('correct');
        feedback.innerHTML = `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed!
            </div>
            <button class="btn btn-primary btn-next" onclick="continueStepReviewTyping()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        `;
    } else {
        input.classList.add('wrong');
        const diff = buildTypingDiff(userAnswer, correct);
        feedback.innerHTML = `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
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
}

function continueStepReviewTyping() {
    studySession.stepsReviewIndex++;
    showNextStepsReviewQuestion();
}

// ===== TYPING MODE =====
function initTypingMode() {
    const list = wordLists.find(l => l.id === currentListId);

    const selectedWords = getStudyWordsFromSelection(list.words);
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
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkTypingAnswer('${nextWord.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="typing-submit" onclick="checkTypingAnswer('${nextWord.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
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
    const submitBtn = document.getElementById('typing-submit');
    const userAnswer = input.value;
    const isCorrect = checkAnswer(userAnswer, correct);
    const progress = studySession.typingProgress[wordId];

    input.classList.remove('correct', 'wrong');

    recordAnswer(wordId, isCorrect);

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
        feedback.innerHTML = `
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
        input.classList.add('wrong');
        studySession.wrongCount++;
        progress.needsExtraCorrect = 2;
        progress.cooldown = Math.max(progress.cooldown, 4);
        if (!studySession.typingWrongWords.includes(wordId)) {
            studySession.typingWrongWords.push(wordId);
        }
        const diff = buildTypingDiff(userAnswer, correct);
        feedback.innerHTML = `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
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
    showNextTypingReviewQuestion();
}

function showNextTypingReviewQuestion() {
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
    content.innerHTML = `
        <div class="question-card">
            <div class="question-type-label">
                <i class="fas fa-repeat"></i> Herhaling (foute woorden)
            </div>
            <div class="question-word">${escapeHtml(qa.question)}</div>
            <div class="typing-input-container">
                <input type="text" class="typing-input" id="typing-review-input" 
                       placeholder="Type je antwoord..." autofocus
                       onkeydown="if(event.key==='Enter'){ event.preventDefault(); event.stopPropagation(); checkTypingReview('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}'); }">
                <button class="btn btn-primary typing-submit" id="typing-review-submit" onclick="checkTypingReview('${word.id}', '${escapeHtml(qa.answer).replace(/'/g, "\\'")}')">
                    <i class="fas fa-check"></i> Controleer
                </button>
            </div>
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

    input.classList.remove('correct', 'wrong');
    recordAnswer(wordId, isCorrect);

    if (isCorrect) {
        input.classList.add('correct');
        feedback.innerHTML = `
            <div class="feedback-message correct">
                <i class="fas fa-check-circle"></i> Goed!
            </div>
            <button class="btn btn-primary btn-next" onclick="continueTypingReview()">
                <i class="fas fa-arrow-right"></i> Volgende vraag
            </button>
        `;
    } else {
        input.classList.add('wrong');
        const diff = buildTypingDiff(userAnswer, correct);
        feedback.innerHTML = `
            <div class="feedback-message wrong">
                <i class="fas fa-times-circle"></i> Fout.
            </div>
            ${diff}
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

// ===== FLASHCARDS MODE =====
function initFlashcardsMode() {
    const list = wordLists.find(l => l.id === currentListId);
    const selectedWords = getStudyWordsFromSelection(list.words);

    studySession.flashcardsDeck = shuffleArray([...selectedWords]);
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

    flashcard.style.transition = 'transform 0.25s ease, opacity 0.25s ease';

    if (isSignificantSwipe) {
        markFlashcard(deltaX > 0);
    } else {
        flashcard.style.transform = 'translateX(0) rotate(0) scale(1)';
        flashcard.style.opacity = '1';
        setTimeout(() => {
            flashcard.style.transition = '';
        }, 250);
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
    const list = wordLists.find(l => l.id === currentListId);
    
    const flashcard = document.getElementById('flashcard');
    flashcard.classList.remove('flipped');
    flashcard.classList.remove('swipe-left', 'swipe-right');
    flashcard.style.transform = '';
    flashcard.style.opacity = '1';
    flashcard.style.transition = '';
    
    document.getElementById('flashcard-term').textContent = qa.question;
    document.getElementById('flashcard-definition').textContent = qa.answer;

    const frontLabel = list ? (qa.isTermToDef ? list.langFrom : list.langTo) : 'WOORD';
    const backLabel = list ? (qa.isTermToDef ? list.langTo : list.langFrom) : 'BETEKENIS';
    const frontEl = document.getElementById('flashcard-label-front');
    const backEl = document.getElementById('flashcard-label-back');
    if (frontEl) frontEl.textContent = frontLabel || 'WOORD';
    if (backEl) backEl.textContent = backLabel || 'BETEKENIS';
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

        recordAnswer(word.id, correct);
        saveActiveSession();

        updateFlashcardsProgress();
        showCurrentFlashcard();
        flashcardAnimating = false;
    }, 300);
}

// Flashcard click handler
document.getElementById('flashcard')?.addEventListener('click', toggleFlashcard);

// ===== Complete & Exit =====
function showComplete() {
    finalizeSessionStats();
    document.getElementById('stat-correct').textContent = studySession.correctCount;
    document.getElementById('stat-wrong').textContent = studySession.wrongCount;
    
    const accuracy = studySession.correctCount + studySession.wrongCount > 0
        ? Math.round((studySession.correctCount / (studySession.correctCount + studySession.wrongCount)) * 100)
        : 100;
    
    const grade = calculateGrade(studySession.correctCount, studySession.wrongCount);
    const gradeValue = parseFloat(grade);
    let gradeClass = 'grade-mid';
    if (gradeValue < 5.5) {
        gradeClass = 'grade-low';
    } else if (gradeValue > 8) {
        gradeClass = 'grade-high';
    }
    document.getElementById('complete-message').innerHTML = 
        `Je hebt alle woordjes geoefend met ${accuracy}% nauwkeurigheid (cijfer <span class="grade-score ${gradeClass}">${grade}</span>).`;
    
    playCompleteSound();
    createConfetti();
    
    showView('complete-view');

    clearActiveSession();
}

function restartStudy() {
    confirmStartStudy();
}

function exitStudy() {
    document.removeEventListener('keydown', handleFlashcardKeys);
    saveActiveSession();
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

    initSupabase();
    
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
    
    // Re-attach flashcard click handler
    const flashcard = document.getElementById('flashcard');
    if (flashcard) {
        flashcard.addEventListener('click', toggleFlashcard);
    }
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

        const activeElement = document.activeElement;
        const isTypingField = activeElement && ['INPUT', 'TEXTAREA'].includes(activeElement.tagName) && !activeElement.disabled;
        if (isTypingField) return;

        const stepsView = document.getElementById('study-steps-view');
        const typingView = document.getElementById('study-typing-view');

        if (stepsView && stepsView.classList.contains('active')) {
            handleStepsKeyboard(e);
        }

        if (typingView && typingView.classList.contains('active')) {
            handleTypingKeyboard(e);
        }
    });
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
    }

    const flipCard = document.getElementById('step-flip-card');
    const nextBtn = document.getElementById('step-next-btn');
    if (flipCard) {
        if (e.code === 'Space') {
            e.preventDefault();
            flipStepCard();
            return;
        }
        if (e.code === 'Enter' && nextBtn && !nextBtn.classList.contains('hidden')) {
            e.preventDefault();
            nextBtn.click();
        }
    }

    const typingInput = document.getElementById('step-typing-input');
    const typingContinueBtn = document.querySelector('#step-typing-feedback .btn-next');
    if (typingInput && typingInput.disabled && typingContinueBtn && e.code === 'Enter') {
        e.preventDefault();
        typingContinueBtn.click();
    }
}

function handleTypingKeyboard(e) {
    const typingInput = document.getElementById('typing-input');
    const typingContinueBtn = document.querySelector('#typing-feedback .btn-next');
    if (typingInput && typingInput.disabled && typingContinueBtn && e.code === 'Enter') {
        e.preventDefault();
        typingContinueBtn.click();
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

function buildTypingDiff(userAnswer, correctAnswer) {
    const user = normalizeAnswer(userAnswer, false, studySession.ignoreParentheses);
    const correct = normalizeAnswer(correctAnswer, false, studySession.ignoreParentheses);

    const maxLen = Math.max(user.length, correct.length);
    const showDetailed = maxLen <= 3;

    if (!showDetailed) {
        return `
            <div class="correct-answer-display">
                Het juiste antwoord was: <strong>${escapeHtml(correct)}</strong>
            </div>
        `;
    }

    const userChars = [];
    const correctChars = [];

    for (let i = 0; i < maxLen; i++) {
        const u = user[i] || '';
        const c = correct[i] || '';

        if (!u && c) {
            userChars.push(`<span class="diff-char missing">•</span>`);
            correctChars.push(`<span class="diff-char expected">${escapeHtml(c)}</span>`);
            continue;
        }

        if (u && !c) {
            userChars.push(`<span class="diff-char wrong">${escapeHtml(u)}</span>`);
            correctChars.push(`<span class="diff-char expected">•</span>`);
            continue;
        }

        if (u === c) {
            userChars.push(`<span class="diff-char correct">${escapeHtml(u)}</span>`);
            correctChars.push(`<span class="diff-char correct">${escapeHtml(c)}</span>`);
        } else {
            userChars.push(`<span class="diff-char wrong">${escapeHtml(u)}</span>`);
            correctChars.push(`<span class="diff-char expected">${escapeHtml(c)}</span>`);
        }
    }

    return `
        <div class="typing-diff">
            <div class="diff-row">
                <span class="diff-label">Jij:</span>
                <span class="diff-text">${userChars.join('')}</span>
            </div>
            <div class="diff-row">
                <span class="diff-label">Juist:</span>
                <span class="diff-text">${correctChars.join('')}</span>
            </div>
        </div>
    `;
}

function recordAnswer(wordId, isCorrect) {
    const list = wordLists.find(l => l.id === currentListId);
    if (!list) return;

    const word = list.words.find(w => w.id === wordId);
    if (!word) return;

    if (!word.stats) {
        word.stats = { correct: 0, wrong: 0 };
    }

    if (isCorrect) {
        word.stats.correct += 1;
    } else {
        word.stats.wrong += 1;
    }

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
    const progress = studySession.typingProgress[wordId];
    if (progress) {
        progress.needsExtraCorrect = 0;
        progress.completed = true;
        updateTypingProgress();
    }
    saveActiveSession();
    showNextTypingQuestion();
}

function acceptIntendedStepTyping(wordId) {
    overrideAnswerToCorrect(wordId);
    const progress = studySession.wordProgress[wordId];
    if (progress) {
        progress.typingRemaining = 0;
        markWordLearned(wordId);
        updateStepsProgress();
    }
    saveActiveSession();
    showNextStepQuestion();
}

function acceptIntendedTypingReview(wordId) {
    overrideAnswerToCorrect(wordId);
    saveActiveSession();
    continueTypingReview();
}

function acceptIntendedStepReview(wordId) {
    overrideAnswerToCorrect(wordId);
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
        case 'flashcards':
            showView('study-flashcards-view');
            updateFlashcardsProgress();
            showCurrentFlashcard();
            document.addEventListener('keydown', handleFlashcardKeys);
            ensureFlashcardSwipeHandlers();
            break;
    }
}
