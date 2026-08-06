export function generateToolKeywords(slug: string, category?: string): string[] {
  // Extract parts and clean slug
  const parts = slug.split('-');
  const isAI = parts[0] === 'ai';
  
  // Build Raw Name (without AI)
  const rawParts = parts.filter(p => p !== 'ai');
  const rawName = rawParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  
  // Build Core Name
  const coreName = isAI ? `AI ${rawName}` : rawName;

  const keywords = new Set<string>();

  // Generic Algorithm
  keywords.add(coreName);
  keywords.add(`AI ${rawName}`); // In case it wasn't AI prefixed
  keywords.add(`${rawName} AI`);
  keywords.add(`Free ${coreName}`);
  keywords.add(`Best ${coreName}`);
  keywords.add(`Online ${rawName}`);
  keywords.add(`${coreName} Tool`);

  // Category & Synonym Mapping
  const synonymMap: Record<string, string> = {
    'generator': 'Creator',
    'writer': 'Writing Tool',
    'remover': 'Eraser',
    'upscaler': 'Image Enhancer',
    'logo': 'Logo Maker',
    'resume': 'CV Builder',
    'email': 'Email Assistant',
    'code': 'Code Generator',
    'calendar': 'Calendar AI',
  };

  // Add synonyms
  for (const [key, synonym] of Object.entries(synonymMap)) {
    if (slug.includes(key)) {
      // Replace the keyword with its synonym
      // e.g., "Password Generator" -> "Password Creator"
      const regex = new RegExp(key, 'i');
      if (regex.test(rawName)) {
        keywords.add(rawName.replace(regex, synonym));
        keywords.add(`AI ${rawName.replace(regex, synonym)}`);
      } else {
        keywords.add(`${rawName} ${synonym}`);
      }
    }
  }

  // Handle specific edge cases from user request for perfect match
  if (slug === 'ai-writer') {
    keywords.add('Content Writer AI');
    keywords.add('Blog Writer');
    keywords.add('AI Copywriting');
  } else if (slug === 'background-remover') {
    keywords.add('Remove Background');
    keywords.add('Image Background Remover');
  } else if (slug === 'ai-logo-generator' || slug === 'logo-generator') {
    keywords.add('Logo Design AI');
    keywords.add('Business Logo Generator');
  } else if (slug === 'ai-social-calendar') {
    keywords.add('Social Media Calendar AI');
  }

  keywords.add('QuickTools AI');

  // Clean up and format
  return Array.from(keywords)
    .filter(kw => kw.trim().length > 0)
    .map(kw => kw.replace(/\s+/g, ' ').trim()) // Remove double spaces
    .filter(kw => !kw.toLowerCase().includes('generator generator')) // Fix awkward generations
    .filter(kw => !kw.toLowerCase().includes('maker maker'))
    .filter(kw => !kw.toLowerCase().includes('ai ai')) // Fix AI AI Writer
    .slice(0, 12); // Limit to 8-12 keywords
}
