import { Category } from '@modules/product/domain/category/Category'
import { ICategoryRepositry } from '../ICategoryRepository'

class CategoriesRepositoryInMemory implements ICategoryRepositry {
  private categories: Category[] = []

  async create(category: Category): Promise<void> {
    this.categories.push(category)
  }

  async listAll(): Promise<Category[]> {
    return this.categories
  }

  async findById(id: string): Promise<Category> {
    return this.categories.find((category) => category.id.toString() === id)
  }

  async findByName(name: string): Promise<Category> {
    return this.categories.find((category) => category.name === name)
  }
}

export { CategoriesRepositoryInMemory }
