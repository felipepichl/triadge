import { IB3DTO } from '../dtos/IB3DTO'
import { IB3Provider } from '../models/IB3Provider'

class B3ProviderInMemory implements IB3Provider {
  stocks: IB3DTO[] = []

  async getQuoteTickers(ticker: string): Promise<IB3DTO> {
    const tickerInMemory = {
      shortName: 'RAAA Name',
      symbol: 'RAAA11',
    }

    this.stocks.push(tickerInMemory)

    return this.stocks.find((item) => item.symbol === ticker)
  }

  async getPortfolioQuotes(tickers: string[]): Promise<IB3DTO[]> {
    return this.stocks.filter((item) => tickers.includes(item.symbol))
  }

  async addSymbol(symbols: string[]): Promise<void> {
    for (const symbol of symbols) {
      this.stocks.push({
        shortName: `shortname to ${symbol}`,
        symbol,
        regularMarketPrice: '13.00',
      })
    }
  }
}

export { B3ProviderInMemory }
