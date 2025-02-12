export type CreateFinancialCategoryDTO = {
  description: string
}

export type FinancialCategoryDetailDTO = {
  _id: string
  description: string
}

export type FinancialCategoryResponseDTO = {
  _id: string
  props: {
    description: string
  }
}

export type ListTotalSpentByFinancialCategoryResponseDTO = {
  totalExpensesByFinancialCategory: {
    financialCategory: {
      props: {
        description: string
      }
    }
    totalSpent: number
  }[]
}

export type TotalSpentDTO = {
  financialCategory: string
  value: number
}
