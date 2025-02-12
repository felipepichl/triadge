import { createContext, ReactNode, useCallback, useState } from 'react'

import { apiListAllFinancialCategoryByUser } from '@/api/financial-category/list-all-financial-category-by-user'
import { apiListAllSubcategoryByCategory } from '@/api/financial-category/list-all-subcategory-by-category'
import { apiListTotalSpentByFinancialCategory } from '@/api/financial-category/list-total-spent-by-financial-category'
import {
  FinancialCategoryDetailDTO,
  TotalSpentDTO,
} from '@/dtos/financial-category-dto'
import { SubcategoryDetailDTO } from '@/dtos/subcategory-dto'

type FinancialCaterogyAndSubcategoryContextData = {
  financialCategories: FinancialCategoryDetailDTO[]
  listAllFinancialCategoriesByUser(): Promise<void>
  subcategories: SubcategoryDetailDTO[]
  listSubcategoryByCategory(parentCategoryId: string): Promise<void>
  totalSpent: TotalSpentDTO[]
  listTotalSpentByFinancialCategory(month: number): Promise<void>
}

type FinancialCategoryAndSubcategoryProviderProps = {
  children: ReactNode
}

const FinancialCategoryAndSubcategoriesContext = createContext(
  {} as FinancialCaterogyAndSubcategoryContextData,
)

function FinancialCategoryAndSubcategoryProvider({
  children,
}: FinancialCategoryAndSubcategoryProviderProps) {
  const [financialCategories, setFinancialCategories] = useState<
    FinancialCategoryDetailDTO[]
  >([])
  const [subcategories, setSubcategories] = useState<SubcategoryDetailDTO[]>([])
  const [totalSpent, setTotalSpent] = useState<TotalSpentDTO[]>([])

  const listAllFinancialCategoriesByUser = useCallback(async () => {
    const response = await apiListAllFinancialCategoryByUser()

    setFinancialCategories(response)
  }, [])

  const listSubcategoryByCategory = useCallback(
    async (parentCategoryId: string) => {
      const response = await apiListAllSubcategoryByCategory({
        parentCategoryId,
      })

      setSubcategories(response)
    },
    [],
  )

  const listTotalSpentByFinancialCategory = useCallback(
    async (month: number) => {
      const { totalExpensesByFinancialCategory } =
        await apiListTotalSpentByFinancialCategory({
          month,
          type: 'outcome',
        })

      const result = totalExpensesByFinancialCategory.map((item) => ({
        financialCategory: item.financialCategory.props.description,
        value: item.totalSpent,
      }))

      setTotalSpent(result)
    },
    [],
  )

  return (
    <FinancialCategoryAndSubcategoriesContext.Provider
      value={{
        financialCategories,
        listAllFinancialCategoriesByUser,
        subcategories,
        listSubcategoryByCategory,
        totalSpent,
        listTotalSpentByFinancialCategory,
      }}
    >
      {children}
    </FinancialCategoryAndSubcategoriesContext.Provider>
  )
}

export type { FinancialCaterogyAndSubcategoryContextData }
export {
  FinancialCategoryAndSubcategoriesContext,
  FinancialCategoryAndSubcategoryProvider,
}
