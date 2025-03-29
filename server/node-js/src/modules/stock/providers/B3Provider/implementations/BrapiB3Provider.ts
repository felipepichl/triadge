import { IB3DTO } from '../dtos/IB3DTO'
import { IB3Provider } from '../models/IB3Provider'
import { brapi } from '../services/brapi'
import { BrapiErrorHandler } from '../utils/BrapiErrorHandler'

class BrapiB3Provider implements IB3Provider {
  async getQuoteTickers(ticket: string): Promise<IB3DTO> {
    try {
      const { data } = await brapi.get(
        `/quote/${ticket}?token=${process.env.BRAPI_TOKEN}`,
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
      // const ticket = tickets.join(',')
      // const { data } = await brapi.get(
      //   `/quote/${ticket}?token=${process.env.BRAPI_TOKEN}`,
      // )
      // return data.results.map((result: any) => ({
      //   shortName: result.shortName,
      //   symbol: result.symbol,
      //   regularMarketPrice: result.regularMarketPrice,
      // }))

      const stocks: IB3DTO[] = []

      for (const ticket of tickets) {
        const { data } = await brapi.get(
          `/quote/${ticket}?token=${process.env.BRAPI_TOKEN}`,
        )

        const { shortName, symbol, regularMarketPrice } = data.results[0]

        if (!shortName) {
          return null
        }

        stocks.push({
          shortName,
          symbol,
          regularMarketPrice,
        })
      }

      return stocks
    } catch (error) {
      BrapiErrorHandler.handle(error)
    }
  }
}

export { BrapiB3Provider }
