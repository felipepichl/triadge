import { IStockType } from '@modules/stock/domain/StockType'
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { fetchStockQuotes } from '@modules/stock/utils/fetch-stock-quotes'
import { groupedStocksUtils } from '@modules/stock/utils/grouped-stocks-utils'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  userId: string
  type: IStockType
}

interface IResponse {
  totalInvested: number
  currentValue: number
}

class GetTotalInvestedAndCurrentQuoteUseCase
  implements IUseCase<IRequest, IResponse>
{
  constructor(
    private stocksRpository: IStockRepository,
    private b3Provider: IB3Provider,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const stocks = await this.stocksRpository.listByType(userId, type)

    if (!stocks) {
      throw new AppError('User stock not found', 404)
    }

    const groupedStocks = groupedStocksUtils(stocks)

    const symbols = Object.keys(groupedStocks)

    const quotes = await fetchStockQuotes(symbols, this.b3Provider)

    const { totalInvested, currentValue } = symbols.reduce(
      (acc, symbol) => {
        const stockData = groupedStocks[symbol]
        const quote = quotes.find((item) => item.symbol === symbol)

        acc.totalInvested += stockData.totalInvested
        acc.currentValue += stockData.totalStock * (quote?.price ?? 0)

        return acc
      },
      { totalInvested: 0, currentValue: 0 },
    )

    return {
      totalInvested,
      currentValue,
    }
  }
}

export { GetTotalInvestedAndCurrentQuoteUseCase }
