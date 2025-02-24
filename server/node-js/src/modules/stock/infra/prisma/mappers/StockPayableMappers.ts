import { Stock } from '@modules/stock/domain/Stock'
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
    userId,
  }: RawStock): Stock {
    return Stock.createStock({
      id,
      shortName,
      symbol,
      price: Number(price),
      date,
      quantity,
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
