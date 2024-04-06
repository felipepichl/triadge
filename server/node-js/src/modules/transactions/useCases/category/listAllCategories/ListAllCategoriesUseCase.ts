import { Category } from '@modules/transactions/domain/category/Category'
import { ICategoriesRepository } from '@modules/transactions/repositories/category/ICategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IResponse {
  categories: Category[]
}

class ListAllCategoriesUseCase implements IUseCase<void, IResponse> {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  async execute(): Promise<IResponse> {
    const categories = await this.categoriesRepository.listAll()

    return {
      categories,
    }
  }
}

export { ListAllCategoriesUseCase }
