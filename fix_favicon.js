const fs = require('fs');

function fix(p) {
    let c = fs.readFileSync(p, 'utf8');
    
    // Replace 1
    const old1 = "const link = document.querySelector(\"link[rel*='icon']\");\n    if (link) {\n        link.href = `data:image/svg+xml;base64,${encodedSvg}`;\n    }";
    const new1 = "document.querySelectorAll(\"link[rel*='icon']\").forEach(link => {\n        link.type = \"image/svg+xml\";\n        link.href = `data:image/svg+xml;base64,${encodedSvg}`;\n        const newLink = link.cloneNode(true);\n        link.parentNode.replaceChild(newLink, link);\n    });";
    c = c.replace(old1, new1);
    
    // Replace 2
    const old2 = "let faceColor = \"#fdc204\";\n    let noseColor = \"#e89d05\";\n\n    // Always use original colors for default yellow, otherwise follow dynamic setting\n    if (isDynamic && primary !== '#FFD93D') {\n        faceColor = primary;\n        noseColor = dark;\n    }";
    const new2 = "let faceColor = primary === '#FFD93D' ? '#fdc204' : primary;\n    let noseColor = primary === '#FFD93D' ? '#e89d05' : dark;";
    c = c.replace(old2, new2);

    fs.writeFileSync(p, c, 'utf8');
}

fix('app.js');
try { fix('beta/app.js'); } catch(e) {}
console.log('Favicon fixed!');