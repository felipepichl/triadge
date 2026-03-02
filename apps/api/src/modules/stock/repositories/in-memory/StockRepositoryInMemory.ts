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
      (stock) =>
        stock.userId === userId && stock.type.stockType === type.stockType,
    )
  }

  async listByMonth(userId: string, month: number): Promise<Stock[]> {
    return this.stocks.filter((stock) => {
      return stock.userId === userId && stock.date.getUTCMonth() + 1 === month
    })
  }

  async listAllSymbolsByUserIdAndType(
    userId: string,
    type: IStockType,
  ): Promise<string[]> {
    return this.stocks
      .filter(
        (stock) =>
          stock.userId === userId && stock.type.stockType === type.stockType,
      )
      .map((stock) => stock.symbol)
  }

  async findBySymbol(symbol: string): Promise<Stock> {
    return this.stocks.find((stock) => stock.symbol === symbol)
  }
}

export { StockRepositoryInMemory }
