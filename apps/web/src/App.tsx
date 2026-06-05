import '@/shared/styles/global.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { AuthProvider } from '@/features/auth/contexts/auth-context'
import { ThemeProvider } from '@/shared/components/theme/theme-provider'
import { THEME_STORAGE } from '@/shared/storage/storage-config'

import { router } from '@/app/routes'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey={THEME_STORAGE} defaultTheme="system">
        <AuthProvider>
          <HelmetProvider>
            <Helmet titleTemplate="%s | Umabel" />
            <Toaster richColors position="top-right" />

            <RouterProvider router={router} />
          </HelmetProvider>
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
