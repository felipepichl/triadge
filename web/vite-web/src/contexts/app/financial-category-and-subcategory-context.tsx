import { createContext, ReactNode, useCallback, useState } from 'react'

import { apiListAllFinancialCategoryByUser } from '@/api/app/financial-category/list-all-financial-category-by-user'
import { apiListAllSubcategoryByCategory } from '@/api/app/financial-category/list-all-subcategory-by-category'
import { apiListTotalSpentByFinancialCategory } from '@/api/app/financial-category/list-total-spent-by-financial-category'
import { apiListTotalSpentToFixedAccountPayable } from '@/api/app/financial-category/list-total-spent-to-fixed-account-payable'
import { apiListTotalSpentToUnfixedAccountPayable } from '@/api/app/financial-category/list-total-spent-to-unfixed-account-payable'
import {
  FinancialCategoryDetailDTO,
  ListTotalSpentByFinancialCategoryResponseDTO,
  TotalSpentDTO,
} from '@/dtos/financial-category-dto'
import { SubcategoryDetailDTO } from '@/dtos/subcategory-dto'

type FinancialCaterogyAndSubcategoryContextData = {
  financialCategories: FinancialCategoryDetailDTO[]
  listAllFinancialCategoriesByUser(): Promise<void>
  subcategories: SubcategoryDetailDTO[]
  listSubcategoryByCategory(parentCategoryId: string): Promise<void>
  totalSpentByFinancialCategory: TotalSpentDTO[]
  listTotalSpentByFinancialCategory(month: number): Promise<void>
  totalSpentToFixedAccount: TotalSpentDTO[]
  listTotalSpentToFixedAccountPayable(month: number): Promise<void>
  totalSpentToUnfixedAccount: TotalSpentDTO[]
  listTotalSpentToUnfixedAccountPayable(month: number): Promise<void>
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
  const [totalSpentByFinancialCategory, setTotalSpentByFinancialCategory] =
    useState<TotalSpentDTO[]>([])
  const [totalSpentToFixedAccount, setTotalSpentToFixedAccount] = useState<
    TotalSpentDTO[]
  >([])
  const [totalSpentToUnfixedAccount, setTotalSpentToUnfixedAccount] = useState<
    TotalSpentDTO[]
  >([])

  function totalSpentMap(
    totalSpent: ListTotalSpentByFinancialCategoryResponseDTO,
  ): TotalSpentDTO[] {
    const { totalExpensesByFinancialCategory } = totalSpent

    const result = totalExpensesByFinancialCategory.map(
      ({ financialCategory, totalSpent }) => ({
        financialCategory: financialCategory.props.description,
        value: totalSpent,
      }),
    )

    return result
  }

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
      const totalSpent = await apiListTotalSpentByFinancialCategory({
        month,
        type: 'outcome',
      })

      const result = totalSpentMap(totalSpent)

      setTotalSpentByFinancialCategory(result)
    },
    [],
  )

  const listTotalSpentToFixedAccountPayable = useCallback(
    async (month: number) => {
      const totalSpent = await apiListTotalSpentToFixedAccountPayable({
        month,
      })

      const result = totalSpentMap(totalSpent)

      setTotalSpentToFixedAccount(result)
    },
    [],
  )

  const listTotalSpentToUnfixedAccountPayable = useCallback(
    async (month: number) => {
      const totalSpent = await apiListTotalSpentToUnfixedAccountPayable({
        month,
      })

      const result = totalSpentMap(totalSpent)

      setTotalSpentToUnfixedAccount(result)
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
        totalSpentByFinancialCategory,
        listTotalSpentByFinancialCategory,
        totalSpentToFixedAccount,
        listTotalSpentToFixedAccountPayable,
        totalSpentToUnfixedAccount,
        listTotalSpentToUnfixedAccountPayable,
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
