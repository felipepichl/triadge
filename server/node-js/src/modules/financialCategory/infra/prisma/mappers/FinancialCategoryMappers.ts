import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategory as RawFinancialCategory } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

class FinancialCategoryMappers
  implements IMapper<FinancialCategory, RawFinancialCategory>
{
  toPersistence(financialCategory: FinancialCategory): FinancialCategory {
    return financialCategory
  }

  toDomain(raw: RawFinancialCategory): FinancialCategory {
    return FinancialCategory.createFinancialCategory(raw)
  }

  toDomainArray(
    rawFinancialCategory: RawFinancialCategory[],
  ): FinancialCategory[] {
    return rawFinancialCategory.map(this.toDomain)
  }

  getMapper(): IMapper<FinancialCategory, RawFinancialCategory> {
    return FinancialCategoryMappers.getMApper()
  }

  static getMApper(): FinancialCategoryMappers {
    return new FinancialCategoryMappers()
  }
}

export { FinancialCategoryMappers }
