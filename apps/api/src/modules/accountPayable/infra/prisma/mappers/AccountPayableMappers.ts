import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { AccountPayable as RawAccountPayable } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

interface AccountPayableWithCategory {
  id: string
  description: string
  amount: number | string | { toNumber(): number }
  dueDate: Date
  paymentDate?: Date | null
  isPaid: boolean
  isFixed: boolean
  userId: string
  financialCategoryId: string
  financialCategory?:
    | FinancialCategory
    | { id: string; description: string }
    | null
  subcategory?: FinancialCategory | { id: string; description: string } | null
  subcategoryId?: string | null
}

class AccountPayableMappers implements IMapper<
  AccountPayable,
  RawAccountPayable
> {
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
    // Normalize financialCategory if it's a partial object
    const normalizedFinancialCategory =
      financialCategory && 'description' in financialCategory
        ? FinancialCategory.createFinancialCategory({
            id: String(financialCategory.id),
            description: financialCategory.description,
            userId,
          })
        : (financialCategory as FinancialCategory | undefined)

    // Convert amount to number (handles Decimal, string, or number)
    const amountNumber =
      typeof amount === 'object' && 'toNumber' in amount
        ? amount.toNumber()
        : Number(amount)

    return AccountPayable.createAccountPayable({
      id,
      description,
      amount: amountNumber,
      dueDate,
      paymentDate: paymentDate || undefined,
      isPaid,
      isFixed,
      userId,
      financialCategory: normalizedFinancialCategory,
      financialCategoryId,
    })
  }

  toDomainArray(
    rawAccountsPayable: AccountPayableWithCategory[],
  ): AccountPayable[] {
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
