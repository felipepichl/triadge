import { IMapper } from '@shared/core/infra/Mapper'

import { Category } from '@modules/product/domain/category/Category'
import { Category as RawCategory } from '@prisma/client'

class CategoryMappers implements IMapper<Category, RawCategory> {
  toPersistence(category: Category): Category {
    return category
  }

  toDomain(raw: RawCategory): Category {
    return Category.createCategory(raw)
  }

  toDomainArray(rawCategories: RawCategory[]): Category[] {
    return rawCategories.map(this.toDomain)
  }

  getMapper(): IMapper<Category, RawCategory> {
    return CategoryMappers.getMApper()
  }

  static getMApper(): CategoryMappers {
    return new CategoryMappers()
  }
}

export { CategoryMappers }
