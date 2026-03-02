import { Stock } from '@modules/stock/domain/Stock'
import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'

import { ListFIIPurchasesByMonthUseCase } from './ListFIIPurchasesByMonthUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory
let useCase: ListFIIPurchasesByMonthUseCase

async function createStock() {
  stockRepositoryInMemory = new StockRepositoryInMemory()

  const stock1 = Stock.createStock({
    shortName: 'short name 1',
    symbol: 'symbol 1',
    price: 7,
    date: new Date('2024-08-01'),
    quantity: 1,
    type: { stockType: 'stock' },
    userId: 'userId',
  })
  const stock2 = Stock.createStock({
    shortName: 'short name 2',
    symbol: 'symbol 2',
    price: 7,
    date: new Date('2024-08-01'),
    quantity: 1,
    type: { stockType: 'fii' },
    userId: 'userId',
  })
  const stock3 = Stock.createStock({
    shortName: 'short name 3',
    symbol: 'symbol 3',
    price: 7,
    date: new Date('2024-08-03'),
    quantity: 1,
    type: { stockType: 'fii' },
    userId: 'userId',
  })
  const stock4 = Stock.createStock({
    shortName: 'short name 4',
    symbol: 'symbol 4',
    price: 7,
    date: new Date(),
    quantity: 1,
    type: { stockType: 'fii' },
    userId: 'userId',
  })

  const stocksToCreate = [stock1, stock2, stock3, stock4]

  for (const stockData of stocksToCreate) {
    const stock = stockData
    await stockRepositoryInMemory.create(stock)
  }
}

describe('[Stock] - List all fii purchases by month', () => {
  beforeEach(async () => {
    await createStock()

    useCase = new ListFIIPurchasesByMonthUseCase(stockRepositoryInMemory)
  })

  it('should be able to list all fii purchases by month', async () => {
    const result = await useCase.execute({
      userId: 'userId',
      month: 8,
    })

    const { stocks } = result

    expect(stocks[0]).toBeDefined()
    expect(stocks.length).toBe(2)
    expect(stocks[0].type).toStrictEqual({ stockType: 'fii' })
    expect(stocks[0].symbol).toBe('symbol 2')
  })
})
