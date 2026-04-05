const fs = require('fs');

function updateSw(filePath) {
    if(!fs.existsSync(filePath)) return;
    let code = fs.readFileSync(filePath, 'utf8');

    if (code.includes('if (event.request.method !== \\'GET\\'')) {
        console.log('Already fixed', filePath);
        return;
    }

    const search = "const isFontAwesome = FA_WEBFONT_PATTERN.test(url.href);";
    if (code.includes(search)) {
        const replacement = "const isFontAwesome = FA_WEBFONT_PATTERN.test(url.href);\n\n  // Skip non-GET requests and Supabase API calls\n  if (event.request.method !== 'GET' || url.hostname.includes('supabase.co')) {\n    return;\n  }";
        code = code.replace(search, replacement);
        
        // Also update cache name to force clients to update
        code = code.replace(/const CACHE_NAME = 'loek-it-up-v6';/g, "const CACHE_NAME = 'loek-it-up-v7';");
        code = code.replace(/const CACHE_NAME = 'loek-it-up-beta-v1';/g, "const CACHE_NAME = 'loek-it-up-beta-v2';");
        
        fs.writeFileSync(filePath, code);
        console.log('Fixed SW in', filePath);
    }
}

updateSw('sw.js');
updateSw('beta/sw.js');
