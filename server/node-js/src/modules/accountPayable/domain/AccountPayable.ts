import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IAccounPayableProps {
  id?: string
  description: string
  amount: number
  dueDate: Date
  paymentDate?: Date
  isPaid: boolean
  totalInstallments: number

  userId: string

  financialCategory?: FinancialCategory
  financialCategoryId: string

  subcategory?: FinancialCategory
  subcategoryId?: string
}

class AccountPayable extends AggregateRoot<IAccounPayableProps> {
  constructor(props: IAccounPayableProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get description(): string {
    return this.props.description
  }

  get amount(): number {
    return this.props.amount
  }

  get dueDate(): Date {
    return this.props.dueDate
  }

  get paymentDate(): Date {
    return this.props.paymentDate
  }

  get isPaid(): boolean {
    return this.props.isPaid
  }

  get totalInstallments(): number {
    return this.props.totalInstallments
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

  public static createAccountPayable({
    id,
    description,
    amount,
    dueDate,
    paymentDate,
    isPaid,
    totalInstallments,
    userId,
    financialCategoryId,
    financialCategory,
    subcategoryId,
    subcategory,
  }: IAccounPayableProps): AccountPayable {
    const accountPayableProps = {
      description,
      amount,
      dueDate,
      paymentDate,
      isPaid,
      totalInstallments,
      userId,

      financialCategoryId,
      financialCategory,
      subcategoryId,
      subcategory,
    }

    return AggregateRoot.create(
      { props: accountPayableProps, id },
      AccountPayable,
    )
  }
}

export { AccountPayable }