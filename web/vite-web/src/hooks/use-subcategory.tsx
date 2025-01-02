import { useContext } from 'react'

import {
  SubcategoriesContext,
  SubcategoryContextData,
} from '@/contexts/app/subcategory-context'

export function useSubcategory(): SubcategoryContextData {
  const context = useContext(SubcategoriesContext)

  if (!context) {
    throw new Error('useTransaction must be used within an SubcategoryProvider')
  }

  return context
}
