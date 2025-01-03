import { createContext, ReactNode, useCallback } from 'react'

import { apiCreateAccountPayable } from '@/api/create-account-payable'
import { CreateAccountPayableDTO } from '@/dtos/account-payable-dto'

type AccountPayableContextData = {
  createAccountPayable(data: CreateAccountPayableDTO): Promise<void>
}

type AccountPayableProvidersProps = {
  children: ReactNode
}

const AccountPayableContext = createContext({} as AccountPayableContextData)

function AccountsPayableProvider({ children }: AccountPayableProvidersProps) {
  const createAccountPayable = useCallback(
    async ({
      description,
      amount,
      dueDate,
      installments,
      financialCategoryId,
      subcategoryId,
    }: CreateAccountPayableDTO) => {
      await apiCreateAccountPayable({
        description,
        amount,
        dueDate,
        installments,
        financialCategoryId,
        subcategoryId,
      })
    },
    [],
  )

  return (
    <AccountPayableContext.Provider value={{ createAccountPayable }}>
      {children}
    </AccountPayableContext.Provider>
  )
}

export type { AccountPayableContextData }
export { AccountPayableContext, AccountsPayableProvider }
