const fs = require('fs');

function updateSw(filePath) {
    if(!fs.existsSync(filePath)) return;
    let code = fs.readFileSync(filePath, 'utf8');

    const newFetch = [
        "self.addEventListener('fetch', event => {",
        "  const url = new URL(event.request.url);",
        "  const isExternal = url.origin !== self.location.origin;",
        "  const isFontAwesome = FA_WEBFONT_PATTERN.test(url.href);",
        "",
        "  // Skip non-GET requests and Supabase API calls",
        "  if (event.request.method !== 'GET' || url.hostname.includes('supabase.co')) {",
        "    return;",
        "  }",
        "",
        "  event.respondWith("
    ].join('\n');

    const oldFetch = [
        "self.addEventListener('fetch', event => {",
        "  const url = new URL(event.request.url);",
        "  const isExternal = url.origin !== self.location.origin;",
        "  const isFontAwesome = FA_WEBFONT_PATTERN.test(url.href);",
        "",
        "  event.respondWith("
    ].join('\n');

    if (code.includes(oldFetch)) {
        code = code.replace(oldFetch, newFetch);
        
        // Also update cache name to force clients to update
        code = code.replace(/const CACHE_NAME = 'loek-it-up-v6';/g, "const CACHE_NAME = 'loek-it-up-v7';");
        code = code.replace(/const CACHE_NAME = 'loek-it-up-beta-v1';/g, "const CACHE_NAME = 'loek-it-up-beta-v2';");
        
        fs.writeFileSync(filePath, code);
        console.log('Fixed SW in', filePath);
    } else {
        console.log('Pattern not found in', filePath);
    }
}

updateSw('sw.js');
updateSw('beta/sw.js');
