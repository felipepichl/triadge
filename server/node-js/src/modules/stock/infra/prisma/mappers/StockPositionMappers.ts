import { StockPosition } from '@modules/stock/domain/StockPosition'
import { IStockType } from '@modules/stock/domain/StockType'
import { StockPosition as RawStockPosition } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

class StockPositionMappers implements IMapper<StockPosition, RawStockPosition> {
  toPersistence(stockPosition: StockPosition): StockPosition {
    return stockPosition
  }

  toDomain({
    id,
    symbol,
    type,
    quantity,
    avgPrice,
    userId,
  }: RawStockPosition): StockPosition {
    return StockPosition.createStockPosition({
      id,
      symbol,
      quantity,
      type: { stockType: type } as IStockType,
      avgPrice: Number(avgPrice),
      userId,
    })
  }

  toDomainArray(rawStock: RawStockPosition[]): StockPosition[] {
    return rawStock.map(this.toDomain)
  }

  getMapper(): IMapper<StockPosition, RawStockPosition> {
    return StockPositionMappers.getMapper()
  }

  static getMapper(): StockPositionMappers {
    return new StockPositionMappers()
  }
}

export { StockPositionMappers }
