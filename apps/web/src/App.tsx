import '@/shared/styles/global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { THEME_STORAGE } from '@/shared/storage/storage-config'
import { ThemeProvider } from '@/shared/components/theme/theme-provider'
import { FinancialCategoryAndSubcategoryProvider } from '@/features/financial-categories/contexts/financial-category-and-subcategory-context'
import { TransactionsProvider } from '@/features/transactions/contexts/transactions-context'
import { AuthProvider } from '@/features/auth/contexts/auth-context'
import { router } from './app/routes'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey={THEME_STORAGE} defaultTheme="system">
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
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
