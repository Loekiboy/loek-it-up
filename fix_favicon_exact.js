const fs = require('fs');

function fix(p) {
    let c = fs.readFileSync(p, 'utf8');

    const exactOld1 = `    const link = document.querySelector("link[rel*='icon']");
    if (link) {
        link.href = \`data:image/svg+xml;base64,\${encodedSvg}\`;
    }`;
    const exactNew1 = `    document.querySelectorAll("link[rel*='icon']").forEach(link => {
        link.type = "image/svg+xml";
        link.href = \`data:image/svg+xml;base64,\${encodedSvg}\`;
    });`;

    const exactOld2 = `    const isDynamic = isDynamicLogoEnabled();
    // Default colors as sent by user
    let faceColor = "#fdc204";
    let noseColor = "#e89d05";

    // Always use original colors for default yellow, otherwise follow dynamic setting
    if (isDynamic && primary !== '#FFD93D') {
        faceColor = primary;
        noseColor = dark;
    }`;

    const exactNew2 = `    let faceColor = primary === '#FFD93D' ? '#fdc204' : primary;
    let noseColor = primary === '#FFD93D' ? '#e89d05' : dark;`;

    c = c.replace(exactOld1, exactNew1);
    c = c.replace(exactOld2, exactNew2);

    fs.writeFileSync(p, c, 'utf8');
}

fix('app.js');
try { fix('beta/app.js'); } catch(e) {}
console.log('Done replacement');
