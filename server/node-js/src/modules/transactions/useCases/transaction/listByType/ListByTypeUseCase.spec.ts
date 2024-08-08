import { User } from '@modules/accounts/domain/User'
import { UsersRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory'
import { TransactionCategory } from '@modules/transactions/domain/category/TransactionCategory'
import { Transaction } from '@modules/transactions/domain/transaction/Transaction'
import { TransactionCategoriesRepositoryInMemory } from '@modules/transactions/repositories/category/in-memory/TransactionCategoriesRepositoryInMemory'
import { TransactionsRepositoryInMemory } from '@modules/transactions/repositories/transaction/in-memory/TransactionsRepositoryInMemory'

let transactionsRepositoryInMemory: TransactionsRepositoryInMemory

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

async function createTransaction(): Promise<string> {
  const transactionCategory = TransactionCategory.createTransactionCategory({
    description: 'Transaction category description',
  })

  const transactionCategoryInMemory =
    new TransactionCategoriesRepositoryInMemory()

  await transactionCategoryInMemory.create(transactionCategory)

  const transactionCategoryId = (await transactionCategoryInMemory.listAll())[0]
    .id

  const userId = await createUser()

  const transaction1 = Transaction.createTransaction({
    description: 'Transaction description 1',
    type: 'income',
    value: 1000,
    userId,
    transactionCategoryId: transactionCategoryId.toString(),
  })

  const transaction2 = Transaction.createTransaction({
    description: 'Transaction description 2',
    type: 'outcome',
    value: 500,
    userId,
    transactionCategoryId: transactionCategoryId.toString(),
  })

  const transaction3 = Transaction.createTransaction({
    description: 'Transaction description 3',
    type: 'outcome',
    value: 500,
    date: new Date('2023-07-01'),
    userId,
    transactionCategoryId: transactionCategoryId.toString(),
  })

  const transactionsToCreate = [transaction1, transaction2, transaction3]

  for (const transactionData of transactionsToCreate) {
    const transaction = transactionData
    await transactionsRepositoryInMemory.create(transaction)
  }

  return userId
}

describe('[Transaction] - List all transacition by type', () => {
  let userId: string

  beforeEach(async () => {
    transactionsRepositoryInMemory = new TransactionsRepositoryInMemory()

    listByDateRangeUseCase = new ListByDateRangeUseCase(
      transactionsRepositoryInMemory,
    )

    userId = await createTransaction()
  })

  it('should be able to list all transacitions with balance', async () => {
    const result = await listByDateRangeUseCase.execute({
      userId,
      startDate,
      endDate,
    })

    expect(result.transactions).toHaveLength(2)
    expect(result.transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'outcome',
        }),
      ]),
    )
  })

  it('should return an empty array if no transaction exist', async () => {
    const result = await listByDateRangeUseCase.execute({
      userId: '',
      startDate,
      endDate,
    })

    expect(result.transactions).toHaveLength(0)
  })
})
