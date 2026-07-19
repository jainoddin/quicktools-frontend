const fs = require('fs');
const path = require('path');

const dirs = [
  'ai-summarizer', 'ai-translator', 'ai-resume-builder', 'ai-color-palette', 'url-shortener'
];

const replaces = [
  { regex: /bg-\[#F97316\]/g, replace: 'bg-[#6D5EF8]' },
  { regex: /text-\[#F97316\]/g, replace: 'text-[#6D5EF8]' },
  { regex: /focus:ring-\[#F97316\]/g, replace: 'focus:ring-[#6D5EF8]' },
  { regex: /focus:border-\[#F97316\]/g, replace: 'focus:border-[#6D5EF8]' },
  { regex: /shadow-\[#F97316\]/g, replace: 'shadow-[#6D5EF8]' },
  { regex: /hover:bg-orange-600/g, replace: 'hover:bg-[#5B4DF5]' },
  { regex: /bg-orange-100/g, replace: 'bg-[#F5F3FF]' },
  { regex: /bg-orange-200\/30/g, replace: 'bg-purple-200/30' },
  { regex: /bg-yellow-100\/30/g, replace: 'bg-blue-100/30' },
  { regex: /prose-orange/g, replace: 'prose-purple' },
  { regex: /selection:bg-\[#F97316\]/g, replace: 'selection:bg-[#6D5EF8]' },

  { regex: /bg-\[#06B6D4\]/g, replace: 'bg-[#6D5EF8]' },
  { regex: /text-\[#06B6D4\]/g, replace: 'text-[#6D5EF8]' },
  { regex: /focus:ring-\[#06B6D4\]/g, replace: 'focus:ring-[#6D5EF8]' },
  { regex: /focus:border-\[#06B6D4\]/g, replace: 'focus:border-[#6D5EF8]' },
  { regex: /shadow-\[#06B6D4\]/g, replace: 'shadow-[#6D5EF8]' },
  { regex: /hover:bg-cyan-600/g, replace: 'hover:bg-[#5B4DF5]' },
  { regex: /bg-cyan-100/g, replace: 'bg-[#F5F3FF]' },
  { regex: /bg-cyan-200\/30/g, replace: 'bg-purple-200/30' },
  { regex: /prose-cyan/g, replace: 'prose-purple' },
  { regex: /selection:bg-\[#06B6D4\]/g, replace: 'selection:bg-[#6D5EF8]' },

  { regex: /bg-\[#8B5CF6\]/g, replace: 'bg-[#6D5EF8]' },
  { regex: /text-\[#8B5CF6\]/g, replace: 'text-[#6D5EF8]' },
  { regex: /focus:border-\[#8B5CF6\]/g, replace: 'focus:border-[#6D5EF8]' },
  { regex: /hover:bg-purple-600/g, replace: 'hover:bg-[#5B4DF5]' },
  { regex: /bg-purple-100/g, replace: 'bg-[#F5F3FF]' },
  { regex: /bg-fuchsia-100\/30/g, replace: 'bg-blue-100/30' },
  { regex: /selection:bg-\[#8B5CF6\]/g, replace: 'selection:bg-[#6D5EF8]' },

  { regex: /bg-\[#EC4899\]/g, replace: 'bg-[#6D5EF8]' },
  { regex: /text-\[#EC4899\]/g, replace: 'text-[#6D5EF8]' },
  { regex: /focus:border-\[#EC4899\]/g, replace: 'focus:border-[#6D5EF8]' },
  { regex: /hover:bg-pink-600/g, replace: 'hover:bg-[#5B4DF5]' },
  { regex: /bg-pink-100/g, replace: 'bg-[#F5F3FF]' },
  { regex: /bg-pink-200\/30/g, replace: 'bg-purple-200/30' },
  { regex: /bg-rose-100\/30/g, replace: 'bg-blue-100/30' },
  { regex: /selection:bg-\[#EC4899\]/g, replace: 'selection:bg-[#6D5EF8]' },

  { regex: /bg-\[#14B8A6\]/g, replace: 'bg-[#6D5EF8]' },
  { regex: /text-\[#14B8A6\]/g, replace: 'text-[#6D5EF8]' },
  { regex: /focus:border-\[#14B8A6\]/g, replace: 'focus:border-[#6D5EF8]' },
  { regex: /hover:bg-teal-600/g, replace: 'hover:bg-[#5B4DF5]' },
  { regex: /text-teal-600/g, replace: 'text-[#6D5EF8]' },
  { regex: /border-teal-100/g, replace: 'border-[#E5E7EB]' },
  { regex: /bg-teal-100/g, replace: 'bg-[#F5F3FF]' },
  { regex: /bg-teal-200\/30/g, replace: 'bg-purple-200/30' },
  { regex: /bg-emerald-100\/30/g, replace: 'bg-blue-100/30' },
  { regex: /selection:bg-\[#14B8A6\]/g, replace: 'selection:bg-[#6D5EF8]' },
];

const processFile = (filePath) => {
  const fullPath = path.join(__dirname, filePath);
  if (!fs.existsSync(fullPath)) {
    console.log('Skipping missing file:', fullPath);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  replaces.forEach(r => {
    content = content.replace(r.regex, r.replace);
  });
  fs.writeFileSync(fullPath, content);
  console.log('Processed:', fullPath);
};

dirs.forEach(d => {
  processFile(`app/tools/${d}/page.tsx`);
  
  let clientFile = d.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Client.tsx';
  processFile(`components/${d}/${clientFile}`);
});
