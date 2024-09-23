import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoryRepository } from '@modules/financialCategory/repositories/IFinancialCategoryRepository'
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
    private financialCategoryRepository: IFinancialCategoryRepository,
  ) {}

  async execute({ userId, parentCategoryId }: IRequest): Promise<IResponse> {
    const subcategories =
      await this.financialCategoryRepository.listSubcategoriesByCategoryId(
        parentCategoryId,
        userId,
      )

    return {
      subcategories,
    }
  }
}

export { ListSubcategoriesByCategoryIdUseCase }
