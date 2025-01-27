import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'

import { IAccountsPayableRepository } from '../IAccountsPayableRepository'

class AccountsPayableRepositoryInMemory implements IAccountsPayableRepository {
  private accountsPayable: AccountPayable[] = []

  async create(accountPayable: AccountPayable): Promise<void> {
    this.accountsPayable.push(accountPayable)
  }

  async createMany(accounts: AccountPayable[]): Promise<void> {
    this.accountsPayable.push(...accounts)
  }

  async update(accountPayable: AccountPayable): Promise<void> {
    const index = this.accountsPayable.findIndex(
      (item) => item.id === accountPayable.id,
    )

    if (index !== -1) {
      this.accountsPayable[index] = accountPayable
    }
  }

  async listById(accountPayableId: string): Promise<AccountPayable> {
    return this.accountsPayable.find(
      (accountPayable) => accountPayable.id.toString() === accountPayableId,
    )
  }

  async listAll(userId: string): Promise<AccountPayable[]> {
    return this.accountsPayable.filter(
      (accountPayable) => accountPayable.userId === userId,
    )
  }

  async listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<AccountPayable[]> {
    return this.accountsPayable.filter(
      (accountPayable) =>
        accountPayable.userId === userId &&
        accountPayable.dueDate >= startDate &&
        accountPayable.dueDate <= endDate,
    )
  }

  async listAllFixedAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    return this.accountsPayable.filter(
      (accountPayable) =>
        accountPayable.userId === userId &&
        accountPayable.isFixed === true &&
        accountPayable.dueDate.getUTCMonth() + 1 === month,
    )
  }

  async listAllUnfixedAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    return this.accountsPayable.filter(
      (accountPayable) =>
        accountPayable.userId === userId &&
        accountPayable.isFixed === false &&
        accountPayable.dueDate.getUTCMonth() + 1 === month,
    )
  }

  async listAllUnpaidAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    return this.accountsPayable.filter(
      (accountPayable) =>
        accountPayable.userId === userId &&
        accountPayable.isPaid === null &&
        accountPayable.dueDate.getUTCMonth() + 1 === month,
    )
  }

  async listAllPaidAccountsByMonth(
    userId: string,
    month: number,
  ): Promise<AccountPayable[]> {
    return this.accountsPayable.filter(
      (accountPayable) =>
        accountPayable.userId === userId &&
        accountPayable.isPaid === true &&
        accountPayable.dueDate.getUTCMonth() + 1 === month,
    )
  }

  async markAccountAsPaid(accountPayableId: string): Promise<void> {
    const findIndex = this.accountsPayable.findIndex(
      (accountPayable) => accountPayable.id.toString() === accountPayableId,
    )
    this.accountsPayable[findIndex] = {
      ...this.accountsPayable[findIndex],
      isPaid: true,
    } as AccountPayable
  }
}

export { AccountsPayableRepositoryInMemory }
