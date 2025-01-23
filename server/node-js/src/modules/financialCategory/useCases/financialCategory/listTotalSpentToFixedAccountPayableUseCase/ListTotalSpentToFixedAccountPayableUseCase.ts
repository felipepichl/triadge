import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  month: number
}

interface IResponse {
  totalExpensesByFinancialCategory: Array<{
    financialCategory: FinancialCategory
    totalSpent: number
  }>
}

@injectable()
class ListTotalSpentToFixedAccountPayableUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
  ) {}

  async execute({ userId, month }: IRequest): Promise<IResponse> {
    const financialCategoriesWithAccountsPayable =
      await this.financialCategoriesRepository.listFinancialCategoriesWithFixedAccountsPayable(
        userId,
        month,
      )

    const totalExpensesByFinancialCategory =
      financialCategoriesWithAccountsPayable.map(
        ({ financialCategory, financialCategoryAccountsPayable }) => {
          const totalSpent = financialCategoryAccountsPayable.reduce(
            (acc, transaction) => acc + transaction.amount,
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

export { ListTotalSpentToFixedAccountPayableUseCase }
