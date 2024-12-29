import { useCallback, useState } from 'react'

import { apiListAllFinancialCategoryByUser } from '@/api/list-all-financial-category-by-user'
import { apiListAllSubcategoryByCategory } from '@/api/list-all-subcategory-by-category'
import { FinancialCategoryDetailDTO } from '@/dtos/financial-category-dto'
import { SubcategoryDetailDTO } from '@/dtos/subcategory-dto'

export function useFinancialCategoryAndSubcategory() {
  const [financialCategories, setFinancialCategories] = useState<
    FinancialCategoryDetailDTO[]
  >([])
  const [subcategories, setSubcategories] = useState<SubcategoryDetailDTO[]>([])

  const handleAllFinancialCategoryByUser = useCallback(async () => {
    const response = await apiListAllFinancialCategoryByUser()

    setFinancialCategories(response)
  }, [])

  const handleAllSubcategoryByCategory = useCallback(
    async (parentCategoryId: string) => {
      const response = await apiListAllSubcategoryByCategory({
        parentCategoryId,
      })

      setSubcategories(response)
    },
    [],
  )

  return {
    financialCategories,
    subcategories,
    handleAllFinancialCategoryByUser,
    handleAllSubcategoryByCategory,
  }
}
