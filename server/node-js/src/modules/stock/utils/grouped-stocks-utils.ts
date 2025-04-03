import { Stock } from '../domain/Stock'

export function groupedStocksUtils(stocks: Stock[]) {
  return stocks.reduce<
    Record<
      string,
      { totalStock: number; totalInvested: number; shortName: string }
    >
  >((acc, stock) => {
    if (!acc[stock.symbol]) {
      acc[stock.symbol] = {
        totalStock: 0,
        totalInvested: 0,
        shortName: stock.shortName,
      }
    }

    acc[stock.symbol].totalStock += stock.quantity ?? 0
    acc[stock.symbol].totalInvested += (stock.quantity ?? 0) * stock.price

    return acc
  }, {})
}
