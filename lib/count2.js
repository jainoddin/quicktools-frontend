const fs = require('fs');
const content = fs.readFileSync('toolsData.ts', 'utf8');
const allToolsMatch = content.match(/export const allTools = \[([\s\S]*?)\];/);
if (allToolsMatch) {
  const toolsStr = allToolsMatch[1];
  const total = (toolsStr.match(/name:/g) || []).length;
  const free = (toolsStr.match(/type:\s*'free'/g) || []).length;
  console.log('Total:', total);
  console.log('Free:', free);
  console.log('Premium:', total - free);
}
