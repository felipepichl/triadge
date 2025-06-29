import { IStockType } from '@modules/stock/domain/StockType'
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { fetchStockQuotes } from '@modules/stock/utils/fetch-stock-quotes'
import { groupedStocksUtils } from '@modules/stock/utils/grouped-stocks-utils'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  userId: string
  type: IStockType
}

interface IResponse {
  portfolio: {
    stock: {
      shortName: string
      symbol: string
      totalStock: number
    }
    totalInvested: number
    currentValue: number
    quote: number
    minPrice: number
    maxPrice: number
  }[]
}

@injectable()
class GetPortfolioQuotesUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    @inject('StockRepository')
    private stocksRepository: IStockRepository,
    @inject('BrapiB3Provider')
    private b3Provider: IB3Provider,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const stocks = await this.stocksRepository.listByType(userId, type)

    if (!stocks) {
      throw new AppError('User stock not found', 404)
    }

    const groupedStocks = groupedStocksUtils(stocks)

    const symbols = Object.keys(groupedStocks)
    const quotes = await fetchStockQuotes(symbols, this.b3Provider)

    const portfolio = symbols.map((symbol) => {
      const stockData = groupedStocks[symbol]
      const quote = quotes.find((item) => item.symbol === symbol)

      return {
        stock: {
          shortName: stockData.shortName,
          symbol,
          totalStock: stockData.totalStock,
        },
        totalInvested: stockData.totalInvested,
        currentValue: stockData.totalStock * (quote?.price ?? 0),
        quote: quote.price,
        minPrice: stockData.minPrice,
        maxPrice: stockData.maxPrice,
      }
    })

    return {
      portfolio,
    }
  }
}

export { GetPortfolioQuotesUseCase }
