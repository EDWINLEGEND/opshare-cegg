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

// Helper to check if the API is available
export const checkApiConnection = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${apiBaseUrl}api/health`, { 
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Include credentials in the request
      // Short timeout to avoid long waits
      signal: AbortSignal.timeout(3000)
    });
    return response.ok;
  } catch (error) {
    console.error('API connection check failed:', error);
    return false;
  }
};

export default {
  API_BASE_URL,
  getApiUrl,
  checkApiConnection
}; 