import '@/styles/global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { AuthProvider } from './contexts/auth-context'
import { Routes } from './routes'

export default function App() {
  return (
    <ThemeProvider storageKey="mm-theme" defaultTheme="system">
      <HelmetProvider>
        <Helmet titleTemplate="%s | GOEMB" />
        <Toaster richColors position="top-right" />

        <AuthProvider>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </AuthProvider>
      </HelmetProvider>
    </ThemeProvider>
  )
}
