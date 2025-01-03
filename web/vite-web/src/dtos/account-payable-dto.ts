export type CreateAccountPayableDTO = {
  description: string
  amount: number
  dueDate?: Date
  installments?: number
  financialCategoryId: string
  subcategoryId?: string
}
