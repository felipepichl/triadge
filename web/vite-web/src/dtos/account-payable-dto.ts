export type CreateAccountPayableDTO = {
  description: string
  amount: number
  date?: Date
  installments?: number
  financialCategoryId: string
  subcategoryId?: string
}
