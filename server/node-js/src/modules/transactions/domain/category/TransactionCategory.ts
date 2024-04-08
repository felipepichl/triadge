import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface ITransactionCategoryProps {
  id?: string
  description: string
}

class TransactionCategory extends AggregateRoot<ITransactionCategoryProps> {
  constructor(props: ITransactionCategoryProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get description(): string {
    return this.props.description
  }

  public static createTransactionCategory({
    id,
    description,
  }: ITransactionCategoryProps): TransactionCategory {
    const categoryProps = {
      description,
    }

    return AggregateRoot.create(
      { props: categoryProps, id },
      TransactionCategory,
    )
  }
}

export { TransactionCategory }
