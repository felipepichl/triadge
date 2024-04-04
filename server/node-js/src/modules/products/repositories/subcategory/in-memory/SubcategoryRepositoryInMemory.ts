import { Subcategory } from '@modules/products/domain/subcategory/Subcategory'

import { ISubcategoryRepositry } from '../ISubcategoryRepository'

class SubcategoriesRepositoryInMemory implements ISubcategoryRepositry {
  private subcategories: Subcategory[] = []

  async create(subcategory: Subcategory): Promise<void> {
    this.subcategories.push(subcategory)
  }

  async listAll(): Promise<Subcategory[]> {
    return this.subcategories
  }

  async findById(id: string): Promise<Subcategory> {
    return this.subcategories.find(
      (subcategory) => subcategory.id.toString() === id,
    )
  }

  async findByName(name: string): Promise<Subcategory> {
    return this.subcategories.find((subcategory) => subcategory.name === name)
  }
}

export { SubcategoriesRepositoryInMemory }
