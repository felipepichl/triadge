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
    const ticketString = tickets.join(',')

    return this.stocks.filter((item) => item.symbol === ticketString)
  }
}

export { B3ProviderInMemory }
