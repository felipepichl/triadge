import { TransactionsRepositoryInMemory } from '@modules/transactions/repositories/in-memory/TransactionsRepositoryInMemory'
import { CreateTransactionUseCase } from './CreateTransactionUseCase'
import { Transaction } from '@modules/transactions/domain/Transaction'

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
    const transaction = Transaction.createTransaction({
      description: 'Transaction Test',
      type: 'income',
      value: 1000,
    })

    await createTransactionUseCase.execute(transaction)

    const { id } = transaction

    const transactionCreated = await transactionsRepositoryInMemory.findById(
      id.toString(),
    )

    expect(transactionCreated).toBeDefined()
    expect(transaction?.description).toEqual(transaction.description)
  })
})
