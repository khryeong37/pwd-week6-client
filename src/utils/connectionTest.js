// 연결 테스트 유틸리티
import { apiUrl } from '../config/environment';

// 런타임에 window.__APP_API_URL__ 값을 주입할 수 있게 보조 변수 사용
let runtimeApiUrl = apiUrl;
if (typeof window !== 'undefined' && window.__APP_API_URL__) {
  runtimeApiUrl = window.__APP_API_URL__;
}

export const testConnection = async () => {
  try {
    console.log('🔍 Testing connection to:', runtimeApiUrl);

    const response = await fetch(`${runtimeApiUrl}/health`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Connection successful:', data);
    return { success: true, data };
    
  } catch (error) {
    console.error('❌ Connection failed:', error);
    return { 
      success: false, 
      error: error.message,
      apiUrl: runtimeApiUrl
    };
  }
};

export const testApiEndpoints = async () => {
  const endpoints = [
    '/api/restaurants',
    '/api/auth/me'
  ];
  
  const results = {};
  
  for (const endpoint of endpoints) {
    try {
      const response = await fetch(`${runtimeApiUrl}${endpoint}`, {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      });
      
      results[endpoint] = {
        status: response.status,
        ok: response.ok,
        statusText: response.statusText
      };
      
    } catch (error) {
      results[endpoint] = {
        error: error.message
      };
    }
  }
  
  console.log('🔍 API Endpoints Test Results:', results);
  return results;
};
