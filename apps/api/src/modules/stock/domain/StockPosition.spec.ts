import { StockPosition } from './StockPosition'

describe('[StockPosition] - Create a new Stock Position', () => {
  it('should be able to create a new instance of stock position', () => {
    const stockPosition = StockPosition.createStockPosition({
      symbol: 'symbol',
      quantity: 1,
      type: { stockType: 'stock' },
      avgPrice: 1,
      userId: 'userId',
    })

    expect(stockPosition instanceof StockPosition).toBe(true)
    expect(stockPosition).toBeTruthy()
  })
})
