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
import { apiMarkAccountPayableAsPaid } from '@/api/account-payable/mark-account-payable-as-paid'
import {
  CreateAccountPayableDTO,
  FixedAccountPayableDTO,
  MarkAccountPayableAsPaidDTO,
  UnfixedAccountPayableDTO,
} from '@/dtos/account-payable-dto'

type AccountPayableContextData = {
  createAccountPayable(data: CreateAccountPayableDTO): Promise<void>
  createFixedAccountPayable(data: CreateAccountPayableDTO): Promise<void>
  fixedAccountsPayable: FixedAccountPayableDTO | undefined
  listAllFixedAccountsPayableByMonth(month?: string): Promise<void>
  unfixedAccountsPayable: UnfixedAccountPayableDTO | undefined
  listAllUnfixedAccountsPayableByMonth(month?: string): Promise<void>
  markAccountPayableAsPaid(data: MarkAccountPayableAsPaidDTO): Promise<void>
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
  const [reload, setReload] = useState(false)

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

      setReload((prev) => !prev)
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

      setReload((prev) => !prev)
    },
    [],
  )

  const listAllFixedAccountsPayableByMonth = useCallback(
    async (month?: string) => {
      const today = new Date()
      const currentMonth = today.getMonth() + 1
      const monthToFetch = month ? Number(month) : currentMonth

      const response = await apiListAllFixedAccountsPayableByMonth({
        month: monthToFetch,
      })

      setFixedAccountsPayable(response)
    },
    [],
  )

  const listAllUnfixedAccountsPayableByMonth = useCallback(
    async (month?: string) => {
      const today = new Date()
      const currentMonth = today.getMonth() + 1
      const monthToFetch = month ? Number(month) : currentMonth

      const response = await apiListAllUnfixedAccountsPayableByMonth({
        month: monthToFetch,
      })

      setUnfixedAccountsPayable(response)
    },
    [],
  )

  const markAccountPayableAsPaid = useCallback(
    async ({ accountPayableId }: MarkAccountPayableAsPaidDTO) => {
      await apiMarkAccountPayableAsPaid({ accountPayableId })

      setReload((prev) => !prev)
    },
    [],
  )

  useEffect(() => {
    listAllFixedAccountsPayableByMonth()
    listAllUnfixedAccountsPayableByMonth()
  }, [
    reload,
    listAllFixedAccountsPayableByMonth,
    listAllUnfixedAccountsPayableByMonth,
  ])

  return (
    <AccountPayableContext.Provider
      value={{
        createAccountPayable,
        createFixedAccountPayable,
        fixedAccountsPayable,
        listAllFixedAccountsPayableByMonth,
        unfixedAccountsPayable,
        listAllUnfixedAccountsPayableByMonth,
        markAccountPayableAsPaid,
      }}
    >
      {children}
    </AccountPayableContext.Provider>
  )
}

export type { AccountPayableContextData }
export { AccountPayableContext, AccountsPayableProvider }
