import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TestApp from './TestApp.tsx'

console.log('🚀 App starting...', {
  baseUrl: import.meta.env.BASE_URL,
  mode: import.meta.env.MODE,
  dev: import.meta.env.DEV,
  prod: import.meta.env.PROD
});

// Simple test first
const rootElement = document.getElementById('root');
console.log('📍 Root element:', rootElement);

if (!rootElement) {
  console.error('❌ Root element not found!');
} else {
  console.log('✅ Root element found, rendering App...');
  
  try {
    // For debugging, let's try the simple test app first
    const useTestApp = new URLSearchParams(window.location.search).has('test');
    
    createRoot(rootElement).render(
      <StrictMode>
        {useTestApp ? <TestApp /> : <App />}
      </StrictMode>,
    );
    console.log('✅ App rendered successfully');
  } catch (error) {
    console.error('❌ Error rendering App:', error);
    // Fallback content
    rootElement.innerHTML = '<div style="padding: 20px; font-family: Arial;"><h1>BronxWorks Loading...</h1><p>If you see this message, check the browser console for errors.</p><p>Try adding ?test to the URL for a simple test.</p></div>';
  }
}
