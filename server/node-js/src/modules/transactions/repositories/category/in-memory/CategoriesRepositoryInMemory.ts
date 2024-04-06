import { Category } from '@modules/transactions/domain/category/Category'

import { ICategoriesRepository } from '../ICategoriesRepository'

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  private categories: Category[] = []

  async create(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async listAll(): Promise<Category[]> {
    return this.categories
  }

  async findByDescription(description: string): Promise<Category> {
    const category = this.categories.find(
      (category) => category.description === description,
    )

    return category
  }
}

export { CategoriesRepositoryInMemory }
