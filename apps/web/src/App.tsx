import '@/styles/global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { FinancialCategoryAndSubcategoryProvider } from './contexts/app/financial-category-and-subcategory-context'
import { TransactionsProvider } from './contexts/app/transactions-context'
import { AuthProvider } from './contexts/auth/auth-context'
import { router } from './routes'

export default function App() {
  return (
    <ThemeProvider storageKey="mm-theme" defaultTheme="system">
      <AuthProvider>
        <HelmetProvider>
          <Helmet titleTemplate="%s | Umabel" />
          <Toaster richColors position="top-right" />

          <TransactionsProvider>
            <FinancialCategoryAndSubcategoryProvider>
              <RouterProvider router={router} />
            </FinancialCategoryAndSubcategoryProvider>
          </TransactionsProvider>
        </HelmetProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
