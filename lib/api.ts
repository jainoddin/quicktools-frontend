/**
 * Returns the base URL for the backend API.
 * Uses the live server URL if deployed, otherwise falls back to localhost.
 */
export const getApiUrl = () => {
  // Use env var if present (set in .env.local or deployment environment)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // During build time (SSG/SSR), window is not available - use the live backend directly
  if (typeof window === 'undefined') {
    return 'https://quicktools-backend-wlm5.onrender.com';
  }
  // Client side: use localhost for local dev, else live backend
  if (window.location.hostname === 'localhost') {
    return 'http://localhost:5000';
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
