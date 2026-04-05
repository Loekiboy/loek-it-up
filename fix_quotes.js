const fs = require('fs');

function fixFile(path) {
    let content = fs.readFileSync(path, 'utf8');
    content = content.replace(/replace\(\/'\/g, "\\\\'"\)/g, 'replace(/&#39;/g, "\\\\&#39;")');
    fs.writeFileSync(path, content, 'utf8');
}

fixFile('app.js');
try {
    fixFile('beta/app.js');
} catch (e) {}

console.log("Fixed files");
