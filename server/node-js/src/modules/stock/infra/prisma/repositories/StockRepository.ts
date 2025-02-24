import { Stock } from '@modules/stock/domain/Stock'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { PrismaSingleton } from '@shared/infra/prisma'
import { endOfDay, startOfDay } from 'date-fns'

import { StockMappers } from '../mappers/StockPayableMappers'

class StockRepository implements IStockRepository {
  async create({
    id,
    shortName,
    symbol,
    price,
    date,
    quantity,
    userId,
  }: Stock): Promise<void> {
    const data = {
      shortName,
      symbol,
      price,
      date,
      quantity,
      userId,
    }

    await PrismaSingleton.getInstance().stock.upsert({
      where: { id: id.toString() },
      create: data,
      update: data,
    })
  }

  async listAll(userId: string): Promise<Stock[]> {
    const result = await PrismaSingleton.getInstance().stock.findMany({
      where: { userId },
    })

    return StockMappers.getMapper().toDomainArray(result)
  }

  async listByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date,
  ): Promise<Stock[]> {
    const normalizedStartDate = startOfDay(startDate)
    const normalizedEndDate = endOfDay(endDate)

    const result = await PrismaSingleton.getInstance().stock.findMany({
      where: {
        userId,
        date: { gte: normalizedStartDate, lte: normalizedEndDate },
      },
    })

    return StockMappers.getMapper().toDomainArray(result)
  }
}

export { StockRepository }
