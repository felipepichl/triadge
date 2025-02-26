import { B3ProviderInMemory } from '@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory'
import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'

import { CreateStocksUseCase } from './CreateStocksUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory
let b3ProviderInMemory: B3ProviderInMemory
let createStocksUseCase: CreateStocksUseCase

describe('[Stock] - Create a stock', () => {
  beforeEach(() => {
    stockRepositoryInMemory = new StockRepositoryInMemory()
    b3ProviderInMemory = new B3ProviderInMemory()

    createStocksUseCase = new CreateStocksUseCase(
      stockRepositoryInMemory,
      b3ProviderInMemory,
    )
  })

  it('should be able to create a new stock', async () => {
    await createStocksUseCase.execute({
      symbol: 'RAAA11',
      price: 10,
      quantity: 7,
      userId: 'userId',
    })

    const stockCreated = await stockRepositoryInMemory.listAll('userId')

    expect(stockCreated[0]).toBeDefined()
    expect(stockCreated.length).toBe(1)
    expect(stockCreated[0].price).toBe(10)
    expect(stockCreated[0].symbol).toBe('RAAA11')
  })
})
