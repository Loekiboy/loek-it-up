const fs = require('fs');

function fix(p) {
  let c = fs.readFileSync(p, 'utf8');
  c = c.replace(/replace\(\/'\/g,\s*"\\\\'"\)/g, 'replace(/&#39;/g, "\\\\&#39;")');
  fs.writeFileSync(p, c);
}

fix('app.js');
fix('beta/app.js');
console.log("Done");
