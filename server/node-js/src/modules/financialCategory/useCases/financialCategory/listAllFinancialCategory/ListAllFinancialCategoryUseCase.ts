import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoryRepository } from '@modules/financialCategory/repositories/financialCategory/IFinancialCategoryRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { inject, injectable } from 'tsyringe'

interface IResponse {
  financialCategories: FinancialCategory[]
}

@injectable()
class ListAllFinancialCategoryUseCase implements IUseCase<void, IResponse> {
  constructor(
    @inject('FinancialCategoryRepository')
    private financialCategoryRepository: IFinancialCategoryRepository,
  ) {}

  async execute(): Promise<IResponse> {
    const financialCategories = await this.financialCategoryRepository.listAll()

    return {
      financialCategories,
    }
  }
}

export { ListAllFinancialCategoryUseCase }
