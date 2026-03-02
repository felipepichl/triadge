import { IB3DTO } from '../dtos/IB3DTO'
import { IB3Provider } from '../models/IB3Provider'

class B3ProviderInMemory implements IB3Provider {
  stocks: IB3DTO[] = []

  async getQuoteTickers(ticket: string): Promise<IB3DTO> {
    const ticketInMemory = {
      shortName: 'RAAA Name',
      symbol: 'RAAA11',
    }

    this.stocks.push(ticketInMemory)

    return this.stocks.find((item) => item.symbol === ticket)
  }

  async getPortfolioQuotes(tickets: string[]): Promise<IB3DTO[]> {
    return this.stocks.filter((item) => tickets.includes(item.symbol))
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
