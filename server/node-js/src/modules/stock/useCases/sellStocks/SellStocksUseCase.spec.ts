import { Stock } from '@modules/stock/domain/Stock'
import { StockPosition } from '@modules/stock/domain/StockPosition'
import { StockPositionRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockPositionRepositoryInMemory'
import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { SellStocksUseCase } from './SellStocksUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory

let stockPositionRepositoryInMemory: StockPositionRepositoryInMemory
let sellStockUseCase: SellStocksUseCase

async function createStock() {
  stockRepositoryInMemory = new StockRepositoryInMemory()

  const stock1 = Stock.createStock({
    shortName: 'short name 1',
    symbol: 'symbol1',
    price: 3,
    date: new Date(),
    quantity: 5,
    type: { stockType: 'fii' },
    userId: 'userId',
  })

  const stock2 = Stock.createStock({
    shortName: 'short name 2',
    symbol: 'symbol2',
    price: 3,
    date: new Date(),
    quantity: 5,
    type: { stockType: 'fii' },
    userId: 'userId',
  })

  const stock3 = Stock.createStock({
    shortName: 'short name 1',
    symbol: 'symbol1',
    price: 2,
    date: new Date(),
    quantity: 5,
    type: { stockType: 'fii' },
    userId: 'userId',
  })

  const stocksToCreate = [stock1, stock2, stock3]

  for (const stockData of stocksToCreate) {
    const stock = stockData
    await stockRepositoryInMemory.create(stock)
  }
}

async function createStockPosition() {
  stockPositionRepositoryInMemory = new StockPositionRepositoryInMemory()

  const stockPosition1 = StockPosition.createStockPosition({
    symbol: 'symbol1',
    quantity: 10,
    type: { stockType: 'fii' },
    avgPrice: 3,
    userId: 'userId',
  })

  const stockPosition2 = StockPosition.createStockPosition({
    symbol: 'symbol2',
    quantity: 7,
    type: { stockType: 'fii' },
    avgPrice: 3,
    userId: 'userId',
  })

  const stockPositionsToCreate = [stockPosition1, stockPosition2]

  for (const stockPositionData of stockPositionsToCreate) {
    const stockPosition = stockPositionData
    await stockPositionRepositoryInMemory.create(stockPosition)
  }
}

describe('[StockPosition] - Sell a stock', () => {
  beforeEach(async () => {
    await createStock()
    await createStockPosition()

    sellStockUseCase = new SellStocksUseCase(
      stockRepositoryInMemory,
      stockPositionRepositoryInMemory,
    )
  })

  it('should be able to create a new sell to stock', async () => {
    await sellStockUseCase.execute({
      symbol: 'symbol1',
      price: 11,
      quantity: 9,
      type: { stockType: 'fii' },
      userId: 'userId',
    })

    const stockPosition =
      await stockPositionRepositoryInMemory.findByUserAndSymbol(
        'userId',
        'symbol1',
      )

    expect(stockPosition).toBeDefined()
    expect(stockPosition.quantity).toBe(1)
    expect(stockPosition.symbol).toBe('symbol1')
  })

  it('should not be able to create a new sell stock without position', async () => {
    await expect(
      sellStockUseCase.execute({
        symbol: 'nonexistent',
        price: 10,
        quantity: 7,
        type: { stockType: 'fii' },
        userId: 'userId',
      }),
    ).rejects.toEqual(new AppError('Cannot sell, no stock position found', 404))
  })

  // it('should be able to create a new buy with increase position', async () => {
  //   await buyUseCase.execute({
  //     symbol: 'RAAA11',
  //     price: 10,
  //     quantity: 7,
  //     type: { stockType: 'stock' },
  //     userId: 'userId',
  //   })

  //   await buyUseCase.execute({
  //     symbol: 'RAAA11',
  //     price: 9.9,
  //     quantity: 7,
  //     type: { stockType: 'stock' },
  //     userId: 'userId',
  //   })

  //   const stockCreated = await stockRepositoryInMemory.listAll('userId')
  //   const position = await stockPositionRepositoryInMemory.findByUserAndSymbol(
  //     'userId',
  //     'RAAA11',
  //   )

  //   expect(stockCreated[0]).toBeDefined()
  //   expect(stockCreated.length).toBe(2)
  //   expect(stockCreated[0].symbol).toBe('RAAA11')
  //   expect(position.quantity).toBe(14)
  // })
})
