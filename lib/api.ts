/**
 * Returns the base URL for the backend API.
 * Uses the live server URL if deployed, otherwise falls back to localhost.
 */
export const getApiUrl = () => {
  // Use the public env var if available (works both client and server side)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  // Fallback to the live production backend
  return 'https://quicktool.space';
};

/**
 * Helper to get the full endpoint URL
 */
export const getEndpoint = (path: string) => {
  return `${getApiUrl()}${path}`;
};
