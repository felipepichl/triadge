import { AggregateRoot } from '@shared/core/domain/AggregateRoot'
import { UniqueEntityID } from '@shared/core/domain/UniqueEntityID'

import { IStockType } from './StockType'

interface IStockPositionProps {
  id?: UniqueEntityID | string
  symbol: string
  quantity?: number
  type?: IStockType
  avgPrice: number

  userId?: string
}

class StockPosition extends AggregateRoot<IStockPositionProps> {
  constructor(props: IStockPositionProps, id?: UniqueEntityID) {
    super(props, id)
  }

  get symbol(): string {
    return this.props.symbol
  }

  get quantity(): number {
    return this.props.quantity
  }

  get type(): IStockType {
    return this.props.type
  }

  get avgPrice(): number {
    return this.props.avgPrice
  }

  get userId(): string {
    return this.props.userId
  }

  public static createStockPosition({
    id,
    symbol,
    quantity,
    type,
    avgPrice,
    userId,
  }: IStockPositionProps): StockPosition {
    const stockPositionProps = {
      symbol,
      quantity,
      type,
      avgPrice,
      userId,
    }

    return AggregateRoot.create(
      { props: stockPositionProps, id },
      StockPosition,
    )
  }
}

export { StockPosition }
