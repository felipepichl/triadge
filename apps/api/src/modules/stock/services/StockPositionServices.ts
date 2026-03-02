import { AppError } from '@shared/error/AppError'

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
      id: stockPosition.id,
      symbol: stockPosition.symbol,
      quantity: newQuantity,
      type: stockPosition.type,
      avgPrice: newAvgPrice,
      userId: stockPosition.userId,
    })
  }

  static decreasePosition(
    stockPosition: StockPosition,
    quantity: number,
  ): StockPosition {
    if (quantity > stockPosition.quantity) {
      throw new AppError('Cannot sell more then current position')
    }

    return StockPosition.createStockPosition({
      id: stockPosition.id,
      symbol: stockPosition.symbol,
      quantity: stockPosition.quantity - quantity,
      type: stockPosition.type,
      avgPrice: stockPosition.avgPrice,
      userId: stockPosition.userId,
    })
  }
}

export { StockPositionServices }
