const fs = require('fs');
const content = fs.readFileSync('toolsData.ts', 'utf8');
const freeCount = (content.match(/type:\s*'free'/g) || []).length;
const totalCount = (content.match(/slug:\s*'/g) || []).length;
console.log('Free:', freeCount);
console.log('Total:', totalCount);
console.log('Premium:', totalCount - freeCount);
