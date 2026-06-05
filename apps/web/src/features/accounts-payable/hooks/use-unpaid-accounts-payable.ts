import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListAllUnpaidAccountsPayableByMonth } from '@/features/accounts-payable/api/list-all-unpaid-account-payable-by-month'

export function useUnpaidAccountsPayable(month: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['accounts-payable', 'unpaid', month],
    queryFn: () => apiListAllUnpaidAccountsPayableByMonth({ month }),
    enabled: !!user && month > 0,
  })
}
