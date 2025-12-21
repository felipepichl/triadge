import { AppError } from '@shared/error/AppError'

import { IB3Provider } from '../providers/B3Provider/models/IB3Provider'

export async function fetchStockQuotes(
  symbols: string[],
  b3Provider: IB3Provider,
): Promise<{ symbol: string; price: number }[]> {
  return await Promise.all(
    symbols.map(async (symbol) => {
      const quote = await b3Provider.getQuoteTickers(symbol)

      if (!quote) {
        throw new AppError(`Stock ${symbol} not found on BrAPI`, 404)
      }

      return {
        symbol,
        price: Number(quote.regularMarketPrice),
      }
    }),
  )
}
