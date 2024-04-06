import { ICategoriesRepository } from '@modules/transactions/repositories/category/ICategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IRequest {
  description: string
}

class CreateCategoryUseCase implements IUseCase<IRequest, void> {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ description }: IRequest): Promise<void> {
    throw new Error('Method not implemented.')
  }
}

export { CreateCategoryUseCase }
