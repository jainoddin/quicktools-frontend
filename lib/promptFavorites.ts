let favoriteIdsPromise: Promise<Set<string>> | null = null;
let favoriteUserId: string | null = null;

export function loadFavoritePromptIds(userId?: string) {
  if (userId && favoriteUserId !== userId) {
    favoriteIdsPromise = null;
    favoriteUserId = userId;
  }
  if (!favoriteIdsPromise) {
    favoriteIdsPromise = fetch('/api/prompts/favorites/me', { credentials: 'include' })
      .then(async response => response.ok ? response.json() : null)
      .then(data => new Set<string>((data?.success ? data.data : []).map((prompt: any) => String(prompt._id))))
      .catch(() => new Set<string>());
  }
  return favoriteIdsPromise;
}

export function invalidateFavoritePromptIds() {
  favoriteIdsPromise = null;
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('prompt-favorites-changed'));
}
