import { StockPosition } from '@modules/stock/domain/StockPosition'
import { IStockType } from '@modules/stock/domain/StockType'
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository'
import { PrismaSingleton } from '@shared/infra/prisma'

import { StockPositionMappers } from '../mappers/StockPositionMappers'

class StockPositionRepository implements IStockPositionRepository {
  async create({
    id,
    symbol,
    type,
    quantity,
    avgPrice,
    userId,
  }: StockPosition): Promise<void> {
    const data = {
      id: id.toString(),
      symbol,
      type: type.stockType,
      quantity,
      avgPrice,
      userId,
    }

    await PrismaSingleton.getInstance().stockPosition.create({
      data,
    })
  }

  async update({
    id,
    symbol,
    type,
    quantity,
    avgPrice,
    userId,
  }: StockPosition): Promise<void> {
    await PrismaSingleton.getInstance().stockPosition.update({
      where: { id: id.toString() },
      data: {
        symbol,
        type: type.stockType,
        quantity,
        avgPrice,
        userId,
      },
    })
  }

  async findByUserAndSymbol(
    userId: string,
    symbol: string,
  ): Promise<StockPosition | null> {
    const result = await PrismaSingleton.getInstance().stockPosition.findFirst({
      where: { symbol, userId },
    })

    if (!result) {
      return null
    }

    return StockPositionMappers.getMapper().toDomain(result)
  }

  async listByType(userId: string, type: IStockType): Promise<StockPosition[]> {
    const results = await PrismaSingleton.getInstance().stockPosition.findMany({
      where: {
        userId,
        type: type.stockType,
      },
    })

    return results.map((result) =>
      StockPositionMappers.getMapper().toDomain(result),
    )
  }
}

export { StockPositionRepository }
