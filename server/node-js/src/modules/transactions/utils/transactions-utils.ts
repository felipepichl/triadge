import { Transaction } from '@modules/transactions/domain/transaction/Transaction'

interface TransactionSummary {
  income: number
  outcome: number
}

export function calculateTransactionTotals(
  transactions: Transaction[],
): TransactionSummary {
  return transactions.reduce(
    (accumulator, transaction) => {
      switch (transaction.type) {
        case 'income':
          accumulator.income += Number(transaction.value)
          break
        case 'outcome':
          accumulator.outcome += Number(transaction.value)
          break
        default:
          break
      }
      return accumulator
    },
    {
      income: 0,
      outcome: 0,
    },
  )
}
