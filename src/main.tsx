import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log('App starting...', {
  baseUrl: import.meta.env.BASE_URL,
  mode: import.meta.env.MODE,
  env: import.meta.env
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
