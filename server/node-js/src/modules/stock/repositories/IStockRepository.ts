import { Stock } from '../domain/Stock'

interface IStockRepository {
  create(stock: Stock): Promise<void>
  listAll(userId: string): Promise<Stock[]>
  listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Stock[]>
}

export { IStockRepository }
