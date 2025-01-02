import { useContext } from 'react'

import {
  TransactionContextData,
  TransactionsContext,
} from '@/contexts/app/transactions-context'

export function useTransaction(): TransactionContextData {
  const context = useContext(TransactionsContext)

  if (!context) {
    throw new Error('useTransaction must be used within an TransactionProvider')
  }

  return context
}
