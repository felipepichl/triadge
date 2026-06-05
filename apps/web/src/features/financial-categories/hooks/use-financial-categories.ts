import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListAllFinancialCategoryByUser } from '@/features/financial-categories/api/list-all-financial-category-by-user'

export function useFinancialCategories() {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['financial-categories'],
    queryFn: apiListAllFinancialCategoryByUser,
    enabled: !!user,
  })
}
