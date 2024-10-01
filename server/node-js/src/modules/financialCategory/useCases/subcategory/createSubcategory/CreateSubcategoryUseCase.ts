import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoriesRepository } from '@modules/financialCategory/repositories/IFinancialCategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  description: string
  userId: string
  parentCategoryId: string
}

@injectable()
class CreateSubcategoryUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('FinancialCategoriesRepository')
    private financialCategoriesRepository: IFinancialCategoriesRepository,
  ) {}

  async execute({
    description,
    userId,
    parentCategoryId,
  }: IRequest): Promise<void> {
    const descriptionAlreadyExists =
      await this.financialCategoriesRepository.findByDescriptionAndParentCategory(
        description,
        parentCategoryId,
      )

    if (descriptionAlreadyExists) {
      throw new AppError('Subategory description already exists', 400)
    }

    const financialCategory = FinancialCategory.createFinancialCategory({
      description,
      userId,
      parentCategoryId,
    })

    await this.financialCategoriesRepository.create(financialCategory)
  }
}

export { CreateSubcategoryUseCase }
