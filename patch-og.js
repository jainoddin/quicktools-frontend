const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('./app');
let count = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // We are looking for "type: 'website'," inside openGraph that doesn't have images
  if (content.includes("type: 'website',") && !content.includes("images: [") && !content.includes("images:")) {
    content = content.replace(
      "type: 'website',", 
      "type: 'website',\n            images: [{ url: 'https://quicktool.space/og-image.jpg', width: 1200, height: 630, alt: 'QuickTool AI Workspace' }],"
    );
    changed = true;
  }

  // Also check if they have "type: 'website'" (no comma)
  if (!changed && content.includes("type: 'website'") && !content.includes("type: 'website',") && !content.includes("images: [") && !content.includes("images:")) {
    content = content.replace(
      "type: 'website'", 
      "type: 'website',\n            images: [{ url: 'https://quicktool.space/og-image.jpg', width: 1200, height: 630, alt: 'QuickTool AI Workspace' }]"
    );
    changed = true;
  }

  // Same logic for twitter: if twitter block exists but no images in the file at all
  // Wait, if we added images to openGraph, then content NOW has "images: [". So we can't just check !content.includes("images:")
  // For twitter, usually falling back to openGraph is enough. So fixing openGraph is primary.

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Patched', file);
    count++;
  }
});

console.log('Total files patched:', count);
