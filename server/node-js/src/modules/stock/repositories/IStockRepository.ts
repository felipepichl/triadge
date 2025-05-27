import { Stock } from '../domain/Stock'
import { IStockType } from '../domain/StockType'

interface IStockRepository {
  create(stock: Stock): Promise<void>
  listAll(userId: string): Promise<Stock[]>
  listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Stock[]>
  listByType(userId: string, type: IStockType): Promise<Stock[]>
  listByMonth(userId: string, month: number): Promise<Stock[]>
  listAllSymbolsByUserIdAndType(
    userId: string,
    type: IStockType,
  ): Promise<string[]>
}

export { IStockRepository }
