import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoryRepository } from '@modules/financialCategory/repositories/IFinancialCategoryRepository'
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
    @inject('FinancialCategoryRepository')
    private financialCategoryRepository: IFinancialCategoryRepository,
  ) {}

  async execute({ userId }: IRequest): Promise<IResponse> {
    const financialCategories =
      await this.financialCategoryRepository.listAllCategoriesByUser(userId)

    return {
      financialCategories,
    }
  }
}

export { ListAllCategoriesByUserUseCase }
