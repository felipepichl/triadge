import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

interface IAccounPayableProps {
  id?: string
  description: string
  amount: number
  dueDate: Date
  paymentDate?: Date
  isPaid?: boolean
  isFixed?: boolean

  interestPaid?: number
  isInterestPaid?: boolean

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

  get isFixed(): boolean {
    return this.props.isFixed
  }

  get interestPaid(): number {
    return this.props.interestPaid
  }

  get isInterestPaid(): boolean {
    return this.props.isInterestPaid
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
    isFixed,
    interestPaid,
    isInterestPaid,
    userId,
    financialCategory,
    financialCategoryId,
    subcategory,
    subcategoryId,
  }: IAccounPayableProps): AccountPayable {
    const accountPayableProps = {
      description,
      amount,
      dueDate,
      paymentDate,
      isPaid,
      isFixed,
      interestPaid,
      isInterestPaid,
      userId,
      financialCategory,
      financialCategoryId,
      subcategory,
      subcategoryId,
    }

    return AggregateRoot.create(
      { props: accountPayableProps, id },
      AccountPayable,
    )
  }

  public markAsPaid() {
    this.props.isPaid = true
  }

  public updateAmountVariable(amount: number) {
    this.props.amount = amount
  }

  public updateInterestPaid(interest: number, isInterestPaid: boolean = true) {
    this.props.interestPaid = interest
    this.props.isInterestPaid = isInterestPaid
  }
}

export { AccountPayable }
