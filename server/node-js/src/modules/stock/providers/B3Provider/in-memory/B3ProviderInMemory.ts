import { IB3DTO } from '../dtos/IB3DTO'
import { IB3Provider } from '../models/IB3Provider'

class B3ProviderInMemory implements IB3Provider {
  tickets: IB3DTO[] = []

  async getQuoteTickers(ticket: string): Promise<IB3DTO> {
    const ticketInMemory = {
      shortName: 'RAAA Name',
      symbol: 'RAAA11',
    }

    this.tickets.push(ticketInMemory)

    return this.tickets.find((item) => item.symbol === ticket)
  }
}

export { B3ProviderInMemory }
