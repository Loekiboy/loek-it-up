import sys

def fix_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    content = content.replace("replace(/'/g, \"\\\\'\")", "replace(/&#39;/g, \"\\\\&#39;\")")
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('app.js')
fix_file('beta/app.js')
print("Fixed files")
