import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListAllTransaction } from '@/features/transactions/api/list-all-transaction'

export function useTransactions() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['transactions'],
    queryFn: apiListAllTransaction,
    enabled: !!user,
  })
}
