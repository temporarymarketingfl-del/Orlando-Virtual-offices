import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Simple minimal component to satisfy Vite build requirements
// This is not used at runtime - the actual app runs via Next.js
function App() {
  return (
    <div>
      <h1>Virtual Office Orlando</h1>
      <p>This page is built for Vite compatibility but not used at runtime.</p>
      <p>The actual application runs via Next.js.</p>
    </div>
  )
}

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}