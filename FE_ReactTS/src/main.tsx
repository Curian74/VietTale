import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import './App.css'
import Index from './routes/Index';
import { AuthProvider } from './contexts/AuthProvider';
import { Analytics } from "@vercel/analytics/react"
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster position='top-center'/>
        <Index />
        <Analytics />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
