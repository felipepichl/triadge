import { IB3DTO } from '../dtos/IB3DTO'
import { IB3Provider } from '../models/IB3Provider'
import { brapi } from '../services/brapi'
import { BrapiErrorHandler } from '../utils/BrapiErrorHandler'

class BrapiB3Provider implements IB3Provider {
  async getQuoteTickers(ticket: string): Promise<IB3DTO> {
    try {
      const { data } = await brapi.get(
        `/quote/${ticket}`,
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

  async getPortfolioQuotes(tickets: string[]): Promise<IB3DTO[]> {
    try {
      const results = await Promise.all(
        tickets.map((ticket) => this.getQuoteTickers(ticket)),
      )

      return results.filter((stock): stock is IB3DTO => stock !== null)
    } catch (error) {
      BrapiErrorHandler.handle(error)
    }
  }
}

export { BrapiB3Provider }
