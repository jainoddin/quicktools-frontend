const { Project, SyntaxKind } = require('ts-morph');
const fs = require('fs');
const path = require('path');

const project = new Project();
const toolsDir = path.join(__dirname, 'app', 'tools');

function getCategoryForTool(slug) {
    if (slug.includes('writer') || slug.includes('blog') || slug.includes('article') || slug.includes('email') || slug.includes('copy') || slug.includes('script') || slug.includes('story') || slug.includes('poem')) return 'Writing';
    if (slug.includes('image') || slug.includes('background') || slug.includes('color') || slug.includes('logo')) return 'Design';
    if (slug.includes('seo') || slug.includes('marketing') || slug.includes('sales') || slug.includes('social') || slug.includes('ad')) return 'Marketing';
    if (slug.includes('business') || slug.includes('startup') || slug.includes('pitch') || slug.includes('plan')) return 'Business';
    if (slug.includes('code') || slug.includes('sql') || slug.includes('regex') || slug.includes('json') || slug.includes('git')) return 'Development';
    return 'Productivity';
}

function processTools() {
    const folders = fs.readdirSync(toolsDir).filter(f => fs.statSync(path.join(toolsDir, f)).isDirectory());

    for (const folder of folders) {
        const pagePath = path.join(toolsDir, folder, 'page.tsx');
        if (!fs.existsSync(pagePath)) continue;

        const sourceFile = project.addSourceFileAtPath(pagePath);
        const metadataDec = sourceFile.getVariableDeclaration('metadata');
        
        let toolName = 'QuickTools AI Tool';
        let toolDesc = 'The best AI tool on QuickTools.ai';

        if (metadataDec) {
            const init = metadataDec.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
            if (init) {
                const titleProp = init.getProperty('title');
                if (titleProp && titleProp.getKind() === SyntaxKind.PropertyAssignment) {
                    const abs = titleProp.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression)?.getProperty('absolute');
                    if (abs && abs.getKind() === SyntaxKind.PropertyAssignment) {
                        const val = abs.getFirstChildByKind(SyntaxKind.StringLiteral);
                        if (val) {
                            let text = val.getLiteralValue();
                            toolName = text.split('|')[0].replace('–', '').replace('-', '').trim();
                        }
                    }
                }
                
                const descProp = init.getProperty('description');
                if (descProp && descProp.getKind() === SyntaxKind.PropertyAssignment) {
                    const val = descProp.getFirstChildByKind(SyntaxKind.StringLiteral);
                    if (val) {
                        toolDesc = val.getLiteralValue();
                    }
                }

                // Update openGraph images
                const ogProp = init.getProperty('openGraph');
                if (ogProp && ogProp.getKind() === SyntaxKind.PropertyAssignment) {
                    const ogObj = ogProp.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression);
                    if (ogObj) {
                        const ogImages = ogObj.getProperty('images');
                        if (ogImages && ogImages.getKind() === SyntaxKind.PropertyAssignment) {
                            ogImages.setInitializer(`[{ url: \`https://quicktool.space/api/og?title=\${encodeURIComponent("${toolName}")}&type=tool\`, width: 1200, height: 630, alt: \`${toolName} - QuickTools.ai\` }]`);
                        }
                    }
                }

                // Update twitter images
                const twitterProp = init.getProperty('twitter');
                if (twitterProp && twitterProp.getKind() === SyntaxKind.PropertyAssignment) {
                    const twObj = twitterProp.getFirstChildByKind(SyntaxKind.ObjectLiteralExpression);
                    if (twObj) {
                        const twImages = twObj.getProperty('images');
                        if (twImages && twImages.getKind() === SyntaxKind.PropertyAssignment) {
                            twImages.setInitializer(`[\`https://quicktool.space/api/og?title=\${encodeURIComponent("${toolName}")}&type=tool\`]`);
                        }
                    }
                }
            }
        }

        const defaultExport = sourceFile.getFunction('AiWriterPage') || sourceFile.getFunction(sourceFile.getFunctions()[0]?.getName() || '');
        if (defaultExport) {
            let bodyText = sourceFile.getText();
            const category = getCategoryForTool(folder);
            
            // 1. UPDATE JSON SCHEMA
            const regex = /dangerouslySetInnerHTML=\{\{\s*__html:\s*JSON\.stringify\(\{(.*?)\}\)\s*\}\}/s;
            const match = bodyText.match(regex);
            
            // Construct FAQs
            let q1 = `What is ${toolName}?`;
            let answer1 = `The ${toolName} is an advanced AI-powered tool by QuickTools designed to help you ${toolDesc.toLowerCase()}`;
            
            let q2 = `How does the ${toolName} work?`;
            let a2 = `It uses cutting-edge artificial intelligence to analyze your input and automatically generate high-quality results in seconds. Just provide a prompt, and the AI handles the rest.`;
            
            let q3 = `Can I use ${toolName} for professional purposes?`;
            let a3 = `Yes, the output generated by our AI is designed to be highly professional and can be directly used for business applications, marketing, and client work.`;
            
            let q4 = `Is it fast to generate results?`;
            let a4 = `Absolutely. It usually takes just 2-3 seconds to generate the desired output, making it one of the fastest tools available.`;
            
            let q5 = `Do I need to download any software?`;
            let a5 = `No, the ${toolName} is entirely web-based and runs in your browser. You can access it from any device with an internet connection.`;

            let q6 = `Is the ${toolName} free to use?`;
            let a6 = `Yes, you can use the ${toolName} and many other tools on QuickTools.ai for free without needing a credit card.`;

            if (category === 'Design') {
                q2 = `What image formats are supported by ${toolName}?`;
                a2 = `The tool supports major high-resolution image formats like PNG, JPG, and JPEG for optimal quality processing and downloading.`;
                q3 = `Can I use the generated images commercially?`;
                a3 = `Yes, all generated images and designs come with full commercial usage rights, allowing you to use them in ads, websites, and print.`;
            } else if (category === 'Writing') {
                q2 = `Can the ${toolName} generate content in different tones?`;
                a2 = `Yes, our AI algorithms are trained to adapt to various professional, casual, persuasive, and creative tones based on your input.`;
                q3 = `Is the content plagiarism-free?`;
                a3 = `Yes, the ${toolName} generates 100% unique, original text every time you use it, ensuring it passes plagiarism checkers.`;
            } else if (category === 'Development') {
                q2 = `Is the generated code from ${toolName} secure?`;
                a2 = `Yes, the AI follows best practices for secure coding, but we always recommend reviewing any AI-generated code before deploying it to a production environment.`;
                q3 = `Which programming languages are supported?`;
                a3 = `We support a wide range of modern languages including JavaScript, Python, TypeScript, HTML, CSS, SQL, and more.`;
            } else if (category === 'Marketing') {
                q2 = `Will this help my SEO rankings?`;
                a2 = `Yes, the content generated is optimized for search engines, helping you target the right keywords and improve your organic visibility.`;
            }

            if (match) {
                const innerJson = match[1];
                if (!bodyText.includes('"@type": "BreadcrumbList"')) {
                    const breadcrumb = `{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://quicktool.space" },
          { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://quicktool.space/tools" },
          { "@type": "ListItem", "position": 3, "name": "${category}", "item": "https://quicktool.space/tools?category=${category.toLowerCase()}" },
          { "@type": "ListItem", "position": 4, "name": "${toolName}", "item": "https://quicktool.space/tools/${folder}" }
        ]
      }`;

                    const faq = `{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          { "@type": "Question", "name": "${q1}", "acceptedAnswer": { "@type": "Answer", "text": "${answer1}" } },
          { "@type": "Question", "name": "${q2}", "acceptedAnswer": { "@type": "Answer", "text": "${a2}" } },
          { "@type": "Question", "name": "${q3}", "acceptedAnswer": { "@type": "Answer", "text": "${a3}" } },
          { "@type": "Question", "name": "${q4}", "acceptedAnswer": { "@type": "Answer", "text": "${a4}" } },
          { "@type": "Question", "name": "${q5}", "acceptedAnswer": { "@type": "Answer", "text": "${a5}" } },
          { "@type": "Question", "name": "${q6}", "acceptedAnswer": { "@type": "Answer", "text": "${a6}" } }
        ]
      }`;

                    let updatedInnerJson = innerJson;
                    if (!updatedInnerJson.includes('featureList')) {
                         updatedInnerJson += `, "featureList": "AI-powered, fast generation, free to use, no signup required for basic use"`;
                    }
                    if (!updatedInnerJson.includes('applicationCategory')) {
                         updatedInnerJson = updatedInnerJson.replace('"operatingSystem": "Web",', '"operatingSystem": "Web",\n      "applicationCategory": "BusinessApplication",');
                    }

                    const newReplacement = `dangerouslySetInnerHTML={{ __html: JSON.stringify([\n      {${updatedInnerJson}},\n      ${breadcrumb},\n      ${faq}\n    ]) }}`;
                    bodyText = bodyText.replace(regex, newReplacement);
                }
            }

            // 2. INJECT VISIBLE FAQ UI
            if (!bodyText.includes('id="faq"')) {
                // Find the ClientComponent line, which usually looks like `<AiWriterClient />` or `<Client />`
                // We will just inject it right before the closing `</div>` of the main container (before `</div>\n    </div>\n  );`)
                
                const faqUI = `
        {/* Visible FAQ Section for SEO and Users */}
        <div id="faq" className="mt-16 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-800">${q1}</h3>
              <p className="text-slate-600 mt-2">${answer1}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">${q2}</h3>
              <p className="text-slate-600 mt-2">${a2}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">${q3}</h3>
              <p className="text-slate-600 mt-2">${a3}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">${q4}</h3>
              <p className="text-slate-600 mt-2">${a4}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">${q5}</h3>
              <p className="text-slate-600 mt-2">${a5}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-800">${q6}</h3>
              <p className="text-slate-600 mt-2">${a6}</p>
            </div>
          </div>
        </div>
`;
                // Inject before the last two closing divs
                const endDivsMatch = bodyText.match(/(<\/div>\s*<\/div>\s*\);\s*\}\s*)$/);
                if (endDivsMatch) {
                    bodyText = bodyText.replace(endDivsMatch[1], faqUI + '\n' + endDivsMatch[1]);
                }
            }
            
            sourceFile.replaceWithText(bodyText);
        }
    }
    
    project.saveSync();
    console.log("Successfully updated metadata, schema, and visible FAQ UI for all tool pages.");
}

processTools();
