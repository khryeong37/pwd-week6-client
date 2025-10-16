const FALLBACK_PROD_API_URL = 'https://pwd-week6-server-3jm3.onrender.com';
const FALLBACK_PROD_CLIENT_URL = 'https://pwd-week6-client-sepia.vercel.app';

const getEnvironmentConfig = () => {
  const isDevelopment = import.meta.env.DEV;

  const config = {
    development: {
      apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5000',
      clientUrl: import.meta.env.VITE_CLIENT_URL || 'http://localhost:5173',
    },
    production: {
      apiUrl: import.meta.env.VITE_API_URL || FALLBACK_PROD_API_URL,
      clientUrl: import.meta.env.VITE_CLIENT_URL || FALLBACK_PROD_CLIENT_URL,
    },
  };

  if (typeof window !== 'undefined') {
    const runtimeApi = window.__APP_API_URL__;
    const runtimeClient = window.__APP_CLIENT_URL__;
    const host = window.location.hostname;

    if (runtimeApi) {
      config.production.apiUrl = runtimeApi;
    }

    if (runtimeClient) {
      config.production.clientUrl = runtimeClient;
    }

    if (host && host.endsWith('vercel.app')) {
      config.production.apiUrl = runtimeApi || FALLBACK_PROD_API_URL;
      config.production.clientUrl = runtimeClient || `https://${host}`;
    }
  }

  return isDevelopment ? config.development : config.production;
};

const env = getEnvironmentConfig();

export default env;

export const { apiUrl, clientUrl } = env;

console.log('🌍 Environment Config:', {
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD,
  apiUrl: env.apiUrl,
  clientUrl: env.clientUrl,
  viteApiUrl: import.meta.env.VITE_API_URL,
  viteClientUrl: import.meta.env.VITE_CLIENT_URL,
});
