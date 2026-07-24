const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            results.push(file);
        }
    });
    return results;
}

const files = walk('./app').filter(f => f.endsWith('page.tsx'));
let count = 0;
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes("@quicktoolsai")) {
        // Regex to match the creator line and its preceding whitespace
        content = content.replace(/\n\s*creator:\s*'@quicktoolsai',?/g, '');
        fs.writeFileSync(file, content, 'utf8');
        count++;
    }
});
console.log(`Removed twitter handle from ${count} files.`);
