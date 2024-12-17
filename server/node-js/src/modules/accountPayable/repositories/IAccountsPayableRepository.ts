import { AccountPayable } from '../domain/AccountPayable'

interface IAccountsPayableRepository {
  create(accountPayable: AccountPayable): Promise<void>
  createMany(accounts: AccountPayable[]): Promise<void>
  listAll(userId: string): Promise<AccountPayable[]>
  listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AccountPayable[]>
  markAccountAsPaid(accountPayableId: string): Promise<void>
}

export { IAccountsPayableRepository }
