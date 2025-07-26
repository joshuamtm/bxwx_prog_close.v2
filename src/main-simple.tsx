import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SimpleApp from './SimpleApp.tsx'

console.log('🚀 Simple App starting...');

// Basic styles
const style = document.createElement('style');
style.textContent = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;
document.head.appendChild(style);

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('❌ Root element not found!');
} else {
  console.log('✅ Root element found, rendering SimpleApp...');
  
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <SimpleApp />
      </StrictMode>
    );
    console.log('✅ SimpleApp rendered successfully');
  } catch (error) {
    console.error('❌ Error rendering SimpleApp:', error);
    rootElement.innerHTML = `
      <div style="padding: 20px; font-family: Arial;">
        <h1>🚨 BronxWorks - Loading Error</h1>
        <p>Error: ${error}</p>
        <p>Check the browser console for more details.</p>
      </div>
    `;
  }
}