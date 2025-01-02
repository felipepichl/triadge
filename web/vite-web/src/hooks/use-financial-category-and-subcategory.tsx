import { useCallback, useState } from 'react'

import { apiListAllFinancialCategoryByUser } from '@/api/list-all-financial-category-by-user'
import { FinancialCategoryDetailDTO } from '@/dtos/financial-category-dto'
import { useSubcategory } from '@/hooks/use-subcategory'

export function useFinancialCategoryAndSubcategory() {
  const [financialCategories, setFinancialCategories] = useState<
    FinancialCategoryDetailDTO[]
  >([])

  const { subcategories, loadSubcategoryByCategory } = useSubcategory()

  const handleAllFinancialCategoryByUser = useCallback(async () => {
    const response = await apiListAllFinancialCategoryByUser()

    setFinancialCategories(response)
  }, [])

  const handleAllSubcategoryByCategory = useCallback(
    async (parentCategoryId: string) => {
      await loadSubcategoryByCategory(parentCategoryId)
    },
    [loadSubcategoryByCategory],
  )

  return {
    financialCategories,
    subcategories,
    handleAllFinancialCategoryByUser,
    handleAllSubcategoryByCategory,
  }
}
