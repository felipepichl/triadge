import { IB3DTO } from '../dtos/IB3DTO'

interface IB3Provider {
  getQuoteTickers(ticker: string): Promise<IB3DTO>
  getPortfolioQuotes(tickers: string[]): Promise<IB3DTO[]>
}

export { IB3Provider }
