import { IStockOperationType } from '@modules/stock/domain/StockOperationType'
import { IStockType } from '@modules/stock/domain/StockType'
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  symbol: string
  price: number
  date?: Date
  quantity: number
  type: IStockType
  operation: IStockOperationType
  userId: string
}

class BuyUseCase implements IUseCase<IRequest, void> {
  constructor(
    // @inject('StockRepository')
    private stocksRepository: IStockRepository,
    // @inject('BrapiB3Provider')
    private b3Provider: IB3Provider,
  ) {}

  async execute({
    symbol,
    price,
    date,
    quantity,
    type,
    operation = { stockOperationType: 'buy' },
    userId,
  }: IRequest): Promise<void> {
    const b3Stock = await this.b3Provider.getQuoteTickers(symbol)

    if (!b3Stock) {
      throw new AppError('Ticket does not exists', 404)
    }
  }
}

export { BuyUseCase }
