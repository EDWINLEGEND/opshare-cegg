// API Configuration
let apiBaseUrl: string;

// Determine the base URL based on environment
if (import.meta.env.PROD) {
  // In production, use relative URL to the current origin
  apiBaseUrl = '';
} else {
  // In development, use localhost:5000
  apiBaseUrl = 'http://localhost:5000';
}

// Add a trailing slash if needed
if (apiBaseUrl.length > 0 && !apiBaseUrl.endsWith('/')) {
  apiBaseUrl += '/';
}

export const API_BASE_URL = apiBaseUrl;

// Helper function to build API URLs
export const getApiUrl = (endpoint: string): string => {
  // Remove leading slash from endpoint if it exists
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint;
  return `${apiBaseUrl}${cleanEndpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl
}; 