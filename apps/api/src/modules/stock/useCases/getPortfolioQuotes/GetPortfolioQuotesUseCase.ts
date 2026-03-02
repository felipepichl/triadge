import { IStockType } from '@modules/stock/domain/StockType'
import { IB3Provider } from '@modules/stock/providers/B3Provider/models/IB3Provider'
import { IStockPositionRepository } from '@modules/stock/repositories/IStockPositionRepository'
import { fetchStockQuotes } from '@modules/stock/utils/fetch-stock-quotes'
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
    @inject('StockPositionRepository')
    private stockPositionRepository: IStockPositionRepository,
    @inject('BrapiB3Provider')
    private b3Provider: IB3Provider,
  ) {}

  async execute({ userId, type }: IRequest): Promise<IResponse> {
    const stockPositions = await this.stockPositionRepository.listByType(
      userId,
      type,
    )

    if (!stockPositions || stockPositions.length === 0) {
      throw new AppError('User stock positions not found', 404)
    }

    const symbols = stockPositions.map((position) => position.symbol)
    const quotes = await fetchStockQuotes(symbols, this.b3Provider)

    const portfolio = stockPositions.map((position) => {
      const quote = quotes.find((item) => item.symbol === position.symbol)

      return {
        stock: {
          shortName: quote?.shortName ?? position.symbol,
          symbol: position.symbol,
          totalStock: position.quantity,
        },
        totalInvested: position.quantity * position.avgPrice,
        currentValue: position.quantity * (quote?.price ?? 0),
        quote: quote?.price ?? 0,
        minPrice: position.avgPrice, // Usar avgPrice como min/max por enquanto
        maxPrice: position.avgPrice,
      }
    })

    return {
      portfolio,
    }
  }
}

export { GetPortfolioQuotesUseCase }
