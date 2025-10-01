import { StockPosition } from '../domain/StockPosition'

interface IStockRepository {
  create(stockPosition: StockPosition): Promise<void>
  update(stockPosition: StockPosition): Promise<void>
  findByUserAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<StockPosition | null>
}

export { IStockRepository }
