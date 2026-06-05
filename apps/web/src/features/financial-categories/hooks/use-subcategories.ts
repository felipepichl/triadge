import { useQuery } from '@tanstack/react-query'

import { useAuth } from '@/features/auth/hooks/use-auth'
import { apiListAllSubcategoryByCategory } from '@/features/financial-categories/api/list-all-subcategory-by-category'

export function useSubcategories(parentCategoryId: string) {
  const { user } = useAuth()

  return useQuery({
    queryKey: ['subcategories', parentCategoryId],
    queryFn: () => apiListAllSubcategoryByCategory({ parentCategoryId }),
    enabled: !!user && !!parentCategoryId,
  })
}
