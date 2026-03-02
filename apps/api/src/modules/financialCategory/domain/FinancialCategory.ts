import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IFinancialCategory {
  id?: string
  description: string
  userId: string
  parentCategoryId?: string
}

class FinancialCategory extends AggregateRoot<IFinancialCategory> {
  constructor(props: IFinancialCategory, id?: UniqueEntityID) {
    super(props, id)
  }

  get description(): string {
    return this.props.description
  }

  get parentCategoryId(): string {
    return this.props.parentCategoryId
  }

  get userId(): string {
    return this.props.userId
  }

  public static createFinancialCategory({
    id,
    description,
    userId,
    parentCategoryId,
  }: IFinancialCategory): FinancialCategory {
    const financialCategoryProps = {
      description,
      parentCategoryId,
      userId,
    }

    return AggregateRoot.create(
      { props: financialCategoryProps, id },
      FinancialCategory,
    )
  }
}

export { FinancialCategory }
