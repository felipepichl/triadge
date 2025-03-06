import { Stock } from '@modules/stock/domain/Stock'
import { IStockType } from '@modules/stock/domain/StockType'
import { Stock as RawStock } from '@prisma/client'
import { IMapper } from '@shared/core/infra/Mapper'

class StockMappers implements IMapper<Stock, RawStock> {
  toPersistence(stock: Stock): Stock {
    return stock
  }

  toDomain({
    id,
    shortName,
    symbol,
    price,
    date,
    quantity,
    type,
    userId,
  }: RawStock): Stock {
    return Stock.createStock({
      id,
      shortName,
      symbol,
      price: Number(price),
      date,
      quantity,
      type: { type } as IStockType,
      userId,
    })
  }

  toDomainArray(rawStock: RawStock[]): Stock[] {
    return rawStock.map(this.toDomain)
  }

  getMapper(): IMapper<Stock, RawStock> {
    return StockMappers.getMapper()
  }

  static getMapper(): StockMappers {
    return new StockMappers()
  }
}

export { StockMappers }
