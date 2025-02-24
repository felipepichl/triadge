import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'

import { CreateStocksUseCase } from './CreateStocksUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory
let createStocksUseCase: CreateStocksUseCase

describe('[Stock] - Create a stock', () => {
  beforeEach(() => {
    stockRepositoryInMemory = new StockRepositoryInMemory()

    createStocksUseCase = new CreateStocksUseCase(stockRepositoryInMemory)
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
  })
})
