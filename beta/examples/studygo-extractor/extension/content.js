// StudyGo Extractor - Content Script
// Voegt een knop toe aan de print pagina om woorden te kopiëren

(function() {
    'use strict';

    // Check of we op een print pagina zijn
    function isPrintPage() {
        return window.location.pathname.endsWith('/print-table');
    }

    function isListPage() {
        return /\/learn\/lists\//.test(window.location.pathname);
    }

    // Check of we op de StudyGo Extractor site zijn
    function isExtractorSite() {
        return document.querySelector('meta[name="studygo-extractor-site"]');
    }

    // Wacht tot de pagina geladen is
    function waitForContent(callback, maxAttempts = 120) {
        let attempts = 0;

        const check = () => {
            attempts++;
            const content = document.body.innerText;

            // Zoek naar tekens dat de woordenlijst geladen is
            if (content.length > 300 || attempts >= maxAttempts) {
                callback();
            } else {
                setTimeout(check, 50);
            }
        };

        check();
    }

    // Extraheer woorden van de pagina
    function extractWords() {
        const text = document.body.innerText;
        const lines = text.split('\n').filter(line => line.trim());
        
        // Headers die we moeten overslaan
        const skipHeaders = [
            'home', 'oefenen', 'forum', 'lessen', 'zoeken',
            'terug naar lijst', 'lijst printen', 'tabel', 'kaartjes'
        ];
        
        // Bekende talen
        const languages = [
            'engels', 'english', 'frans', 'french', 'français',
            'duits', 'german', 'deutsch', 'nederlands', 'dutch',
            'spaans', 'spanish', 'español', 'italiaans', 'italian',
            'latijn', 'latin', 'grieks', 'greek'
        ];
        
        // Vind waar de woordenlijst begint
        let wordStartIndex = 0;
        
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim().toLowerCase();
            
            // Sla headers over
            if (skipHeaders.includes(line)) continue;
            
            // Check of dit een taal is
            if (languages.includes(line)) {
                // Check volgende regel voor tweede taal
                if (i + 1 < lines.length && languages.includes(lines[i + 1].trim().toLowerCase())) {
                    wordStartIndex = i + 2;
                    break;
                }
            }
        }
        
        // Verwerk de woordparen
        const pairs = [];
        for (let i = wordStartIndex; i < lines.length - 1; i += 2) {
            const word = lines[i].trim();
            const translation = lines[i + 1].trim();
            
            if (!word || !translation) continue;
            if (skipHeaders.includes(word.toLowerCase())) continue;
            if (skipHeaders.includes(translation.toLowerCase())) continue;
            
            pairs.push({ word, translation });
        }
        
        return pairs;
    }

    // Kopieer naar klembord
    function copyToClipboard(pairs) {
        let text = '';
        pairs.forEach(pair => {
            text += `${pair.word}\t${pair.translation}\n`;
        });
        
        navigator.clipboard.writeText(text).then(() => {
            showNotification(`${pairs.length} woordparen gekopieerd!`);
        }).catch(err => {
            console.error('Fout bij kopiëren:', err);
            showNotification('Fout bij kopiëren', true);
        });
    }

    // Toon notificatie
    function showNotification(message, isError = false) {
        // Verwijder bestaande notificatie
        const existing = document.getElementById('studygo-extractor-notification');
        if (existing) existing.remove();
        
        const notification = document.createElement('div');
        notification.id = 'studygo-extractor-notification';
        notification.className = 'studygo-extractor-notification' + (isError ? ' error' : '');
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${isError ? 'Fout' : 'OK'}</span>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animatie
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Voeg de kopieer knop toe
    function addCopyButton() {
        // Check of knop al bestaat
        if (document.getElementById('studygo-extractor-btn')) return;
        
        const button = document.createElement('button');
        button.id = 'studygo-extractor-btn';
        button.className = 'studygo-extractor-btn';

        const logoUrl = getExtensionLogoUrl();

        button.innerHTML = `
            ${logoUrl ? `<img class="btn-logo" src="${logoUrl}" alt="Logo">` : ''}
            <span class="btn-text">Kopieer als tabel</span>
        `;
        
        button.addEventListener('click', () => {
            const pairs = extractWords();
            
            if (pairs.length === 0) {
                showNotification('Geen woorden gevonden', true);
                return;
            }
            
            copyToClipboard(pairs);
        });
        
        document.body.appendChild(button);
    }

    function addLogoButton() {
        if (document.getElementById('studygo-extractor-logo-btn')) return;

        const button = document.createElement('button');
        button.id = 'studygo-extractor-logo-btn';
        button.className = 'studygo-extractor-logo-btn';

        const logoUrl = getExtensionLogoUrl();
        if (logoUrl) {
            button.innerHTML = `<img class="logo-btn-img" src="${logoUrl}" alt="Logo">`;
        } else {
            button.textContent = 'SG';
        }

        button.addEventListener('click', () => {
            const basePath = window.location.pathname.replace(/\/$/, '');
            const printUrl = `${window.location.origin}${basePath}/print-table?autoCopy=1`;
            const newTab = window.open(printUrl, '_blank', 'noopener');
            if (newTab) {
                newTab.blur();
                window.focus();
            }
        });

        document.body.appendChild(button);
    }

    // Start de extensie
    function init() {
        if (isExtractorSite()) {
            try {
                localStorage.setItem('studygo_extension_installed', 'true');
            } catch (e) {
                console.error('Kon installatie status niet opslaan:', e);
            }
            return;
        }

        if (isPrintPage()) {
            const autoCopy = new URLSearchParams(window.location.search).get('autoCopy') === '1';
            waitForContent(() => {
                const testPairs = extractWords();
                if (testPairs.length === 0) return;

                if (autoCopy) {
                    copyToClipboard(testPairs);
                    setTimeout(() => window.close(), 800);
                } else {
                    addCopyButton();
                }
            });
            return;
        }

        if (isListPage()) {
            addLogoButton();
        }
    }

    function getExtensionLogoUrl() {
        const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><rect width="512" height="512" rx="40" fill="#8E63D6"/><path d="M256 80v220" stroke="#fff" stroke-width="48" stroke-linecap="round"/><path d="M144 220l112 120 112-120" stroke="#fff" stroke-width="48" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M120 360h272" stroke="#fff" stroke-width="48" stroke-linecap="round"/></svg>`;
        return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
    }

    // Wacht tot DOM geladen is
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Hercheck bij navigatie (voor SPA's)
    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(init, 1000);
        }
    }).observe(document, { subtree: true, childList: true });
})();
