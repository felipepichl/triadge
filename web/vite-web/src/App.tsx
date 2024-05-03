import '@/styles/global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { AuthProvider } from './contexts/auth-context'
import { TransactionsProvider } from './contexts/transactions-context'
import { router } from './routes'

export default function App() {
  return (
    <ThemeProvider storageKey="mm-theme" defaultTheme="system">
      <AuthProvider>
        <HelmetProvider>
          <Helmet titleTemplate="%s | GOEMB" />
          <Toaster richColors position="top-right" />

          <TransactionsProvider>
            <RouterProvider router={router} />
          </TransactionsProvider>
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
