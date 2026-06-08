import { useQuery } from '@tanstack/react-query'

import { apiListAllUnpaidAccountsPayableByMonth } from '@/features/accounts-payable/api/list-all-unpaid-account-payable-by-month'
import { useAuth } from '@/features/auth/hooks/use-auth'

export function useUnpaidAccountsPayable(month: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['accounts-payable', 'unpaid', month],
    queryFn: () => apiListAllUnpaidAccountsPayableByMonth({ month }),
    enabled: !!user && month > 0,
  })
}
