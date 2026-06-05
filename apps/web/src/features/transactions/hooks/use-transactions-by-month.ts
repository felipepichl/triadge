import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListByMonth } from '@/features/transactions/api/list-by-month'

export function useTransactionsByMonth(month: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['transactions', 'month', month],
    queryFn: () => apiListByMonth({ month }),
    enabled: !!user && month > 0,
  })
}
