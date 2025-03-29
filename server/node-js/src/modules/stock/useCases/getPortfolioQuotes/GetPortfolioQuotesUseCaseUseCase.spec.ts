import { Stock } from '@modules/stock/domain/Stock'
import { B3ProviderInMemory } from '@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory'
import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'

import { GetPortfolioQuotesUseCase } from './GetPortfolioQuotesUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory
let b3ProviderInMemory: B3ProviderInMemory
let getPortfolioQuotesUseCase: GetPortfolioQuotesUseCase

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
    quantity: 3,
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

  const stock4 = Stock.createStock({
    shortName: 'short name 3',
    symbol: 'symbol3',
    price: 8,
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

  b3ProviderInMemory.addSymbol(['symbol1', 'symbol2', 'symbol3'])
}

describe('[Stock] - List stock and total invested e current value to stock', () => {
  beforeEach(async () => {
    b3ProviderInMemory = new B3ProviderInMemory()

    await createStock()

    getPortfolioQuotesUseCase = new GetPortfolioQuotesUseCase(
      stockRepositoryInMemory,
      b3ProviderInMemory,
    )
  })

  it('should be able to list all stocks with total invested e current value to stock', async () => {
    const result = await getPortfolioQuotesUseCase.execute({
      userId: 'userId',
      type: { stockType: 'fii' },
    })

    const { portifolio } = result

    expect(portifolio).toBeDefined()
    expect(portifolio.length).toBe(2)
    expect(portifolio[0].totalInvested).toBe(21)
    expect(portifolio[0].currentValue).toBe(39)
    expect(portifolio[0].stock.symbol).toBe('symbol2')
    // expect(portifolio[0].stock.type).toStrictEqual({ stockType: 'fii' })
  })
})
