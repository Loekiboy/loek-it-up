const fs = require('fs');

function fix(p) {
    let c = fs.readFileSync(p, 'utf8');

    // Replace 1
    c = c.replace(/const link = document\.querySelector\("link\[rel\*='icon'\]"\);\s*if \(link\) \{\s*link\.href = `data:image\/svg\+xml;base64,\$\{encodedSvg\}`;\s*\}/,
    `    document.querySelectorAll("link[rel*='icon']").forEach(link => {
        link.type = "image/svg+xml";
        link.href = \`data:image/svg+xml;base64,\${encodedSvg}\`;
    });`);

    // Replace 2
    c = c.replace(/const isDynamic = isDynamicLogoEnabled\(\);\s*\/\/\s*Default colors as sent by user\s*let faceColor = "#fdc204";\s*let noseColor = "#e89d05";\s*\/\/\s*Always use original colors for default yellow, otherwise follow dynamic setting\s*if \(isDynamic && primary !== '#FFD93D'\) \{\s*faceColor = primary;\s*noseColor = dark;\s*\}/, 
    `let faceColor = primary === '#FFD93D' ? '#fdc204' : primary;
    let noseColor = primary === '#FFD93D' ? '#e89d05' : dark;`);

    fs.writeFileSync(p, c, 'utf8');
}

fix('app.js');
try { fix('beta/app.js'); } catch(e) {}
console.log('Fixed again');
