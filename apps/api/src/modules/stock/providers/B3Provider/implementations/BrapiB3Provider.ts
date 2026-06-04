import { IB3DTO } from '../dtos/IB3DTO'
import { IB3Provider } from '../models/IB3Provider'
import { brapi } from '../services/brapi'
import { BrapiErrorHandler } from '../utils/BrapiErrorHandler'

class BrapiB3Provider implements IB3Provider {
  async getQuoteTickers(ticker: string): Promise<IB3DTO> {
    try {
      const { data } = await brapi.get(
        `/quote/${ticker}`,
      )

      const { shortName, symbol, regularMarketPrice } = data.results[0]

      if (!shortName) {
        return null
      }

      return {
        shortName,
        symbol,
        regularMarketPrice,
      }
    } catch (error) {
      BrapiErrorHandler.handle(error)
    }
  }

  async getPortfolioQuotes(tickers: string[]): Promise<IB3DTO[]> {
    try {
      const results = await Promise.all(
        tickers.map((ticker) => this.getQuoteTickers(ticker)),
      )

      return results.filter((stock): stock is IB3DTO => stock !== null)
    } catch (error) {
      BrapiErrorHandler.handle(error)
    }
  }
}

export { BrapiB3Provider }
