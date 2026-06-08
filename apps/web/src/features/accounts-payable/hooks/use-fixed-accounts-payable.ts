import { useQuery } from '@tanstack/react-query'

import { apiListAllFixedAccountsPayableByMonth } from '@/features/accounts-payable/api/list-all-fixed-accounts-payable-by-month'
import { useAuth } from '@/features/auth/hooks/use-auth'

export function useFixedAccountsPayable(month: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['accounts-payable', 'fixed', month],
    queryFn: () => apiListAllFixedAccountsPayableByMonth({ month }),
    enabled: !!user && month > 0,
  })
}
