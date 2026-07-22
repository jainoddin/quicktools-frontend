const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('Client.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('c:/Users/jain/.gemini/antigravity/scratch/quicktools-project/frontend/components');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Find the exact broken pattern:
  // ,\n            ,\n              isStarred: item.isStarred
  // or variations of whitespace
  
  const brokenRegex = /,\s*,\s*isStarred: item\.isStarred/g;
  if (brokenRegex.test(content)) {
    content = content.replace(brokenRegex, ',\n              isStarred: item.isStarred');
    changed = true;
  }
  
  // Another possible broken pattern if it didn't have a comma before
  // date: ...()\n            ,\n              isStarred: item.isStarred
  const brokenRegex2 = /(toLocaleDateString\(\)|item\.result)\s*,\s*isStarred: item\.isStarred/g;
  if (brokenRegex2.test(content)) {
    content = content.replace(brokenRegex2, (match, p1) => {
        return `${p1},\n              isStarred: item.isStarred`;
    });
    changed = true;
  }

  // Handle the specific syntax error shown in the console:
  // date: new Date(item.createdAt).toLocaleDateString(),
  //             ,
  //               isStarred: item.isStarred
  const specificRegex = /(toLocaleDateString\(\),?|item\.result,?)\n\s*,\n\s*isStarred:/g;
  if (specificRegex.test(content)) {
      content = content.replace(specificRegex, (match, p1) => {
          // If p1 doesn't have a comma, add it.
          const cleanP1 = p1.endsWith(',') ? p1 : p1 + ',';
          return `${cleanP1}\n              isStarred:`;
      });
      changed = true;
  }

  if (changed && fs.readFileSync(file, 'utf8') !== content) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log(`Fixed ${modifiedCount} files.`);
