import { IStockType } from '@modules/stock/domain/StockType'
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider'
import { IStockRepository } from '@modules/stock/repositories/IStockRepository'
import { IUseCase } from '@shared/core/domain/IUseCase'
import { AppError } from '@shared/error/AppError'

interface IRequest {
  userId: string
  type: IStockType
}

interface IResponse {
  portifolio: {
    stock: {
      shortName: string
      symbol: string
      totalStock: number
    }
    totalInvested: number
    currentValue: number
  }[]
}

class GetPortfolioQuotesUseCase implements IUseCase<IRequest, IResponse> {
  constructor(
    private stocksRepository: IStockRepository,
    private b3Provider: IB3Provider,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const stocks = await this.stocksRepository.listByType(userId, type)

    if (!stocks) {
      throw new AppError('User stock not found', 404)
    }

    const groupedStocks = stocks.reduce<
      Record<
        string,
        { totalStock: number; totalInvested: number; shortName: string }
      >
    >((acc, stock) => {
      if (!acc[stock.symbol]) {
        acc[stock.symbol] = {
          totalStock: 0,
          totalInvested: 0,
          shortName: stock.shortName,
        }
      }

      acc[stock.symbol].totalStock += stock.quantity ?? 0
      acc[stock.symbol].totalInvested += (stock.quantity ?? 0) * stock.price

      return acc
    }, {})

    const symbols = Object.keys(groupedStocks)
    const quotes = await Promise.all(
      symbols.map(async (symbol) => {
        const quote = await this.b3Provider.getQuoteTickers(symbol)

        if (!quote) {
          throw new AppError(`Stock ${symbol} not found on BrAPI`, 404)
        }

        return {
          symbol,
          price: Number(quote.regularMarketPrice),
        }
      }),
    )

    const portifolio = symbols.map((symbol) => {
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
      }
    })

    return {
      portifolio,
    }
  }
}

export { GetPortfolioQuotesUseCase }
