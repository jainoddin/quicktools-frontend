/**
 * Returns the base URL for the backend API.
 * Uses the live server URL if deployed, otherwise falls back to localhost.
 */
export const getApiUrl = () => {
  // Client side dynamic local network resolution
  // We now return empty string on the client so that requests hit the Next.js API proxy!
  // This solves cross-domain cookie issues (ITP on mobile browsers).
  if (typeof window !== 'undefined') {
    return '';
  }

  // Use env var if present (set in .env.local or deployment environment)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Fallback to the live Render backend
  return 'https://quicktools-backend-wlm5.onrender.com';
};

/**
 * Helper to get the full endpoint URL
 */
export const getEndpoint = (path: string) => {
  return `${getApiUrl()}${path}`;
};
