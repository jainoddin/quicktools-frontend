import { priorityToolSeoContent, type PriorityToolSeoContent } from './priorityToolSeoContent';
import { toolDeepSpecs } from './toolDeepSpecs';
import { toolByRouteSlug } from './toolsRegistry';

function sentence(value: string) {
  const trimmed = value.trim();
  return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
}

/**
 * Returns a deep, route-specific editorial profile. Five launch profiles retain
 * their hand-edited copy; every other route is backed by an explicit brief in
 * toolDeepSpecs rather than a category fallback.
 */
export function getToolSeoContent(slug: string): PriorityToolSeoContent | null {
  if (priorityToolSeoContent[slug]) return priorityToolSeoContent[slug];

  const tool = toolByRouteSlug.get(slug);
  const spec = toolDeepSpecs[slug];
  if (!tool || !spec) return null;

  const description = sentence(tool.description);
  const resultName = tool.name
    .replace(/^AI\s+/i, '')
    .replace(/\s+(Generator|Builder|Creator|Tool)$/i, '')
    .trim();
  const resultLower = resultName.toLowerCase();

  return {
    name: tool.name,
    intro: `${description} It is designed for ${spec.audience}. The result is a reviewable starting point, not an automatic final decision.`,
    audience: [
      spec.audience,
      `People who need a structured ${resultLower} before detailed review`,
      `Teams that want to document requirements and assumptions for a ${resultLower}`,
      `Users comparing an assisted ${resultLower} with source evidence and their own judgment`,
    ],
    inputs: [
      spec.input,
      `The exact objective and intended audience for this ${resultLower}`,
      'Required format, length, language, deadline, and exclusions',
      'Verified source information that must be preserved in the result',
    ],
    outputs: [
      spec.output,
      `An editable ${resultLower} organized around the submitted constraints`,
      'Clearly reviewable sections that can be corrected or expanded',
      'A practical starting point for the next step in the user’s workflow',
    ],
    steps: [
      { title: `Define the ${resultLower}`, description: `State the real objective, then provide ${spec.input}.` },
      { title: 'Generate a focused draft', description: `Use the submitted details to create ${spec.output}, without treating missing context as verified fact.` },
      { title: 'Review in the real context', description: spec.review },
    ],
    useCases: [
      { title: `Prepare a first ${resultLower}`, description: `Turn a complete brief into ${spec.output} before manual editing and approval.` },
      { title: 'Compare a second direction', description: `Change one meaningful constraint and compare the new result with the original objective and evidence.` },
      { title: 'Support a documented workflow', description: `Save the reviewed result as one traceable step inside the broader ${tool.category.toLowerCase()} process.` },
    ],
    exampleInput: spec.example,
    exampleOutput: `A useful ${tool.name} result would provide ${spec.output}. It would follow the example’s stated constraints, avoid adding unsupported facts, and leave the result ready for the review described below.`,
    limitations: [
      spec.review,
      `${tool.name} can miss context or make incorrect assumptions when the supplied information is incomplete.`,
      'Professional, legal, financial, medical, safety, security, or policy-sensitive decisions require the appropriate qualified review.',
    ],
    faqs: [
      { question: `What is ${tool.name} intended to produce?`, answer: `${description} For a complete brief, the expected result is ${spec.output}.` },
      { question: `What information should I provide to ${tool.name}?`, answer: `Provide ${spec.input}. Add the audience, destination, constraints, and verified source material whenever they affect the result.` },
      { question: `How should I verify the ${resultLower}?`, answer: spec.review },
      { question: `Is the ${tool.name} result ready to use without editing?`, answer: 'No result should be accepted automatically. Check accuracy, completeness, privacy, rights, tone, and any professional or platform requirements before use.' },
    ],
    relatedTools: [],
    relatedContent: [],
  };
}

