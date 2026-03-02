import { Stock } from '@modules/stock/domain/Stock'
import { B3ProviderInMemory } from '@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory'
import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'

import { GetTotalInvestedAndCurrentQuoteUseCase } from './GetTotalInvestedAndCurrentQuoteUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory
let b3ProviderInMemory: B3ProviderInMemory
let getTotalInvestedAndCurrentQuoteUseCase: GetTotalInvestedAndCurrentQuoteUseCase

async function buyStocks(currentPrices?: Record<string, number>) {
  stockRepositoryInMemory = new StockRepositoryInMemory()

  const stock1 = Stock.createStock({
    shortName: 'short name 1',
    symbol: 'symbol1',
    price: 7,
    date: new Date(),
    quantity: 1,
    type: { stockType: 'stock' },
    operation: { stockOperationType: 'buy' },
    userId: 'userId',
  })

  const stock2 = Stock.createStock({
    shortName: 'short name 2',
    symbol: 'symbol2',
    price: 7,
    date: new Date(),
    quantity: 3,
    type: { stockType: 'fii' },
    operation: { stockOperationType: 'buy' },
    userId: 'userId',
  })

  const stock3 = Stock.createStock({
    shortName: 'short name 3',
    symbol: 'symbol3',
    price: 7,
    date: new Date(),
    quantity: 1,
    type: { stockType: 'fii' },
    operation: { stockOperationType: 'buy' },
    userId: 'userId',
  })

  const stock4 = Stock.createStock({
    shortName: 'short name 3',
    symbol: 'symbol3',
    price: 8,
    date: new Date(),
    quantity: 1,
    type: { stockType: 'fii' },
    operation: { stockOperationType: 'buy' },
    userId: 'userId',
  })

  const stock5 = Stock.createStock({
    shortName: 'short name 3',
    symbol: 'symbol3',
    price: 8,
    date: new Date(),
    quantity: 1,
    type: { stockType: 'fii' },
    operation: { stockOperationType: 'sell' },
    userId: 'userId',
  })

  const stocksToCreate = [stock1, stock2, stock3, stock4, stock5]

  for (const stockData of stocksToCreate) {
    const stock = stockData
    await stockRepositoryInMemory.create(stock)
  }

  // Add symbols with custom prices if provided
  if (currentPrices) {
    for (const [symbol, price] of Object.entries(currentPrices)) {
      b3ProviderInMemory.stocks.push({
        shortName: `shortname to ${symbol}`,
        symbol,
        regularMarketPrice: price.toString(),
      })
    }
  } else {
    b3ProviderInMemory.addSymbol(['symbol1', 'symbol2', 'symbol3'])
  }
}

describe('[Stock] - List total invested e current value to wallet', () => {
  beforeEach(async () => {
    b3ProviderInMemory = new B3ProviderInMemory()

    await buyStocks()

    getTotalInvestedAndCurrentQuoteUseCase =
      new GetTotalInvestedAndCurrentQuoteUseCase(
        stockRepositoryInMemory,
        b3ProviderInMemory,
      )
  })

  it('should be able to list total invested e current value to wallet', async () => {
    const result = await getTotalInvestedAndCurrentQuoteUseCase.execute({
      userId: 'userId',
      type: { stockType: 'fii' },
    })

    const { currentValue, totalInvested, position } = result

    expect(totalInvested).toBe(36)
    expect(currentValue).toBe(65)
    expect(position).toBe(29) // currentValue - totalInvested = 65 - 36 = 29
  })

  it('should calculate position with profit when current prices are higher than purchase prices', async () => {
    // Setup stocks with higher current prices for profit scenario
    stockRepositoryInMemory = new StockRepositoryInMemory()
    b3ProviderInMemory = new B3ProviderInMemory()

    await buyStocks({
      symbol2: 15, // Higher than purchase price of 7
      symbol3: 12, // Higher than average purchase price of 7.67
    })

    getTotalInvestedAndCurrentQuoteUseCase =
      new GetTotalInvestedAndCurrentQuoteUseCase(
        stockRepositoryInMemory,
        b3ProviderInMemory,
      )

    const result = await getTotalInvestedAndCurrentQuoteUseCase.execute({
      userId: 'userId',
      type: { stockType: 'fii' },
    })

    const { currentValue, totalInvested, position } = result

    expect(totalInvested).toBe(36) // 3 * 7 + 2 * 7.5 (symbol2: 21, symbol3: 15)
    expect(currentValue).toBe(69) // 3 * 15 + 2 * 12 = 45 + 24 = 69
    expect(position).toBe(33) // currentValue - totalInvested = 69 - 36 = 33 (profit)
  })

  it('should calculate position with loss when current prices are lower than purchase prices', async () => {
    // Setup stocks with lower current prices for loss scenario
    stockRepositoryInMemory = new StockRepositoryInMemory()
    b3ProviderInMemory = new B3ProviderInMemory()

    await buyStocks({
      symbol2: 5, // Lower than purchase price of 7
      symbol3: 6, // Lower than average purchase price of 7.67
    })

    getTotalInvestedAndCurrentQuoteUseCase =
      new GetTotalInvestedAndCurrentQuoteUseCase(
        stockRepositoryInMemory,
        b3ProviderInMemory,
      )

    const result = await getTotalInvestedAndCurrentQuoteUseCase.execute({
      userId: 'userId',
      type: { stockType: 'fii' },
    })

    const { currentValue, totalInvested, position } = result

    expect(totalInvested).toBe(36) // 3 * 7 + 2 * 7.5 (symbol2: 21, symbol3: 15)
    expect(currentValue).toBe(27) // 3 * 5 + 2 * 6 = 15 + 12 = 27
    expect(position).toBe(-9) // currentValue - totalInvested = 27 - 36 = -9 (loss)
  })
})
