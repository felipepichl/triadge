import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { AccountPayable as RawAccountPayable } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

interface AccountPayableWithCategory extends RawAccountPayable {
  financialCategory?: FinancialCategory
}

class AccountPayableMappers
  implements IMapper<AccountPayable, RawAccountPayable>
{
  toPersistence(accountPayable: AccountPayable): AccountPayable {
    return accountPayable
  }

  toDomain({
    id,
    description,
    amount,
    dueDate,
    paymentDate,
    isPaid,
    isFixed,
    userId,
    financialCategory,
    financialCategoryId,
  }: AccountPayableWithCategory): AccountPayable {
    return AccountPayable.createAccountPayable({
      id,
      description,
      amount: Number(amount),
      dueDate,
      paymentDate,
      isPaid,
      isFixed,
      userId,
      financialCategory,
      financialCategoryId,
    })
  }

  toDomainArray(rawAccountsPayable: RawAccountPayable[]): AccountPayable[] {
    return rawAccountsPayable.map(this.toDomain)
  }

  getMapper(): IMapper<AccountPayable, RawAccountPayable> {
    return AccountPayableMappers.getMapper()
  }

  static getMapper(): AccountPayableMappers {
    return new AccountPayableMappers()
  }
}

export { AccountPayableMappers }
