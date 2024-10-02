import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  description: string
  userId: string
}

@injectable()
class CreateFinancialCategoryUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
  ) {}

  async execute({ description, userId }: IRequest): Promise<void> {
    const descriptionAlreadyExists =
      await this.financialCategoriesRepository.findByDescription(description)

    if (descriptionAlreadyExists) {
      throw new AppError('Financial Category description already exists', 400)
    }

    const financialCategory = FinancialCategory.createFinancialCategory({
      description,
      userId,
    })

    await this.financialCategoriesRepository.create(financialCategory)
  }
}

export { CreateFinancialCategoryUseCase }
