import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiGetTotalInvestedAndCurrentQuote } from '@/features/stock/api/get-total-invested-and-current-quote'

export function useInvestment(type: string = 'fii') {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['stock', 'investment', type],
    queryFn: () => apiGetTotalInvestedAndCurrentQuote(type),
    enabled: !!user,
  })
}
