import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { AccountsPayableRepositoryInMemory } from '@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory'

import { UpdateAmountVariableUseCase } from './UpdateAmountVariableUseCase'

let accountsPayableRepositoryInMemory: AccountsPayableRepositoryInMemory
let updateAmountVariableUseCase: UpdateAmountVariableUseCase

async function createAccountPayable(): Promise<string> {
  accountsPayableRepositoryInMemory = new AccountsPayableRepositoryInMemory()

  const accounts: AccountPayable[] = []

  const accountPayable1 = AccountPayable.createAccountPayable({
    description: 'Account Payable 1',
    amount: 100,
    dueDate: new Date('2025,04,01'),
    userId: 'user_id',
    financialCategoryId: 'financial_category_id',
    subcategoryId: 'subcategory_id',
  })

  const accountPayable2 = AccountPayable.createAccountPayable({
    description: 'Account Payable 2',
    amount: 150,
    dueDate: new Date('2025,04,01'),
    userId: 'user_id',
    financialCategoryId: 'financial_category_id',
    subcategoryId: 'subcategory_id',
  })

  accounts.push(accountPayable1, accountPayable2)

  accountsPayableRepositoryInMemory.createMany(accounts)

  return accountPayable1.id.toString()
}

describe('[AccountPayable] - Update amount variable to account payable', () => {
  let accountPayableId: string

  beforeEach(async () => {
    accountPayableId = await createAccountPayable()

    updateAmountVariableUseCase = new UpdateAmountVariableUseCase(
      accountsPayableRepositoryInMemory,
    )
  })

  it('should be able to update amount variable to account payable', async () => {
    await updateAmountVariableUseCase.execute({
      accountPayableId,
      amount: 200,
    })

    const result = await accountsPayableRepositoryInMemory.listAll('user_id')

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          amount: 200,
        }),
      ]),
    )
  })
})
