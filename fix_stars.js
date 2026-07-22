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

  // 1. Fix the backend fetch map to include isStarred
  // Look for: result: item.result, \n date: new Date(item.createdAt).toLocaleDateString(),
  // Or similar variations
  const mapRegex = /result:\s*item\.result,\s*date:\s*new Date\([^)]+\)\.toLocaleDateString\(\),?\s*\}\)\)/g;
  if (mapRegex.test(content)) {
    content = content.replace(mapRegex, match => {
      // If it doesn't already have isStarred
      if (!content.includes('isStarred: item.isStarred')) {
        return match.replace('}))', ',\n              isStarred: item.isStarred\n            }))');
      }
      return match;
    });
    changed = true;
  }
  
  const mapRegex2 = /createdAt:\s*item\.createdAt,\s*result:\s*item\.result,?\s*\}\)\)/g;
  if (mapRegex2.test(content)) {
    content = content.replace(mapRegex2, match => {
      // If it doesn't already have isStarred
      if (!content.includes('isStarred: item.isStarred')) {
        return match.replace('}))', ',\n                isStarred: item.isStarred\n              }))');
      }
      return match;
    });
    changed = true;
  }

  // 2. Fix handleToggleFavorite
  const handleToggleRegex = /const handleToggleFavorite = async \(id: string\) => \{\s*setToolHistory\(prev => prev\.map\(item => (item\.id === id \|\| item\._id === id|String\(item\.id\) === String\(id\) \|\| String\(item\._id\) === String\(id\)) \? \{ \.\.\.item, isStarred: !item\.isStarred \} : item\)\);\s*if \(!isAuthenticated\) \{\s*(const \w+ = toolHistory\.map[^;]+;)\s*localStorage\.setItem\(([^,]+), JSON\.stringify\([^)]+\)\);\s*\}/g;
  
  if (handleToggleRegex.test(content)) {
    content = content.replace(handleToggleRegex, (match, condition, mapLine, storageKey) => {
      return `const handleToggleFavorite = async (id: string) => {
    setToolHistory(prev => {
      const updated = prev.map(item => String(item.id) === String(id) || String(item._id) === String(id) ? { ...item, isStarred: !item.isStarred } : item);
      if (!isAuthenticated) {
        localStorage.setItem(${storageKey}, JSON.stringify(updated));
      }
      return updated;
    });`;
    });
    changed = true;
  }

  // Try simpler regex for toggle favorite if first one fails
  const simpleToggleRegex = /setToolHistory\(prev => prev\.map\(item => item\.id === id \|\| item\._id === id \? \{ \.\.\.item, isStarred: !item\.isStarred \} : item\)\);\s*if \(!isAuthenticated\) \{\s*const [^=]+ = toolHistory\.map[^;]+;\s*localStorage\.setItem\(([^,]+), JSON\.stringify\([^)]+\)\);\s*\}/g;
  if (simpleToggleRegex.test(content)) {
      content = content.replace(simpleToggleRegex, (match, storageKey) => {
          return `setToolHistory(prev => {
      const updated = prev.map(item => String(item.id) === String(id) || String(item._id) === String(id) ? { ...item, isStarred: !item.isStarred } : item);
      if (!isAuthenticated) {
        localStorage.setItem(${storageKey}, JSON.stringify(updated));
      }
      return updated;
    });`;
      });
      changed = true;
  }

  if (changed && fs.readFileSync(file, 'utf8') !== content) {
    fs.writeFileSync(file, content, 'utf8');
    modifiedCount++;
  }
});

console.log(`Modified ${modifiedCount} files.`);
