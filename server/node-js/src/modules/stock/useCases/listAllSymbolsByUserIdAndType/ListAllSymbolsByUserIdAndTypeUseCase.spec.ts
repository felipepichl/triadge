import { Stock } from '@modules/stock/domain/Stock'
import { B3ProviderInMemory } from '@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory'
import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'

import { ListAllSymbolsByUserIdAndTypeUseCase } from './ListAllSymbolsByUserIdAndTypeUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory
let b3ProviderInMemory: B3ProviderInMemory
let listAllSymbolsByUserIdAndTypeUseCase: ListAllSymbolsByUserIdAndTypeUseCase

async function createStock() {
  stockRepositoryInMemory = new StockRepositoryInMemory()

  const stock1 = Stock.createStock({
    shortName: 'short name 1',
    symbol: 'symbol1',
    price: 7,
    date: new Date(),
    quantity: 1,
    type: { stockType: 'stock' },
    userId: 'userId',
  })

  const stock2 = Stock.createStock({
    shortName: 'short name 2',
    symbol: 'symbol2',
    price: 7,
    date: new Date(),
    quantity: 1,
    type: { stockType: 'fii' },
    userId: 'userId',
  })

  const stock3 = Stock.createStock({
    shortName: 'short name 3',
    symbol: 'symbol3',
    price: 7,
    date: new Date(),
    quantity: 1,
    type: { stockType: 'fii' },
    userId: 'userId',
  })

  const stocksToCreate = [stock1, stock2, stock3]

  for (const stockData of stocksToCreate) {
    const stock = stockData
    await stockRepositoryInMemory.create(stock)
  }

  b3ProviderInMemory.addSymbol(['symbol1', 'symbol2', 'symbol3'])
}

describe('[Stock] - List symbols by type', () => {
  beforeEach(async () => {
    b3ProviderInMemory = new B3ProviderInMemory()

    await createStock()

    listAllSymbolsByUserIdAndTypeUseCase =
      new ListAllSymbolsByUserIdAndTypeUseCase(
        stockRepositoryInMemory,
        b3ProviderInMemory,
      )
  })

  it('should be able to list all stocks symbols by type', async () => {
    const result = await listAllSymbolsByUserIdAndTypeUseCase.execute({
      userId: 'userId',
      type: { stockType: 'fii' },
    })

    const { stocks } = result

    expect(stocks).toBeDefined()
    expect(stocks.length).toBe(2)
    expect(stocks[0].price).toBe(13)
    expect(stocks[0].symbol).toBe('symbol2')
    expect(stocks[0].type).toStrictEqual({ stockType: 'fii' })
  })
})
