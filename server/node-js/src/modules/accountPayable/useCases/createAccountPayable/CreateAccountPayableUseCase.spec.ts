import { AccountsPayableRepositoryInMemory } from '@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory'

import { CreateAccountPayableUseCase } from './CreateAccountPayableUseCase'

let accountsPayableRepositoryInMemory: AccountsPayableRepositoryInMemory
let createAccountsPayableUseCase: CreateAccountPayableUseCase

describe('[AccountPayable] - Create a account payable', () => {
  beforeEach(() => {
    accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory()

    createAccountsPayableUseCase = new CreateAccountPayableUseCase(
      accountsPayableRepositoryInMemory,
    )
  })

  it('should be able to create a new account payable', async () => {
    await createAccountsPayableUseCase.execute({
      description: 'Account Payable description',
      amount: 100,
      dueDate: new Date(),
      userId: 'user_id',
      financialCategoryId: 'financial_category_id',
      subcategoryId: 'subcategory_id',
    })

    const accountPayableCreated =
      await accountsPayableRepositoryInMemory.listAll('user_id')

    expect(accountPayableCreated[0]).toBeDefined()
    expect(accountPayableCreated[0].description).toEqual(
      'Account Payable description',
    )
  })
})
