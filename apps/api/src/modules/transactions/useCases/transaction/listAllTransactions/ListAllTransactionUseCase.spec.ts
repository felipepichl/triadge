import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { FinancialCategory } from '@modules/financialCategory/domain/FinancialCategory'
import { FinancialCategoriesRepositoryInMemory } from '@modules/financialCategory/repositories/in-memory/FinancialCategoriesRepositoryInMemory'
import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
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

async function createFinancialCategory(): Promise<string> {
  const financialCategory = FinancialCategory.createFinancialCategory({
    description: 'Transaction category description',
    userId: 'user_id',
  })

  const financialCategoryInMemory = new FinancialCategoriesRepositoryInMemory()

  await financialCategoryInMemory.create(financialCategory)

  const financialCategoryId = (
    await financialCategoryInMemory.listAllCategoriesByUser('user_id')
  )[0].id

  return financialCategoryId.toString()
}

async function createTransaction(): Promise<string> {
  const userId = await createUser()
  const financialCategoryId = await createFinancialCategory()

  const transaction1 = Transaction.createTransaction({
    description: 'Transaction description',
    type: 'income',
    amount: 1000,
    userId,
    financialCategoryId,
  })

  const transaction2 = Transaction.createTransaction({
    description: 'Transaction description',
    type: 'outcome',
    amount: 500,
    userId,
    financialCategoryId,
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
