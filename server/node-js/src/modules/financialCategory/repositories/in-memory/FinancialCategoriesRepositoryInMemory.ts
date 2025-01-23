import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType'

import { IFinancialCategoriesRepository } from '../IFinancialCategoriesRepository'

class FinancialCategoriesRepositoryInMemory
  implements IFinancialCategoriesRepository
{
  private financialCategories: FinancialCategory[] = []
  private transactions: Transaction[] = []
  private accountsPayable: AccountPayable[] = []

  async create(financialCategory: FinancialCategory): Promise<void> {
    this.financialCategories.push(financialCategory)
  }

  async listAllCategoriesByUser(userId: string): Promise<FinancialCategory[]> {
    return this.financialCategories.filter(
      (financialCategory) => financialCategory.userId === userId,
    )
  }

  async listSubcategoriesByCategoryId(
    userId: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory[]> {
    return this.financialCategories.filter(
      (financialCategory) =>
        financialCategory.userId === userId &&
        financialCategory.parentCategoryId === parentCategoryId,
    )
  }

  async listFinancialCategoriesWithTransactionsByType(
    userId: string,
    type: ITransactionType,
    month: number,
  ): Promise<
    Array<{
      financialCategory: FinancialCategory
      financialCategoryTransactions: Transaction[]
    }>
  > {
    const year = new Date().getFullYear()

    const userFinancialCategories = this.financialCategories.filter(
      (financialCategory) => financialCategory.userId === userId,
    )

    return userFinancialCategories.map((financialCategory) => {
      const financialCategoryTransactions = this.transactions.filter(
        (transaction) =>
          transaction.financialCategoryId === financialCategory.id.toString() &&
          transaction.type === type.type &&
          transaction.date.getFullYear() === year &&
          transaction.date.getMonth() === month - 1,
      )

      return {
        financialCategory,
        financialCategoryTransactions,
      }
    })
  }

  async listFinancialCategoriesWithFixedAccountsPayable(
    userId: string,
    month: number,
  ): Promise<
    Array<{
      financialCategory: FinancialCategory
      financialCategoryAccountsPayable: AccountPayable[]
    }>
  > {
    const year = new Date().getFullYear()

    const userFinancialCategories = this.financialCategories.filter(
      (financialCategory) => financialCategory.userId === userId,
    )

    return userFinancialCategories.map((financialCategory) => {
      const financialCategoryAccountsPayable = this.accountsPayable.filter(
        (accountPayable) =>
          accountPayable.financialCategoryId ===
            financialCategory.id.toString() &&
          accountPayable.isFixed === true &&
          accountPayable.dueDate.getFullYear() === year &&
          accountPayable.dueDate.getMonth() === month - 1,
      )

      return {
        financialCategory,
        financialCategoryAccountsPayable,
      }
    })
  }

  async listFinancialCategoriesWithUnfixedAccountsPayable(
    userId: string,
    month: number,
  ): Promise<
    Array<{
      financialCategory: FinancialCategory
      financialCategoryAccountsPayable: AccountPayable[]
    }>
  > {
    const year = new Date().getFullYear()

    const userFinancialCategories = this.financialCategories.filter(
      (financialCategory) => financialCategory.userId === userId,
    )

    return userFinancialCategories.map((financialCategory) => {
      const financialCategoryAccountsPayable = this.accountsPayable.filter(
        (accountPayable) =>
          accountPayable.financialCategoryId ===
            financialCategory.id.toString() &&
          accountPayable.isFixed === false &&
          accountPayable.dueDate.getFullYear() === year &&
          accountPayable.dueDate.getMonth() === month - 1,
      )

      return {
        financialCategory,
        financialCategoryAccountsPayable,
      }
    })
  }

  async findByDescription(description: string): Promise<FinancialCategory> {
    return this.financialCategories.find(
      (financialCategory) => financialCategory.description === description,
    )
  }

  async findByDescriptionAndParentCategory(
    description: string,
    parentCategoryId: string,
  ): Promise<FinancialCategory> {
    return this.financialCategories.find(
      (financialCategory) =>
        financialCategory.description === description &&
        financialCategory.parentCategoryId === parentCategoryId,
    )
  }

  async findById(id: string): Promise<FinancialCategory> {
    return this.financialCategories.find(
      (financialCategory) => financialCategory.id.toString() === id,
    )
  }

  async addTransaction(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction)
  }

  async addAccountPayable(accountPayable: AccountPayable): Promise<void> {
    this.accountsPayable.push(accountPayable)
  }
}

export { FinancialCategoriesRepositoryInMemory }
