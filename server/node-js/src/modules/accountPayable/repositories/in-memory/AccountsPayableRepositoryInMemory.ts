import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'

import { IAccountsPayableRepository } from '../IAccountsPayableRepository'

class AccountsPayableRepositoryInMemory implements IAccountsPayableRepository {
  private accountsPayable: AccountPayable[] = []

  async create(accountPayable: AccountPayable): Promise<void> {
    this.accountsPayable.push(accountPayable)
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
