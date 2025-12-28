export type BalanceDTO = {
  income: number
  outcome: number
  total: number
}

export type TransactionDetailDTO = {
  _id: string
  description: string
  type: string
  amount: number
  date: Date
}

export type TransactionResponseDTO = {
  transactions: {
    _id: string
    props: TransactionDetailDTO
  }[]
  balance: BalanceDTO
}

export type TransactionDTO = {
  transactions: TransactionDetailDTO[]
  balance?: BalanceDTO
}

