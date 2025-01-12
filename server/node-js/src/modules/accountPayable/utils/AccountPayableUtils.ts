import { AccountPayable } from '../domain/AccountPayable'

interface AccountPayableSummary {
  total: number
}

export function calculateAccountsPayableTotals(
  accountsPayable: AccountPayable[],
): AccountPayableSummary {
  return accountsPayable.reduce(
    (accumulator, accountPayable) => {
      accumulator.total += accountPayable.amount
      return accumulator
    },
    {
      total: 0,
    },
  )
}
