import { StockPosition } from '@modules/stock/domain/StockPosition'
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
      type: String(type),
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
        type: String(type),
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
}

export { StockPositionRepository }
