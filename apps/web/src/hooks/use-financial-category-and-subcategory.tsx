import { useContext } from 'react'

import {
  FinancialCategoryAndSubcategoriesContext,
  FinancialCategoryAndSubcategoryContextData,
} from '@/contexts/app/financial-category-and-subcategory-context'

export function useFinancialCategoryAndSubcategory(): FinancialCategoryAndSubcategoryContextData {
  const context = useContext(FinancialCategoryAndSubcategoriesContext)

  if (!context) {
    throw new Error(
      'useFinancialCategoryAndSubcategory must be used within an SubcategoryProvider',
    )
  }

  return context
}
