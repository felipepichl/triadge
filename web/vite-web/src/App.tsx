import '@/styles/global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { AuthProvider } from './contexts/auth-context'
import { router } from './routes'

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider storageKey="mm-theme" defaultTheme="system">
        <HelmetProvider>
          <Helmet titleTemplate="%s | GOEMB" />
          <Toaster richColors position="top-right" />
          <RouterProvider router={router} />
        </HelmetProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}
