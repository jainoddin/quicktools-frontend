/**
 * Returns the base URL for the backend API.
 *
 * Strategy:
 * - Server-side (SSR/SSG): Use NEXT_PUBLIC_API_URL if set, else Render backend directly.
 * - Client-side (browser): Always use '' (empty) so requests go to /api/* as relative URLs.
 *   Next.js rewrites /api/* → Render backend (no CORS issues).
 */
export const getApiUrl = () => {
  // Client-side: use relative URL (proxied via Next.js rewrites → no CORS issue)
  if (typeof window !== 'undefined') {
    return '';
  }

  // Server-side (SSR/SSG/build): use env var if set, else direct Render backend URL
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  return 'https://quicktools-backend-wlm5.onrender.com';
};

/**
 * Helper to get the full endpoint URL
 */
export const getEndpoint = (path: string) => {
  return `${getApiUrl()}${path}`;
};
