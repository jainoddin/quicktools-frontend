// @ts-nocheck
import { allTools } from './toolsRegistry';
import fs from 'fs';

const slugs = allTools.map(t => t.routeSlug);
fs.writeFileSync('tool_slugs.json', JSON.stringify(slugs, null, 2));
console.log('Done mapping tool slugs');
