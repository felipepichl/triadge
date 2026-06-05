import { useMutation, useQueryClient } from '@tanstack/react-query'

import { apiCreateFinancialCategory } from '@/features/financial-categories/api/create-financial-category'

export function useCreateFinancialCategory() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (description: string) =>
      apiCreateFinancialCategory({ description }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-categories'] })
    },
  })
}
