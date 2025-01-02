import { createContext, ReactNode, useCallback, useState } from 'react'

import { apiListAllSubcategoryByCategory } from '@/api/list-all-subcategory-by-category'
import { SubcategoryDetailDTO } from '@/dtos/subcategory-dto'

type SubcategoryContextData = {
  subcategories: SubcategoryDetailDTO[]
  loadSubcategoryByCategory(parentCategoryId: string): Promise<void>
}

type SubcategoryProviderProps = {
  children: ReactNode
}

const SubcategoriesContext = createContext({} as SubcategoryContextData)

function SubcategoryProvider({ children }: SubcategoryProviderProps) {
  const [subcategories, setSubcategories] = useState<SubcategoryDetailDTO[]>([])

  const loadSubcategoryByCategory = useCallback(
    async (parentCategoryId: string) => {
      const response = await apiListAllSubcategoryByCategory({
        parentCategoryId,
      })

      setSubcategories(response)
    },
    [],
  )

  return (
    <SubcategoriesContext.Provider
      value={{ subcategories, loadSubcategoryByCategory }}
    >
      {children}
    </SubcategoriesContext.Provider>
  )
}

export type { SubcategoryContextData }
export { SubcategoriesContext, SubcategoryProvider }
