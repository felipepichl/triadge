import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
}

interface IResponse {
  financialCategories: FinancialCategory[]
}

@injectable()
class ListAllCategoriesByUserUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const financialCategories =
      await this.financialCategoriesRepository.listAllCategoriesByUser(userId)

    return {
      financialCategories,
    }
  }
}

export { ListAllCategoriesByUserUseCase }
