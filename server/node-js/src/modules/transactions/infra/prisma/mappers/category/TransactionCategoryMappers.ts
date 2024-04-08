import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { TransactionCategory as RawCategory } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

class TransactionCategoryMappers
  implements IMapper<TransactionCategory, RawCategory>
{
  toPersistence(transactionCategory: TransactionCategory): TransactionCategory {
    return transactionCategory
  }

  toDomain(raw: RawCategory): TransactionCategory {
    return TransactionCategory.createTransactionCategory(raw)
  }

  toDomainArray(rawCategories: RawCategory[]): TransactionCategory[] {
    return rawCategories.map(this.toDomain)
  }

  getMapper(): IMapper<TransactionCategory, RawCategory> {
    return TransactionCategoryMappers.getMApper()
  }

  static getMApper(): TransactionCategoryMappers {
    return new TransactionCategoryMappers()
  }
}

export { TransactionCategoryMappers }
