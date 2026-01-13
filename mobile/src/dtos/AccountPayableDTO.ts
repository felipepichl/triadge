export type AccountPayableDetailDTO = {
  _id: string
  description: string
  amount: number
  isPaid: boolean
  dueDate: Date
  paymentDate?: Date
  isFixed: boolean
  financialCategoryId: string
  subcategoryId?: string
}

export type AccountPayableResponseDTO = {
  accountsPayable: {
    _id: string
    props: AccountPayableDetailDTO
  }[]
}

export type AccountPayableDTO = {
  accountsPayable: AccountPayableDetailDTO[]
}

export type ListAccountsPayableByDateRangeBody = {
  startDate: string
  endDate: string
}

export type ListUnpaidAccountsPayableBody = {
  startDate?: string
  endDate?: string
}
