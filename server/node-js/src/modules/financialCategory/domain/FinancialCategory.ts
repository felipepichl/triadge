import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IFinancialCategory {
  id?: string
  description: string
}

class FinancialCategory extends AggregateRoot<IFinancialCategory> {
  constructor(props: IFinancialCategory, id?: UniqueEntityID) {
    super(props, id)
  }

  get description(): string {
    return this.props.description
  }

  public static createFinancialCategory({
    id,
    description,
  }: IFinancialCategory): FinancialCategory {
    const financialCategoryProps = {
      description,
    }

    return AggregateRoot.create(
      { props: financialCategoryProps, id },
      FinancialCategory,
    )
  }
}

export { FinancialCategory }