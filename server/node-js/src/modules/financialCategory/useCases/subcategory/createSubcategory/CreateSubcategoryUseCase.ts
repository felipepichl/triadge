import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { IFinancialCategoryRepository } from '@modules/financialCategory/repositories/IFinancialCategoryRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  description: string
  parentCategoryId: string
}

@injectable()
class CreateSubcategoryUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('FinancialCategoryRepository')
    private financialCategoryRepository: IFinancialCategoryRepository,
  ) {}

  async execute({ description, parentCategoryId }: IRequest): Promise<void> {
    const descriptionAlreadyExists =
      await this.financialCategoryRepository.findByDescriptionAndParentCategory(
        description,
        parentCategoryId,
      )

    if (descriptionAlreadyExists) {
      throw new AppError('Subategory description already exists', 400)
    }

    const financialCategory = FinancialCategory.createFinancialCategory({
      description,
      parentCategoryId,
    })

    await this.financialCategoryRepository.create(financialCategory)
  }
}

export { CreateSubcategoryUseCase }
