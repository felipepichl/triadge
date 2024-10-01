import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IResponse {
  subcategories: FinancialCategory[]
}

interface IRequest {
  userId: string
  parentCategoryId: string
}

@injectable()
class ListSubcategoriesByCategoryIdUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    @inject('FinancialCategoryRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
  ) {}

  async execute({ userId, parentCategoryId }: IRequest): Promise<IResponse> {
    const subcategories =
      await this.financialCategoriesRepository.listSubcategoriesByCategoryId(
        parentCategoryId,
        userId,
      )

    return {
      subcategories,
    }
  }
}

export { ListSubcategoriesByCategoryIdUseCase }
