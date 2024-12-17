import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { AccountPayable as RawAccountPayable } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

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
    financialCategoryId,
  }: RawAccountPayable): AccountPayable {
    return AccountPayable.createAccountPayable({
      id,
      description,
      amount: Number(amount),
      dueDate,
      paymentDate,
      isPaid,
      isFixed,
      userId,
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
