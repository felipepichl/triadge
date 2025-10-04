import { Stock } from '@modules/stock/domain/Stock'
import { IStockOperationType } from '@modules/stock/domain/StockOperationType'
import { StockPosition } from '@modules/stock/domain/StockPosition'
import { IStockType } from '@modules/stock/domain/StockType'
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider'
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { StockPositionServices } from '@modules/stock/services/StockPositionServices'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  symbol: string
  price: number
  date?: Date
  quantity: number
  type: IStockType
  operation?: IStockOperationType
  userId: string
}

class BuyUseCase implements IUseCase<IRequest, void> {
  constructor(
    // @inject('StockRepository')
    private stockRepository: IStockRepository,
    // @inject('BrapiB3Provider')
    private b3Provider: IB3Provider,
    // @inject()
    private stockPositionRepository: IStockPositionRepository,
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

    const stock = Stock.createStock({
      shortName: b3Stock.shortName,
      symbol: b3Stock.symbol,
      price,
      date,
      quantity,
      type,
      operation,
      userId,
    })

    await this.stockRepository.create(stock)

    const existing = await this.stockPositionRepository.findByUserAndSymbol(
      userId,
      symbol,
    )

    if (!existing) {
      const newPosition = StockPosition.createStockPosition({
        symbol,
        quantity,
        type,
        avgPrice: price,
        userId,
      })

      await this.stockPositionRepository.create(newPosition)
    } else {
      const updated = StockPositionServices.increasePosition(
        existing,
        quantity,
        price,
      )

      await this.stockPositionRepository.update(updated)
    }
  }
}

export { BuyUseCase }
