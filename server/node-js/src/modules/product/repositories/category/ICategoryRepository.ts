import { Category } from '@modules/product/domain/category/Category'

interface ICategoryRepositry {
  create(category: Category): Promise<void>
  listAll(): Promise<Category[]>
  findById(id: string): Promise<Category>
  findByName(name: string): Promise<Category>
}

export { ICategoryRepositry }
