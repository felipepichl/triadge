import { Category } from '@modules/transactions/domain/category/Category'
import { ICategoriesRepository } from '@modules/transactions/repositories/category/ICategoriesRepository'
import { PrismaSingleton } from '@shared/infra/prisma'

import { CategoryMappers } from '../../mappers/category/CategoryMappers'

class CategoriesRepository implements ICategoriesRepository {
  async create({ id, description }: Category): Promise<void> {
    const data = {
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

  async findByDescription(description: string): Promise<Category> {
    const result = await PrismaSingleton.getInstance().category.findFirst({
      where: { description },
    })

    if (!result) {
      return null
    }

    return CategoryMappers.getMApper().toDomain(result)
  }
}

export { CategoriesRepository }
