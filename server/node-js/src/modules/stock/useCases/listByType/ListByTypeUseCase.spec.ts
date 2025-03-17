import { Stock } from '@modules/stock/domain/Stock'
import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'

import { ListByTypeUseCase } from './ListByTypeUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory
let listByTypeUseCase: ListByTypeUseCase

async function createStock() {
  stockRepositoryInMemory = new StockRepositoryInMemory()

  const stock1 = Stock.createStock({
    shortName: 'short name 1',
    symbol: 'symbol 1',
    price: 7,
    date: new Date(),
    quantity: 1,
    type: { type: 'stock' },
    userId: 'userId',
  })

  const stock2 = Stock.createStock({
    shortName: 'short name 2',
    symbol: 'symbol 2',
    price: 7,
    date: new Date(),
    quantity: 1,
    type: { type: 'fii' },
    userId: 'userId',
  })

  const stocksToCreate = [stock1, stock2]

  for (const stockData of stocksToCreate) {
    const stock = stockData
    await stockRepositoryInMemory.create(stock)
  }
}

describe('[Stock] - List by type', () => {
  beforeEach(async () => {
    await createStock()

    listByTypeUseCase = new ListByTypeUseCase(stockRepositoryInMemory)
  })

  it('should be able to list all stocks by type', async () => {
    const result = await listByTypeUseCase.execute({
      userId: 'userId',
      type: { type: 'fii' },
    })

    const { stocks } = result

    expect(stocks[0]).toBeDefined()
    expect(stocks.length).toBe(1)
    expect(stocks[0].price).toBe(7)
    expect(stocks[0].symbol).toBe('symbol 2')
  })
})
