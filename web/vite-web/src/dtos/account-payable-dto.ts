import { FinancialCategoryDetailDTO } from './financial-category-dto'

export type CreateAccountPayableDTO = {
  description: string
  amount: number
  dueDate?: Date
  installments?: number
  financialCategoryId: string
  subcategoryId?: string
}

export type AccountPayableDetailDTO = {
  _id: string
  description: string
  amount: number
  dueDate: Date
  installments?: number
  subcategoryId?: string
  financialCategory?: FinancialCategoryDetailDTO
}

export type AccountPayableResponseDTO = {
  fixedAccountsPayable: {
    _id: string
    props: AccountPayableDetailDTO
  }[]
  fixedAccountsPayableTotalAmount: number
}

export type AccountPayableDTO = {
  fixedAccountsPayable: AccountPayableDetailDTO[]
  fixedAccountsPayableTotalAmount?: number
}
