import { B3ProviderInMemory } from '@modules/stock/providers/B3Provider/in-memory/B3ProviderInMemory'
import { StockPositionRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockPositionRepositoryInMemory'
import { StockRepositoryInMemory } from '@modules/stock/repositories/in-memory/StockRepositoryInMemory'
import { AppError } from '@shared/error/AppError'

import { BuyUseCase } from './BuyUseCase'

let stockRepositoryInMemory: StockRepositoryInMemory
let b3ProviderInMemory: B3ProviderInMemory
let stockPositionRepositoryInMemory: StockPositionRepositoryInMemory
let buyUseCase: BuyUseCase

describe('[StockPosition] - Buy a stock', () => {
  beforeEach(() => {
    stockRepositoryInMemory = new StockRepositoryInMemory()
    b3ProviderInMemory = new B3ProviderInMemory()
    stockPositionRepositoryInMemory = new StockPositionRepositoryInMemory()

    buyUseCase = new BuyUseCase(
      stockRepositoryInMemory,
      b3ProviderInMemory,
      stockPositionRepositoryInMemory,
    )
  })

  it('should be able to create a new buy', async () => {
    await buyUseCase.execute({
      symbol: 'RAAA11',
      price: 10,
      quantity: 7,
      type: { stockType: 'stock' },
      userId: 'userId',
    })

    const stockCreated = await stockRepositoryInMemory.listAll('userId')

    expect(stockCreated[0]).toBeDefined()
    expect(stockCreated.length).toBe(1)
    expect(stockCreated[0].price).toBe(10)
    expect(stockCreated[0].symbol).toBe('RAAA11')
  })

  it('should be able to create a new buy with increase position', async () => {
    await buyUseCase.execute({
      symbol: 'RAAA11',
      price: 10,
      quantity: 7,
      type: { stockType: 'stock' },
      userId: 'userId',
    })

    await buyUseCase.execute({
      symbol: 'RAAA11',
      price: 9.9,
      quantity: 7,
      type: { stockType: 'stock' },
      userId: 'userId',
    })

    const stockCreated = await stockRepositoryInMemory.listAll('userId')
    const position = await stockPositionRepositoryInMemory.findByUserAndSymbol(
      'userId',
      'RAAA11',
    )

    expect(stockCreated[0]).toBeDefined()
    expect(stockCreated.length).toBe(2)
    expect(stockCreated[0].symbol).toBe('RAAA11')
    expect(position.quantity).toBe(14)
  })

  it('should not be able to create a new stock with nonexistent ticket', async () => {
    await expect(
      buyUseCase.execute({
        symbol: 'nonexistent',
        price: 10,
        quantity: 7,
        type: { stockType: 'fii' },
        userId: 'userId',
      }),
    ).rejects.toEqual(new AppError('Ticket does not exists', 404))
  })
})
