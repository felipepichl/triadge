import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListAllUnfixedAccountsPayableByMonth } from '@/features/accounts-payable/api/list-all-unfixed-accounts-payable-by-month'

export function useUnfixedAccountsPayable(month: number) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['accounts-payable', 'unfixed', month],
    queryFn: () => apiListAllUnfixedAccountsPayableByMonth({ month }),
    enabled: !!user && month > 0,
  })
}
