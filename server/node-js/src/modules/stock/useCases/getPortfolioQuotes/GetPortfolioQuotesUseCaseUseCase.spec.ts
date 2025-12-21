import { StockPosition } from '@modules/stock/domain/StockPosition'
import { B3ProviderInMemory } from '@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory'
import { StockPositionRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockPositionRepositoryInMemory'

import { GetPortfolioQuotesUseCase } from './GetPortfolioQuotesUseCase'

let stockPositionRepositoryInMemory: StockPositionRepositoryInMemory
let b3ProviderInMemory: B3ProviderInMemory
let getPortfolioQuotesUseCase: GetPortfolioQuotesUseCase

async function createStockPositions() {
  stockPositionRepositoryInMemory = new StockPositionRepositoryInMemory()

  const position1 = StockPosition.createStockPosition({
    symbol: 'symbol1',
    quantity: 1,
    type: { stockType: 'stock' },
    avgPrice: 7,
    userId: 'userId',
  })

  const position2 = StockPosition.createStockPosition({
    symbol: 'symbol2',
    quantity: 3,
    type: { stockType: 'fii' },
    avgPrice: 7,
    userId: 'userId',
  })

  const position3 = StockPosition.createStockPosition({
    symbol: 'symbol3',
    quantity: 2,
    type: { stockType: 'fii' },
    avgPrice: 7.5, // Média ponderada dos preços 7 e 8
    userId: 'userId',
  })

  const positionsToCreate = [position1, position2, position3]

  for (const position of positionsToCreate) {
    await stockPositionRepositoryInMemory.create(position)
  }

  b3ProviderInMemory.addSymbol(['symbol1', 'symbol2', 'symbol3'])
}

describe('[Stock] - List stock positions and total invested e current value to stock', () => {
  beforeEach(async () => {
    b3ProviderInMemory = new B3ProviderInMemory()

    await createStockPositions()

    getPortfolioQuotesUseCase = new GetPortfolioQuotesUseCase(
      stockPositionRepositoryInMemory,
      b3ProviderInMemory,
    )
  })

  it('should be able to list all stock positions with total invested e current value to stock', async () => {
    const result = await getPortfolioQuotesUseCase.execute({
      userId: 'userId',
      type: { stockType: 'fii' },
    })

    const { portfolio } = result

    expect(portfolio).toBeDefined()
    expect(portfolio.length).toBe(2)

    // symbol2: quantity=3, avgPrice=7, totalInvested=21
    const symbol2Position = portfolio.find((p) => p.stock.symbol === 'symbol2')
    expect(symbol2Position).toBeDefined()
    expect(symbol2Position?.totalInvested).toBe(21)
    expect(symbol2Position?.currentValue).toBe(39) // 3 * 13 (preço do B3ProviderInMemory)
    expect(symbol2Position?.stock.totalStock).toBe(3)

    // symbol3: quantity=2, avgPrice=7.5, totalInvested=15
    const symbol3Position = portfolio.find((p) => p.stock.symbol === 'symbol3')
    expect(symbol3Position).toBeDefined()
    expect(symbol3Position?.totalInvested).toBe(15)
    expect(symbol3Position?.currentValue).toBe(26) // 2 * 13 (preço do B3ProviderInMemory)
    expect(symbol3Position?.stock.totalStock).toBe(2)
  })
})
