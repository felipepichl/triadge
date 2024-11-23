import { AccountPayable } from '../domain/AccountPayable'

interface IAccountsPayableRepositories {
  create(accountPayable: AccountPayable): Promise<void>
  listAll(userId: string): Promise<AccountPayable[]>
  listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AccountPayable[]>
  markAccountAsPaid(accountPayableId: string): Promise<void>
}

export { IAccountsPayableRepositories }
