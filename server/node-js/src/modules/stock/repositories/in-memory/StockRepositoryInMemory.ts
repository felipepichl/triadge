import { Stock } from '@modules/stock/domain/Stock'
import { IStockType } from '@modules/stock/domain/StockType'

import { IStockRepository } from '../IStockRepository'

class StockRepositoryInMemory implements IStockRepository {
  private stocks: Stock[] = []

  async create(stock: Stock): Promise<void> {
    this.stocks.push(stock)
  }

  async listAll(userId: string): Promise<Stock[]> {
    return this.stocks.filter((stock) => stock.userId === userId)
  }

  async listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Stock[]> {
    return this.stocks.filter(
      (stock) =>
        stock.userId === userId &&
        stock.date >= startDate &&
        stock.date <= endDate,
    )
  }

  async listByType(userId: string, type: IStockType): Promise<Stock[]> {
    return this.stocks.filter(
      (stock) => stock.userId === userId && stock.type === type,
    )
  }
}

export { StockRepositoryInMemory }
