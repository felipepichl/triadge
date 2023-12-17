import { inject, injectable } from 'tsyringe'

import { Category } from '@modules/products/domain/category/Category'
import { ICategoryRepositry } from '@modules/products/repositories/category/ICategoryRepository'

import { IUseCase } from '@shared/core/domain/IUseCase'

interface IResponse {
  categories: Category[]
}

@injectable()
class ListAllCategoryUseCase implements IUseCase<void, IResponse> {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoryRepositry,
  ) {}

  async execute(): Promise<IResponse> {
    const categories = await this.categoriesRepository.listAll()

    return {
      categories,
    }
  }
}

export { ListAllCategoryUseCase }
