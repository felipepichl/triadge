import { Category } from '@modules/product/domain/category/Category'

interface ICategoryRepositry {
  create(category: Category): Promise<void>
  listAll(): Promise<Category[]>
  listById(id: string): Promise<Category>
  listByDescription(description: string): Promise<Category>
}

export { ICategoryRepositry }
