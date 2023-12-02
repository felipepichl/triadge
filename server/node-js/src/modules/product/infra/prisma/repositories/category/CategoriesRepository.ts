import { Category } from '@modules/product/domain/category/Category'
import { ICategoryRepositry } from '@modules/product/repositories/category/ICategoryRepository'

import { PrismaSingleton } from '@shared/infra/prisma'

import { CategoryMappers } from '../../mappers/category/CategoryMappers'

class CategoriesRepository implements ICategoryRepositry {
  async create({ id, description }: Category): Promise<void> {
    const data = {
      name: '',
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

  async listById(id: string): Promise<Category> {
    const result = await PrismaSingleton.getInstance().category.findFirst({
      where: { id },
    })

    return CategoryMappers.getMApper().toDomain(result)
  }

  async listByDescription(description: string): Promise<Category> {
    const result = await PrismaSingleton.getInstance().category.findFirst({
      where: { description },
    })

    return CategoryMappers.getMApper().toDomain(result)
  }
}

export { CategoriesRepository }
