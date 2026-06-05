import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiCreateSubcategory } from '@/features/financial-categories/api/create-subcategory'

export function useCreateSubcategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      description,
      parentCategoryId,
    }: {
      description: string
      parentCategoryId: string
    }) => apiCreateSubcategory({ description, parentCategoryId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['subcategories'] })
    },
  })
}
