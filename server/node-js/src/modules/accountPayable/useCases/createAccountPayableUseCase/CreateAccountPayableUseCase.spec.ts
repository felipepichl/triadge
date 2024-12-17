import { AccountsPayableRepositoryInMemory } from '@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory'

import { CreateAccountPayableUseCase } from './CreateAccountPayableUseCase'

let accountsPayableRepositoryInMemory: AccountsPayableRepositoryInMemory
let createAccountPayableUseCase: CreateAccountPayableUseCase

describe('[AccountPayable] - Create a installments account payable', () => {
  beforeEach(() => {
    accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory()

    createAccountPayableUseCase = new CreateAccountPayableUseCase(
      accountsPayableRepositoryInMemory,
    )
  })

  it('should be able to create a new account payable for immediate payment', async () => {
    await createAccountPayableUseCase.execute({
      description: 'Immediate Payment Account Payable',
      amount: 1000,
      dueDate: new Date(),
      userId: 'user_id',
      financialCategoryId: 'financial_category_id',
      subcategoryId: 'subcategory_id',
    })

    const accountPayableCreated =
      await accountsPayableRepositoryInMemory.listAll('user_id')

    expect(accountPayableCreated[0]).toBeDefined()
    expect(accountPayableCreated.length).toBe(1)
    expect(accountPayableCreated[0].amount).toBe(1000)
  })

  it('should be able to create a new installments account payable', async () => {
    await createAccountPayableUseCase.execute({
      description: 'Account Payable description',
      amount: 1000,
      dueDate: new Date(),
      userId: 'user_id',
      financialCategoryId: 'financial_category_id',
      subcategoryId: 'subcategory_id',
      installments: 5,
    })

    const accountPayableCreated =
      await accountsPayableRepositoryInMemory.listAll('user_id')

    expect(accountPayableCreated[0]).toBeDefined()
    expect(accountPayableCreated.length).toBe(5)
  })
})
