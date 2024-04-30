import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { TransactionCategoriesRepositoryInMemory } from '@modules/transactions/repositories/category/in-memory/TransactionCategoriesRepositoryInMemory'
import { TransactionsRepositoryInMemory } from '@modules/transactions/repositories/transaction/in-memory/TransactionsRepositoryInMemory'

import { ListAllTransactionUseCase } from './ListAllTransactionUseCase'

let transactionsRepositoryInMemory: TransactionsRepositoryInMemory
let listAllTransactionUseCase: ListAllTransactionUseCase

async function createUser(): Promise<string> {
  const user = User.createUser({
    name: 'Jonh Due',
    email: 'johndue@example.com',
    password: 'hash123',
    phoneNumber: '51999999999',
  })

  const usersRepositoryInMemory = new UsersRepositoryInMemory()

  await usersRepositoryInMemory.create(user)

  const userId = (await usersRepositoryInMemory.listAll())[0].id

  return userId.toString()
}

async function createTransactionCategory(): Promise<string> {
  const transactionCategory = TransactionCategory.createTransactionCategory({
    description: 'Transaction category description',
  })

  const transactionCategoryInMemory =
    new TransactionCategoriesRepositoryInMemory()

  await transactionCategoryInMemory.create(transactionCategory)

  const transactionCategoryId = (await transactionCategoryInMemory.listAll())[0]
    .id

  return transactionCategoryId.toString()
}

async function createTransaction(): Promise<string> {
  const userId = await createUser()
  const transactionCategoryId = await createTransactionCategory()

  const transaction1 = Transaction.createTransaction({
    description: 'Transaction description',
    type: 'income',
    value: 1000,
    userId,
    transactionCategoryId,
  })

  const transaction2 = Transaction.createTransaction({
    description: 'Transaction description',
    type: 'outcome',
    value: 500,
    userId,
    transactionCategoryId,
  })

  const transactionsToCreate = [transaction1, transaction2]

  for (const transactionData of transactionsToCreate) {
    const transaction = transactionData
    await transactionsRepositoryInMemory.create(transaction)
  }

  return userId
}

describe('[Transaction] - List all transacition with balance', () => {
  let userId: string

  beforeEach(async () => {
    transactionsRepositoryInMemory = new TransactionsRepositoryInMemory()

    listAllTransactionUseCase = new ListAllTransactionUseCase(
      transactionsRepositoryInMemory,
    )

    userId = await createTransaction()
  })

  it('should be able to list all transacitions with balance', async () => {
    const result = await listAllTransactionUseCase.execute({ userId })

    expect(result.transactions).toHaveLength(2)
    expect(result.transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'income',
        }),
        expect.objectContaining({
          type: 'outcome',
        }),
      ]),
    )
  })

  it('should return an empty array if no transaction exist', async () => {
    const result = await listAllTransactionUseCase.execute({
      userId: '',
    })

    expect(result.transactions).toHaveLength(0)
  })
})
