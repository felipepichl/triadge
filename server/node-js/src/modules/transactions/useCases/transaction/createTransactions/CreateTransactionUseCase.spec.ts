import { TransactionsRepositoryInMemory } from '@modules/transactions/repositories/transaction/in-memory/TransactionsRepositoryInMemory'

import { CreateTransactionUseCase } from './CreateTransactionUseCase'

let transactionsRepositoryInMemory: TransactionsRepositoryInMemory
let createTransactionUseCase: CreateTransactionUseCase

describe('[Transaction] - Create a transaction', () => {
  beforeEach(() => {
    transactionsRepositoryInMemory = new TransactionsRepositoryInMemory()

    createTransactionUseCase = new CreateTransactionUseCase(
      transactionsRepositoryInMemory,
    )
  })

  it('should be able to create a new transaction', async () => {
    await createTransactionUseCase.execute({
      description: 'Transaction Test',
      type: 'income',
      value: 1000,
      userId: 'userId',
      transactionCategoryId: 'transactionCategoryId',
    })

    const transactionCreated = await transactionsRepositoryInMemory.listAll()

    expect(transactionCreated[0]).toBeDefined()
    expect(transactionCreated[0].description).toEqual('Transaction Test')
  })
})
