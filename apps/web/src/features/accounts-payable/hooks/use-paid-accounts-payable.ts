import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListAllPaidAccountsPayableByMonth } from '@/features/accounts-payable/api/list-all-paid-account-payable-by-month'

export function usePaidAccountsPayable(month: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['accounts-payable', 'paid', month],
    queryFn: () => apiListAllPaidAccountsPayableByMonth({ month }),
    enabled: !!user && month > 0,
  })
}
