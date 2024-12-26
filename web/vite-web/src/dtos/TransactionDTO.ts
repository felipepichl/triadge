export type CreateTransactionDTO = {
  description: string
  detail?: string
  type: string
  amount: number
  date?: Date
  financialCategoryId: string
  subcategoryId?: string
}
