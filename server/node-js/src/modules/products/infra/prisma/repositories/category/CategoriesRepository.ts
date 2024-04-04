import { Category } from '@modules/products/domain/category/Category'
import { ICategoryRepositry } from '@modules/products/repositories/category/ICategoryRepository'
import { PrismaSingleton } from '@shared/infra/prisma'

import { CategoryMappers } from '../../mappers/category/CategoryMappers'

class CategoriesRepository implements ICategoryRepositry {
  async create({ id, name, description }: Category): Promise<void> {
    const data = {
      name,
      description,
    }

    await PrismaSingleton.getInstance().category.upsert({
      where: { id: id.toString() },
      create: data,
      update: data,
    })
  }

  async listAll(): Promise<Category[]> {
    const result = await PrismaSingleton.getInstance().category.findMany()

    return CategoryMappers.getMApper().toDomainArray(result)
  }

  async findById(id: string): Promise<Category> {
    const result = await PrismaSingleton.getInstance().category.findFirst({
      where: { id },
    })

    if (!result) {
      return null
    }

    return CategoryMappers.getMApper().toDomain(result)
  }

  async findByName(name: string): Promise<Category> {
    const result = await PrismaSingleton.getInstance().category.findFirst({
      where: { name },
    })

    if (!result) {
      return null
    }

    return CategoryMappers.getMApper().toDomain(result)
  }
}

export { CategoriesRepository }
