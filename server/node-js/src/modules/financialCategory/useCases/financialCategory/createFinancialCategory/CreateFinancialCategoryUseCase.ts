import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoryRepository } from '@modules/financialCategory/repositories/IFinancialCategoryRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  description: string
}

@injectable()
class CreateFinancialCategoryUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('FinancialCategoryRepository')
    private financialCategoryRepository: IFinancialCategoryRepository,
  ) {}

  async execute({ description }: IRequest): Promise<void> {
    const descriptionAlreadyExists =
      await this.financialCategoryRepository.findByDescription(description)

    if (descriptionAlreadyExists) {
      throw new AppError('Financial Category description already exists', 400)
    }

    const financialCategory = FinancialCategory.createFinancialCategory({
      description,
    })

    await this.financialCategoryRepository.create(financialCategory)
  }
}

export { CreateFinancialCategoryUseCase }
