import { useContext } from 'react'

import {
  AccountPayableContext,
  AccountPayableContextData,
} from '@/contexts/app/accounts-payable-context'

export function useAccountPayable(): AccountPayableContextData {
  const context = useContext(AccountPayableContext)

  if (!context) {
    throw new Error(
      'useTransaction must be used within an AccountPayableProvider',
    )
  }

  return context
}
