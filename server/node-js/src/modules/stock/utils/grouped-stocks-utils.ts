import { Stock } from '../domain/Stock'

export function groupedStocksUtils(stocks: Stock[]) {
  return stocks.reduce<
    Record<
      string,
      {
        shortName: string
        totalStock: number
        totalInvested: number
        minPrice: number
        maxPrice: number
      }
    >
  >((acc, stock) => {
    if (!acc[stock.symbol]) {
      acc[stock.symbol] = {
        shortName: stock.shortName,
        totalStock: 0,
        totalInvested: 0,
        minPrice: stock.price,
        maxPrice: stock.price,
      }
    }

    // acc[stock.symbol].totalStock += stock.quantity ?? 0
    // acc[stock.symbol].totalInvested += (stock.quantity ?? 0) * stock.price

    const group = acc[stock.symbol]

    group.totalStock += stock.quantity ?? 0
    group.totalInvested += (stock.quantity ?? 0) * stock.price
    group.minPrice = Math.min(group.minPrice, stock.price)
    group.maxPrice = Math.max(group.maxPrice, stock.price)

    return acc
  }, {})
}
