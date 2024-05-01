import { TransactionCategory } from '@prisma/client'
import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

export interface ITransactionProps {
  id?: string
  description: string
  detail?: string
  type: 'income' | 'outcome'
  value: number
  date?: Date

  userId: string

  transactionCategory?: TransactionCategory
  transactionCategoryId: string
}

class Transaction extends AggregateRoot<ITransactionProps> {
  constructor(props: ITransactionProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get description(): string {
    return this.props.description
  }

  get detail(): string {
    return this.props.detail
  }

  get type(): 'income' | 'outcome' {
    return this.props.type
  }

  get value(): number {
    return this.props.value
  }

  get date(): Date {
    return this.props.date
  }

  get userId(): string {
    return this.props.userId
  }

  get transactionCategory(): TransactionCategory {
    return this.props.transactionCategory
  }

  get transactionCategoryId(): string {
    return this.props.transactionCategoryId
  }

  public static createTransaction({
    id,
    description,
    detail,
    type,
    value,
    date = new Date(),
    userId,
    transactionCategory,
    transactionCategoryId,
  }: ITransactionProps): Transaction {
    const transactionProps = {
      description,
      detail,
      type,
      value,
      date,
      userId,

      transactionCategory,
      transactionCategoryId,
    }

    return AggregateRoot.create({ props: transactionProps, id }, Transaction)
  }
}

export { Transaction }
