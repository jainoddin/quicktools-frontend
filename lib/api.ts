/**
 * Returns the base URL for the backend API.
 * Uses the live server URL if deployed, otherwise falls back to localhost.
 */
export const getApiUrl = () => {
  // Use env var if present
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  // Fallback for local development
  if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
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
