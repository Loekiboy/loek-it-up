// Loek it Up Importer - Content Script
// Leest StudyGo woordenlijsten en opent Loek it Up met vooraf ingevulde data

(function() {
    'use strict';

    // Default to local file path to Loek it Up index (can be overridden via localStorage)
    const LOEK_IT_UP_URL = localStorage.getItem('loek_it_up_url') || 'file:///C:/Users/loeko/OneDrive/Documenten/GitHub/loek-it-up/index.html';

    function isPrintPage() {
        return window.location.pathname.endsWith('/print-table');
    }

    function isListPage() {
        return /\/learn\/lists\//.test(window.location.pathname);
    }

    function waitForContent(callback, maxAttempts = 120) {
        let attempts = 0;

        const check = () => {
            attempts++;
            const content = document.body.innerText;

            if (content.length > 300 || attempts >= maxAttempts) {
                callback();
            } else {
                setTimeout(check, 50);
            }
        };

        check();
    }

    function extractMetaAndWords() {
        const text = document.body.innerText;
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

        const skipHeaders = [
            'home', 'oefenen', 'forum', 'lessen', 'zoeken',
            'terug naar lijst', 'lijst printen', 'tabel', 'kaartjes'
        ];

        const languages = [
            'nederlands', 'dutch', 'engels', 'english', 'frans', 'french', 'français',
            'duits', 'german', 'deutsch', 'spaans', 'spanish', 'español',
            'italiaans', 'italian', 'latijn', 'latin', 'grieks', 'greek'
        ];

        let title = '';
        let langFrom = '';
        let langTo = '';
        let wordStartIndex = 0;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            const lower = line.toLowerCase();
            if (skipHeaders.includes(lower)) continue;

            if (!title && !languages.includes(lower)) {
                title = line;
                continue;
            }

            if (languages.includes(lower)) {
                if (i + 1 < lines.length && languages.includes(lines[i + 1].trim().toLowerCase())) {
                    langFrom = line;
                    langTo = lines[i + 1].trim();
                    wordStartIndex = i + 2;
                    break;
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

            pairs.push({ word, translation });
        }

        return { title, langFrom, langTo, pairs };
    }

    function openInLoekItUp(meta) {
        const safeTitle = meta.title || 'Geïmporteerde lijst';
        const payload = meta.pairs.map(p => `${p.word}\t${p.translation}`).join('\n');

        // Build base URL safely: if LOEK_IT_UP_URL already points to an HTML file, don't append another index.html
        let base = LOEK_IT_UP_URL;
        // Trim trailing spaces
        base = base.trim();

        // If base doesn't contain .html, ensure it ends with /index.html
        if (!/\.html(\?|$)/i.test(base)) {
            if (base.endsWith('/')) base = base + 'index.html';
            else base = base + '/index.html';
        }

        const separator = base.includes('?') ? '&' : '?';
        const url = `${base}${separator}import=1` +
            `&title=${encodeURIComponent(safeTitle)}` +
            `&langFrom=${encodeURIComponent(meta.langFrom || '')}` +
            `&langTo=${encodeURIComponent(meta.langTo || '')}` +
            `&data=${encodeURIComponent(payload)}`;

        // Try to open in a new tab; if blocked, navigate current tab as fallback
        try {
            const opened = window.open(url, '_blank', 'noopener');
            if (!opened) {
                // Popup was blocked — navigate current window
                window.location.href = url;
            }
        } catch (e) {
            try { window.location.href = url; } catch (err) { console.error('Unable to open Loek it Up:', err); }
        }
    }

    function showNotification(message, isError = false) {
        const existing = document.getElementById('loek-importer-notification');
        if (existing) existing.remove();

        const notification = document.createElement('div');
        notification.id = 'loek-importer-notification';
        notification.className = 'loek-importer-notification' + (isError ? ' error' : '');
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${isError ? '!' : 'OK'}</span>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function addImportButton() {
        if (document.getElementById('loek-importer-btn')) return;

        const button = document.createElement('button');
        button.id = 'loek-importer-btn';
        button.className = 'loek-importer-btn';
        button.innerHTML = `
            <span class="btn-icon">⚡</span>
            <span class="btn-text">Importeer in Loek it Up</span>
        `;

        button.addEventListener('click', () => {
            const meta = extractMetaAndWords();
            if (!meta.pairs.length) {
                showNotification('Geen woordparen gevonden', true);
                return;
            }

            openInLoekItUp(meta);
            showNotification('Loek it Up geopend');

            // Sluit de printpagina zoals in het voorbeeld
            setTimeout(() => {
                try { window.close(); } catch (e) { /* ignore */ }
            }, 700);
        });

        document.body.appendChild(button);
    }

    function addFloatingButton() {
        if (document.getElementById('loek-importer-fab')) return;

        const button = document.createElement('button');
        button.id = 'loek-importer-fab';
        button.className = 'loek-importer-fab';
        button.title = 'Open in Loek it Up';
        button.innerHTML = '<span class="fab-icon">+</span>';

        button.addEventListener('click', () => {
            const basePath = window.location.pathname.replace(/\/$/, '');
            const printUrl = `${window.location.origin}${basePath}/print-table?autoImport=1`;
            const newTab = window.open(printUrl, '_blank', 'noopener');
            if (newTab) {
                newTab.blur();
                window.focus();
            }
        });

        document.body.appendChild(button);
    }

    function init() {
        if (isPrintPage()) {
            const autoImport = new URLSearchParams(window.location.search).get('autoImport') === '1';
            waitForContent(() => {
                const meta = extractMetaAndWords();
                if (meta.pairs.length === 0) return;

                if (autoImport) {
                    openInLoekItUp(meta);
                    setTimeout(() => { try { window.close(); } catch (e) {} }, 900);
                } else {
                    addImportButton();
                }
            });
            return;
        }

        if (isListPage()) {
            const autoKey = 'loek_auto_import_started';
            if (!sessionStorage.getItem(autoKey)) {
                sessionStorage.setItem(autoKey, '1');
                const basePath = window.location.pathname.replace(/\/$/, '');
                const printUrl = `${window.location.origin}${basePath}/print-table?autoImport=1`;
                const newTab = window.open(printUrl, '_blank', 'noopener');
                if (!newTab) {
                    window.location.href = printUrl;
                    return;
                }
                newTab.blur();
                window.focus();
            }

            addFloatingButton();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(init, 1000);
        }
    }).observe(document, { subtree: true, childList: true });
})();
