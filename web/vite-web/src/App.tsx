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
        <TransactionsProvider>
          <HelmetProvider>
            <Helmet titleTemplate="%s | GOEMB" />
            <Toaster richColors position="top-right" />

            <RouterProvider router={router} />
          </HelmetProvider>
        </TransactionsProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
