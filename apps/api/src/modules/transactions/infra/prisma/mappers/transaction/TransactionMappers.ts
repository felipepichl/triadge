import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { Transaction as RawTransaction } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

interface TransactionWithCategory extends RawTransaction {
  financialCategory?: FinancialCategory
}

class TransactionMappers implements IMapper<Transaction, RawTransaction> {
  toPersistence(transaction: Transaction): Transaction {
    return transaction
  }

  toDomain({
    id,
    description,
    detail,
    type,
    amount,
    date,
    userId,
    financialCategory,
    financialCategoryId,
  }: TransactionWithCategory): Transaction {
    return Transaction.createTransaction({
      id,
      description,
      detail,
      type: type as 'income' | 'outcome',
      amount: Number(amount),
      date,
      userId,
      financialCategory,
      financialCategoryId,
    })
  }

  toDomainArray(rawTransactions: RawTransaction[]): Transaction[] {
    return rawTransactions.map(this.toDomain)
  }

  getMapper(): IMapper<Transaction, RawTransaction> {
    return TransactionMappers.getMapper()
  }

  static getMapper(): TransactionMappers {
    return new TransactionMappers()
  }
}

export { TransactionMappers }
