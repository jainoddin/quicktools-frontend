type PromptAction = 'view' | 'copy' | 'use';

const storageKey = (promptId: string, action: PromptAction) =>
  `QuickTool:prompt-action:${action}:${promptId}`;

export async function trackPromptAction(promptId: string, action: PromptAction, options: { oncePerBrowser?: boolean } = {}) {
  const key = storageKey(promptId, action);
  if (options.oncePerBrowser && typeof window !== 'undefined' && localStorage.getItem(key)) return null;

  const response = await fetch(`/api/prompts/${promptId}/track`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action }),
  });
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(data.message || 'Unable to track prompt action');
  if (options.oncePerBrowser && typeof window !== 'undefined') localStorage.setItem(key, new Date().toISOString());
  return data.data;
}
