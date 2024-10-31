import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
import { ITransactionType } from '@modules/transactions/domain/transaction/TransactionType'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  type: ITransactionType
  month: number
}

interface IResponse {
  totalExpensesByFinancialCategory: Array<{
    financialCategory: FinancialCategory
    totalSpent: number
  }>
}

@injectable()
class ListTotalSpentByFinancialCategoryUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
  ) {}

  async execute({ userId, type, month }: IRequest): Promise<IResponse> {
    const financialCategoriesWithTransactions =
      await this.financialCategoriesRepository.listFinancialCategoriesWithTransactionsByType(
        userId,
        type,
        month,
      )

    const totalExpensesByFinancialCategory =
      financialCategoriesWithTransactions.map(
        ({ financialCategory, financialCategoryTransactions }) => {
          const totalSpent = financialCategoryTransactions.reduce(
            (acc, transaction) => acc + transaction.value,
            0,
          )
          return {
            financialCategory,
            totalSpent,
          }
        },
      )

    return {
      totalExpensesByFinancialCategory,
    }
  }
}

export { ListTotalSpentByFinancialCategoryUseCase }
