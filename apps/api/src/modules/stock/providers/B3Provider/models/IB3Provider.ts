import { IB3DTO } from '../dtos/IB3DTO'

interface IB3Provider {
  getQuoteTickers(ticket: string): Promise<IB3DTO>
  getPortfolioQuotes(tickets: string[]): Promise<IB3DTO[]>
}

export { IB3Provider }
