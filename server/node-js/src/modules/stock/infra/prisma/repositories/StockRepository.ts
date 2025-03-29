import { Stock } from '@modules/stock/domain/Stock'
import { IStockType } from '@modules/stock/domain/StockType'
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
    type,
    userId,
  }: Stock): Promise<void> {
    const data = {
      shortName,
      symbol,
      price,
      date,
      quantity,
      type: String(type),
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

  async listByType(userId: string, type: IStockType): Promise<Stock[]> {
    const result = await PrismaSingleton.getInstance().stock.findMany({
      where: { userId, type: type.stockType },
    })

    return StockMappers.getMapper().toDomainArray(result)
  }

  listAllSymbolsByUserIdAndType(
    userId: string,
    type: IStockType,
  ): Promise<string[]> {
    throw new Error('Method not implemented.')
  }
}

export { StockRepository }
