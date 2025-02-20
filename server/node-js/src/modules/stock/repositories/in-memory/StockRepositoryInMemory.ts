import { Stock } from '@modules/stock/domain/Stock'

import { IStockRepository } from '../IStockRepository'

class StockRepositoryInMemory implements IStockRepository {
  private stocks: Stock[] = []

  async create(stock: Stock): Promise<void> {
    await this.create(stock)
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
}

export { StockRepositoryInMemory }
