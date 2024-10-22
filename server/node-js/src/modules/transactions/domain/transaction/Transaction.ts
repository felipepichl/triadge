import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
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

  financialCategory?: FinancialCategory
  financialCategoryId: string

  subcategory?: FinancialCategory
  subcategoryId?: string
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

  get financialCategory(): FinancialCategory {
    return this.props.financialCategory
  }

  get financialCategoryId(): string {
    return this.props.financialCategoryId
  }

  get subcategory(): FinancialCategory {
    return this.props.subcategory
  }

  get subcategoryId(): string {
    return this.props.subcategoryId
  }

  public static createTransaction({
    id,
    description,
    detail,
    type,
    value,
    date,
    userId,
    financialCategoryId,
    financialCategory,
    subcategoryId,
    subcategory,
  }: ITransactionProps): Transaction {
    const transactionProps = {
      description,
      detail,
      type,
      value,
      date: date ? new Date(date) : new Date(),
      userId,

      financialCategory,
      financialCategoryId,
      subcategory,
      subcategoryId,
    }

    return AggregateRoot.create({ props: transactionProps, id }, Transaction)
  }
}

export { Transaction }
