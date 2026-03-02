import { StockPosition } from '@modules/stock/domain/StockPosition'
import { IStockType } from '@modules/stock/domain/StockType'

import { IStockPositionRepository } from '../IStockPositionRepository'

class StockPositionRepositoryInMemory implements IStockPositionRepository {
  private stocks: StockPosition[] = []

  async create(stockPosition: StockPosition): Promise<void> {
    this.stocks.push(stockPosition)
  }

  async update(stockPosition: StockPosition): Promise<void> {
    const index = this.stocks.findIndex((item) => item.id === stockPosition.id)

    if (index !== -1) {
      this.stocks[index] = stockPosition
    }
  }

  async findByUserAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<StockPosition | null> {
    return this.stocks.find(
      (stockPosition) =>
        stockPosition.userId === userId && stockPosition.symbol === symbol,
    )
  }

  async listByType(userId: string, type: IStockType): Promise<StockPosition[]> {
    return this.stocks.filter(
      (stockPosition) =>
        stockPosition.userId === userId &&
        stockPosition.type.stockType === type.stockType,
    )
  }
}

export { StockPositionRepositoryInMemory }
