import { StockPosition } from '../domain/StockPosition'

class StockPositionServices {
  static increasePosition(
    stockPosition: StockPosition,
    quantity: number,
    price: number,
  ): StockPosition {
    const totalInvested = stockPosition.quantity * stockPosition.avgPrice
    const newTotal = totalInvested + quantity * price
    const newQuantity = stockPosition.quantity + quantity
    const newAvgPrice = newTotal / newQuantity

    return StockPosition.createStockPosition({
      symbol: stockPosition.symbol,
      quantity: newQuantity,
      type: stockPosition.type,
      avgPrice: newAvgPrice,
      userId: stockPosition.userId,
    })
  }
}

export { StockPositionServices }
