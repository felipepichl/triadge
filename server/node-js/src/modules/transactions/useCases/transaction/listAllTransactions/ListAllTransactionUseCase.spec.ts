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

async function createTransaction(
  respositoryInMemory: TransactionsRepositoryInMemory,
): Promise<void> {
  const userId = await createUser()
  const transactionCategoryId = await createTransactionCategory()

  const transaction = Transaction.createTransaction({
    description: 'Transaction description',
    type: 'income',
    value: 1000,
    userId,
    transactionCategoryId,
  })

  await respositoryInMemory.create(transaction)

  const result = respositoryInMemory.listAll()

  console.log(result[0])
}

describe('[Transaction]/[Category] - List all transacition categories', () => {
  let userId: string

  beforeEach(async () => {
    transactionsRepositoryInMemory = new TransactionsRepositoryInMemory()

    listAllTransactionUseCase = new ListAllTransactionUseCase(
      transactionsRepositoryInMemory,
    )

    userId = await createUser()
    await createTransaction(transactionsRepositoryInMemory)
  })

  it('should be able to list all transacitions', async () => {
    const response = await listAllTransactionUseCase.execute({ userId })

    console.log('response', response)

    // expect(result.transactionCategories).toHaveLength(2)
    // expect(result.transactionCategories).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       id: transacitionCategoryId1,
    //     }),
    //     expect.objectContaining({
    //       id: transacitionCategoryId2,
    //     }),
    //   ]),
    // )
  })

  // it('should return an empty array if no categories exist', async () => {
  //   const result = await listAllTransactionCategoriesUseCase.execute()

  //   expect(result.transactionCategories).toHaveLength(0)
  // })
})
