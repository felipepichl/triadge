import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiGetPortfolioQuotes } from '@/features/stock/api/get-portfolio-quotes'

export function usePortfolio(type: string) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['stock', 'portfolio', type],
    queryFn: () => apiGetPortfolioQuotes(type),
    enabled: !!user,
  })
}
