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
  isPaid: boolean
  dueDate: Date
  installments?: number
  subcategoryId?: string
  financialCategory?: FinancialCategoryDetailDTO
}

export type FixedAccountPayableResponseDTO = {
  fixedAccountsPayable: {
    _id: string
    props: AccountPayableDetailDTO
  }[]
  fixedAccountsPayableTotalAmount: number
}

export type FixedAccountPayableDTO = {
  fixedAccountsPayable: AccountPayableDetailDTO[]
  fixedAccountsPayableTotalAmount?: number
}

export type UnfixedAccountPayableResponseDTO = {
  unfixedAccountsPayable: {
    _id: string
    props: AccountPayableDetailDTO
  }[]
  unfixedAccountsPayableTotalAmount: number
}

export type UnfixedAccountPayableDTO = {
  unfixedAccountsPayable: AccountPayableDetailDTO[]
  unfixedAccountsPayableTotalAmount?: number
}

export type UnpaidAccountPayableResponseDTO = {
  unpaidAccountsPayable: {
    _id: string
    props: AccountPayableDetailDTO
  }[]
  unpaidAccountsPayableTotalAmount: number
}

export type UnpaidAccountPayableDTO = {
  unpaidAccountsPayable: AccountPayableDetailDTO[]
  unpaidAccountsPayableTotalAmount?: number
}

export type PaidAccountPayableResponseDTO = {
  paidAccountsPayable: {
    _id: string
    props: AccountPayableDetailDTO
  }[]
  paidAccountsPayableTotalAmount: number
}

export type PaidAccountPayableDTO = {
  paidAccountsPayable: AccountPayableDetailDTO[]
  paidAccountsPayableTotalAmount?: number
}

export type MarkAccountPayableAsPaidDTO = {
  accountPayableId: string
}

export type UpdateAmountVariableDTO = {
  amount: number
  accountPayableId: string
}
