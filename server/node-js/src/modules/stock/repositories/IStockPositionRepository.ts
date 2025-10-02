import { StockPosition } from '../domain/StockPosition'

interface IStockPositionRepository {
  create(stockPosition: StockPosition): Promise<void>
  update(stockPosition: StockPosition): Promise<void>
  findByUserAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<StockPosition | null>
}

export { IStockPositionRepository }
