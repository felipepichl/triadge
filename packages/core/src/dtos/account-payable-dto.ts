import {
  FinancialCategoryDetailDTO,
  FinancialCategoryResponseDTO,
} from './financial-category-dto'

type AccountPayableResponseProps = {
  description: string
  amount: number
  isPaid: boolean
  dueDate: Date
  paymentDate?: Date
  isFixed?: boolean
  financialCategory?: FinancialCategoryResponseDTO
}

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
  paymentDate?: Date
  isFixed?: boolean
  installments?: number
  financialCategoryId?: string
  subcategoryId?: string
  financialCategory?: FinancialCategoryDetailDTO
}

export type FixedAccountPayableResponseDTO = {
  fixedAccountsPayable: {
    _id: string
    props: AccountPayableResponseProps
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
    props: AccountPayableResponseProps
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
    props: AccountPayableResponseProps
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
    props: AccountPayableResponseProps
  }[]
  paidAccountsPayableTotalAmount: number
}

export type PaidAccountPayableDTO = {
  paidAccountsPayable: AccountPayableDetailDTO[]
  paidAccountsPayableTotalAmount?: number
}

export type AccountPayableResponseDTO = {
  accountsPayable: {
    _id: string
    props: AccountPayableResponseProps
  }[]
}

export type AccountPayableDTO = {
  accountsPayable: AccountPayableDetailDTO[]
}

export type MarkAccountPayableAsPaidDTO = {
  accountPayableId: string
}

export type UpdateAmountVariableDTO = {
  amount: number
  accountPayableId: string
}

export type ListAccountsPayableByDateRangeBody = {
  startDate: string
  endDate: string
}

export type ListUnpaidAccountsPayableBody = {
  startDate?: string
  endDate?: string
}
