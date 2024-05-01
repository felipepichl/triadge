import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import {
  Transaction as RawTransaction,
  TransactionCategory,
} from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

interface TransactionWithCategory extends RawTransaction {
  transactionCategory?: TransactionCategory
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
    value,
    date,
    userId,
    transactionCategory,
    transactionCategoryId,
  }: TransactionWithCategory): Transaction {
    return Transaction.createTransaction({
      id,
      description,
      detail,
      type: type as 'income' | 'outcome',
      value: Number(value),
      date,
      userId,
      transactionCategory,
      transactionCategoryId,
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
