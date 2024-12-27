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
