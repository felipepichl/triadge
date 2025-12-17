import { Stock } from '@modules/stock/domain/Stock'
import { IStockOperationType } from '@modules/stock/domain/StockOperationType'
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { StockPositionServices } from '@modules/stock/services/StockPositionServices'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  symbol: string
  price: number
  date?: Date
  quantity: number
  operation?: IStockOperationType
  userId: string
}

@injectable()
class SellStocksUseCase implements IUseCase<IRequest, void> {
  constructor(
    @inject('StockRepository')
    private stockRepository: IStockRepository,
    @inject('StockPositionRepository')
    private stockPositionRepository: IStockPositionRepository,
  ) {}

  async execute({
    symbol,
    price,
    date,
    quantity,
    operation = { stockOperationType: 'sell' },
    userId,
  }: IRequest): Promise<void> {
    const stockPosition =
      await this.stockPositionRepository.findByUserAndSymbol(userId, symbol)

    if (!stockPosition) {
      throw new AppError('Cannot sell, no stock position found', 404)
    }

    const stockCreated = await this.stockRepository.findBySymbol(symbol)

    const stock = Stock.createStock({
      shortName: stockCreated.shortName,
      symbol: stockCreated.symbol,
      price,
      date,
      quantity,
      type: stockCreated.type,
      operation,
      userId,
    })

    await this.stockRepository.create(stock)

    const updated = StockPositionServices.decreasePosition(
      stockPosition,
      quantity,
    )

    await this.stockPositionRepository.update(updated)
  }
}

export { SellStocksUseCase }
