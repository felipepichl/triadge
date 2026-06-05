import { useContext } from 'react'

import {
  AccountPayableContext,
  AccountPayableContextData,
} from '@/features/accounts-payable/contexts/accounts-payable-context'

export function useAccountPayable(): AccountPayableContextData {
  const context = useContext(AccountPayableContext)

  if (!context) {
    throw new Error(
      'useAccountPayable must be used within an AccountPayableProvider',
    )
  }

  return context
}
