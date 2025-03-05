import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

import { IStockType } from './StockType'

interface IStockProps {
  id?: string
  shortName: string
  symbol: string
  price: number
  date: Date
  quantity: number
  type: IStockType

  userId: string
}

class Stock extends AggregateRoot<IStockProps> {
  constructor(props: IStockProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get shortName(): string {
    return this.props.shortName
  }

  get symbol(): string {
    return this.props.symbol
  }

  get price(): number {
    return this.props.price
  }

  get date(): Date {
    return this.props.date
  }

  get quantity(): number {
    return this.props.quantity
  }

  get type(): IStockType {
    return this.props.type
  }

  get userId(): string {
    return this.props.userId
  }

  public static createStock({
    id,
    shortName,
    symbol,
    price,
    date,
    quantity,
    type,
    userId,
  }: IStockProps): Stock {
    const stockProps = {
      shortName,
      symbol,
      price,
      date: date ? new Date(date) : new Date(),
      quantity,
      type,
      userId,
    }

    return AggregateRoot.create({ props: stockProps, id }, Stock)
  }
}

export { Stock }
