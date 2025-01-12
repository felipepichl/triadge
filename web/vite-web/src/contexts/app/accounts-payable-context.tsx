import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import { apiCreateAccountPayable } from '@/api/account-payable/create-account-payable'
import { apiCreateFixedAccountPayable } from '@/api/account-payable/create-fixed-account-payable'
import { apiListAllFixedAccountsPayableByMonth } from '@/api/account-payable/list-all-fixed-accounts-payable-by-month'
import { apiListAllUnfixedAccountsPayableByMonth } from '@/api/account-payable/list-all-unfixed-accounts-payable-by-month'
import {
  CreateAccountPayableDTO,
  FixedAccountPayableDTO,
  UnfixedAccountPayableDTO,
} from '@/dtos/account-payable-dto'

type AccountPayableContextData = {
  createAccountPayable(data: CreateAccountPayableDTO): Promise<void>
  createFixedAccountPayable(data: CreateAccountPayableDTO): Promise<void>
  fixedAccountsPayable: FixedAccountPayableDTO | undefined
  unfixedAccountsPayable: UnfixedAccountPayableDTO | undefined
}

type AccountPayableProvidersProps = {
  children: ReactNode
}

const AccountPayableContext = createContext({} as AccountPayableContextData)

function AccountsPayableProvider({ children }: AccountPayableProvidersProps) {
  const [fixedAccountsPayable, setFixedAccountsPayable] =
    useState<FixedAccountPayableDTO>()
  const [unfixedAccountsPayable, setUnfixedAccountsPayable] =
    useState<UnfixedAccountPayableDTO>()

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

  const createFixedAccountPayable = useCallback(
    async ({
      description,
      amount,
      dueDate,
      financialCategoryId,
      subcategoryId,
    }: CreateAccountPayableDTO) => {
      await apiCreateFixedAccountPayable({
        description,
        amount,
        dueDate,
        financialCategoryId,
        subcategoryId,
      })
    },
    [],
  )

  const listAllFixedAccountsPayableByMonth = useCallback(async () => {
    const today = new Date()
    const currentMonth = today.getMonth() + 1

    const response = await apiListAllFixedAccountsPayableByMonth({
      month: currentMonth,
    })

    setFixedAccountsPayable(response)
  }, [])

  const listAllUnfixedAccountsPayableByMonth = useCallback(async () => {
    const today = new Date()
    const currentMonth = today.getMonth() + 1

    const response = await apiListAllUnfixedAccountsPayableByMonth({
      month: currentMonth,
    })

    setUnfixedAccountsPayable(response)
  }, [])

  useEffect(() => {
    listAllFixedAccountsPayableByMonth()
    listAllUnfixedAccountsPayableByMonth()
  }, [listAllFixedAccountsPayableByMonth, listAllUnfixedAccountsPayableByMonth])

  return (
    <AccountPayableContext.Provider
      value={{
        createAccountPayable,
        createFixedAccountPayable,
        fixedAccountsPayable,
        unfixedAccountsPayable,
      }}
    >
      {children}
    </AccountPayableContext.Provider>
  )
}

export type { AccountPayableContextData }
export { AccountPayableContext, AccountsPayableProvider }
