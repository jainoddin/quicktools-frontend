import { Project, SyntaxKind, ObjectLiteralExpression, PropertyAssignment, StringLiteral } from 'ts-morph';
import * as fs from 'fs';
import * as path from 'path';

const project = new Project();
const toolsDir = path.join(process.cwd(), 'app/tools');

const toolFolders = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

let modifiedCount = 0;

for (const folder of toolFolders) {
  const pagePath = path.join(toolsDir, folder, 'page.tsx');
  if (!fs.existsSync(pagePath)) continue;

  const sourceFile = project.addSourceFileAtPath(pagePath);
  
  const metadataDecl = sourceFile.getVariableDeclaration('metadata');
  if (metadataDecl) {
    const initializer = metadataDecl.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
    if (initializer) {
      let titleStr = '';
      let descStr = '';

      const titleProp = initializer.getProperty('title');
      if (titleProp && titleProp.isKind(SyntaxKind.PropertyAssignment)) {
        const init = (titleProp as PropertyAssignment).getInitializer();
        if (init && init.isKind(SyntaxKind.StringLiteral)) {
          titleStr = (init as StringLiteral).getLiteralValue();
        }
      }

      const descProp = initializer.getProperty('description');
      if (descProp && descProp.isKind(SyntaxKind.PropertyAssignment)) {
        const init = (descProp as PropertyAssignment).getInitializer();
        if (init && init.isKind(SyntaxKind.StringLiteral)) {
          descStr = (init as StringLiteral).getLiteralValue();
        }
      }

      const toolName = titleStr.split('|')[0].trim() || folder.replace(/-/g, ' ');

      if (!initializer.getProperty('keywords')) {
        initializer.addPropertyAssignment({
          name: 'keywords',
          initializer: `['${toolName}', 'Free ${toolName}', 'AI ${toolName}', 'QuickTools', 'Online ${toolName}', 'AI Tool']`
        });
      }

      if (!initializer.getProperty('alternates')) {
        initializer.addPropertyAssignment({
          name: 'alternates',
          initializer: `{ canonical: 'https://quicktool.space/tools/${folder}' }`
        });
      }

      if (!initializer.getProperty('openGraph')) {
        initializer.addPropertyAssignment({
          name: 'openGraph',
          initializer: `{
    title: ${titleStr ? JSON.stringify(titleStr) : `'${toolName} | QuickTools'`},
    description: ${descStr ? JSON.stringify(descStr) : `'Free online ${toolName} tool.'`},
    url: 'https://quicktool.space/tools/${folder}',
    siteName: 'QuickTools.ai',
    type: 'website',
    images: [{ url: 'https://quicktool.space/icon.svg', width: 1200, height: 630, alt: '${toolName}' }]
  }`
        });
      }

      if (!initializer.getProperty('twitter')) {
        initializer.addPropertyAssignment({
          name: 'twitter',
          initializer: `{
    card: 'summary_large_image',
    title: ${titleStr ? JSON.stringify(titleStr) : `'${toolName} | QuickTools'`},
    description: ${descStr ? JSON.stringify(descStr) : `'Free online ${toolName} tool.'`},
    creator: '@quicktoolsai',
    images: ['https://quicktool.space/icon.svg']
  }`
        });
      }
      
      modifiedCount++;
    }
  }

  sourceFile.saveSync();
}

console.log(`Successfully injected advanced SEO metadata into ${modifiedCount} tools!`);
