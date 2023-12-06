import { Subcategory } from '@modules/products/domain/subcategory/Subcategory'

interface ISubcategoryRepositry {
  create(subcategory: Subcategory): Promise<void>
  listAll(): Promise<Subcategory[]>
  findById(id: string): Promise<Subcategory>
  findByName(name: string): Promise<Subcategory>
}

export { ISubcategoryRepositry }
