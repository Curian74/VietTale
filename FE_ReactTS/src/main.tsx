import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './App.css'
import Index from './routes/Index';
import { AuthProvider } from './contexts/AuthProvider';
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Index />
        <Analytics />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
