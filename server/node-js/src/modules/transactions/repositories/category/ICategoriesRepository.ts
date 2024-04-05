import { Category } from '@modules/transactions/domain/category/Category'

interface ICategoriesRepository {
  create(category: Category): Promise<void>
  listAll(): Promise<Category[]>
  findByDescription(description: string): Promise<Category>
}

export { ICategoriesRepository }
