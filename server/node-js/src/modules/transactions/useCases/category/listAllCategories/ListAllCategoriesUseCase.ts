import { Category } from '@modules/transactions/domain/category/Category'
import { ICategoriesRepository } from '@modules/transactions/repositories/category/ICategoriesRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'

interface IResponse {
  categories: Category[]
}

class ListAllCategoriesUseCase implements IUseCase<void, IResponse> {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute(): Promise<IResponse> {
    return null
  }
}

export { ListAllCategoriesUseCase }
