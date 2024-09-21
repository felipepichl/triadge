import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoryRepository } from '@modules/financialCategory/repositories/IFinancialCategoryRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IResponse {
  subcategories: FinancialCategory[]
}

interface IRequest {
  parentCategoryId: string
}

@injectable()
class ListSubcategoriesByCategoryId implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('FinancialCategoryRepository')
    private financialCategoryRepository: IFinancialCategoryRepository,
  ) {}

  async execute({ parentCategoryId }: IRequest): Promise<IResponse> {
    const subcategories =
      await this.financialCategoryRepository.listSubcategoriesByCategoryId(
        parentCategoryId,
      )

    return {
      subcategories,
    }
  }
}

export { ListSubcategoriesByCategoryId }
