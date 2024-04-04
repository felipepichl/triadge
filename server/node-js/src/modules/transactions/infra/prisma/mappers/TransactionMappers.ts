import { Transaction } from '@modules/transactions/domain/Transaction'
import { Transaction as RawTransaction } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

class TransactionMappers implements IMapper<Transaction, RawTransaction> {
  toPersistence(transaction: Transaction): Transaction {
    return transaction
  }

  toDomain({
    description,
    detail,
    type,
    value,
    date,
  }: RawTransaction): Transaction {
    return Transaction.createTransaction({
      description,
      detail,
      type: type as 'income' | 'outcome',
      value: Number(value),
      date,
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
