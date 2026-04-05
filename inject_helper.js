const fs = require('fs');

function inject(path) {
    let content = fs.readFileSync(path, 'utf8');
    
    const replacements = [
        ['id="step-copy-input"', 'step-copy-input'],
        ['id="step-hint-input"', 'step-hint-input'],
        ['id="step-typing-input"', 'step-typing-input'],
        ['id="step-review-input"', 'step-review-input'],
        ['id="typing-input"', 'typing-input'],
        ['id="typing-review-input"', 'typing-review-input'],
        ['id="exam-input"', 'exam-input']
    ];
    
    replacements.forEach(([sig, id]) => {
        // Find <input ... id="id" ... > 
        // We know they look like:
        // <input type="text" class="typing-input" id="step-typing-input"
        // ...
        // onkeydown="...">
        
        let regex = new RegExp(`(<input[^>]*?${sig}[^>]*>)`, 'g');
        content = content.replace(regex, `$1\n                \${getTremaHelperHtml('${id}')}`);
    });

    fs.writeFileSync(path, content, 'utf8');
}

inject('app.js');
try { inject('beta/app.js'); } catch(e) {}
console.log('Injected');
