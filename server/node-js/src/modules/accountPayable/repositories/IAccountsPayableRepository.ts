import { AccountPayable } from '../domain/AccountPayable'

interface IAccountsPayableRepository {
  create(accountPayable: AccountPayable): Promise<void>
  createMany(accounts: AccountPayable[]): Promise<void>
  update(accountPayable: AccountPayable): Promise<void>
  listAll(userId: string): Promise<AccountPayable[]>
  listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AccountPayable[]>
  listAllFixedAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]>
  listAllUnfixedAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]>
  listAllUnpaidAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]>
  listAllPaidAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]>
  findById(accountPayableId: string): Promise<AccountPayable>
  markAccountAsPaid(accountPayableId: string): Promise<void>
}

export { IAccountsPayableRepository }
