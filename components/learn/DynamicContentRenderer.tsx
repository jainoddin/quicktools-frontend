import React from 'react';
import ReactMarkdown from 'react-markdown';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import QuizComponent from './QuizComponent';
import CopyPromptButton from './CopyPromptButton';
// Assuming you have these or similar components in your project
// import CodeBlock from './CodeBlock';
// import PromptBox from './PromptBox';

export default function DynamicContentRenderer({ blocks, updatedBlockIds = [] }: { blocks: any[], updatedBlockIds?: string[] }) {
  if (!blocks || !Array.isArray(blocks)) return null;

  return (
    <div className="space-y-8 animate-fade-in">
      {blocks.map((block, index) => {
        const isUpdated = block.id && updatedBlockIds.includes(block.id);
        let content = null;

        switch (block.type) {
          case 'heading':
            const Tag = `h${block.level}` as keyof JSX.IntrinsicElements;
            content = (
              <Tag id={block.id} className="font-bold text-slate-900 scroll-mt-24" style={{
                fontSize: block.level === 1 ? '2.25rem' : block.level === 2 ? '1.875rem' : block.level === 3 ? '1.5rem' : '1.25rem',
                marginTop: index === 0 ? '0' : '2rem',
                marginBottom: '1rem'
              }}>
                {block.content}
              </Tag>
            );
            break;

          case 'markdown':
          case 'paragraph':
            content = (
              <div id={block.id} className="prose prose-slate max-w-none text-slate-700 leading-relaxed">
                <ReactMarkdown>{block.content}</ReactMarkdown>
              </div>
            );
            break;

          case 'image':
            content = (
              <figure id={block.id} className="my-8">
                <img 
                  src={block.url} 
                  alt={block.alt} 
                  className="w-full rounded-xl border border-slate-200 shadow-sm"
                  width={block.width}
                  height={block.height}
                  loading="lazy"
                />
                {block.caption && (
                  <figcaption className="text-center text-sm text-slate-500 mt-2">{block.caption}</figcaption>
                )}
              </figure>
            );
            break;

          case 'callout':
            const icons = {
              info: <Info className="w-5 h-5 text-blue-600" />,
              warning: <AlertTriangle className="w-5 h-5 text-amber-600" />,
              success: <CheckCircle className="w-5 h-5 text-emerald-600" />,
              error: <XCircle className="w-5 h-5 text-red-600" />
            };
            const bgs = {
              info: 'bg-blue-50 border-blue-200',
              warning: 'bg-amber-50 border-amber-200',
              success: 'bg-emerald-50 border-emerald-200',
              error: 'bg-red-50 border-red-200'
            };
            content = (
              <div id={block.id} className={`p-4 rounded-xl border flex gap-3 my-6 ${bgs[block.variant as keyof typeof bgs] || bgs.info}`}>
                <div className="flex-shrink-0 mt-0.5">
                  {icons[block.variant as keyof typeof icons] || icons.info}
                </div>
                <div>
                  {block.title && <h4 className="font-semibold text-slate-900 mb-1">{block.title}</h4>}
                  <div className="text-slate-700 text-sm leading-relaxed">
                    <ReactMarkdown>{block.content}</ReactMarkdown>
                  </div>
                </div>
              </div>
            );
            break;

          case 'code':
            content = (
              <div id={block.id} className="my-6 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 text-xs font-mono text-slate-400 flex justify-between items-center">
                  <span>{block.language}</span>
                </div>
                <pre className="p-4 overflow-x-auto text-sm text-slate-50">
                  <code>{block.code}</code>
                </pre>
              </div>
            );
            break;

          case 'prompt':
            content = (
              <div id={block.id} className="my-6 rounded-xl border border-indigo-100 bg-indigo-50/50 p-5">
                <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">Prompt</div>
                <div className="font-mono text-slate-800 text-sm whitespace-pre-wrap">{block.content}</div>
                {block.copyEnabled && (
                  <div className="mt-4 pt-4 border-t border-indigo-100">
                    <CopyPromptButton content={block.content} />
                  </div>
                )}</div>
            );
            break;

          case 'list':
            content = (
              <ul id={block.id} className="my-6 space-y-3">
                {block.items?.map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            );
            break;

          case 'quiz':
            content = <QuizComponent questions={block.questions} />;
            break;

          case 'divider':
            content = <hr id={block.id} className="my-8 border-slate-200" />;
            break;

          default:
            content = null;
        }

        if (!content) return null;

        if (isUpdated) {
          return (
            <div key={block.id || index} className="relative isolate">
              <div className="absolute -inset-y-3 -inset-x-4 md:-inset-x-6 border-l-2 border-amber-400 bg-amber-400/5 ring-1 ring-amber-400/10 rounded-r-xl -z-10" />
              {content}
            </div>
          );
        }

        return <React.Fragment key={block.id || index}>{content}</React.Fragment>;
      })}
    </div>
  );
}
