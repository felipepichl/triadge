import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface ITransactionProps {
  id?: string
  description: string
  type: 'income' | 'outcome'
  value: number
  date?: Date
}

class Transaction extends AggregateRoot<ITransactionProps> {
  constructor(props: ITransactionProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get description(): string {
    return this.props.description
  }

  get type(): string {
    return this.props.type
  }

  get value(): number {
    return this.props.value
  }

  get date(): Date {
    return this.props.date
  }

  public static createTransaction({
    id,
    description,
    type,
    value,
    date = new Date(),
  }: ITransactionProps): Transaction {
    const transactionProps = {
      description,
      type,
      value,
      date,
    }

    return AggregateRoot.create({ props: transactionProps, id }, Transaction)
  }
}

export { Transaction }