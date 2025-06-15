import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { AccountsPayableRepositoryInMemory } from '@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory'

import { UpdateInterestPaidUseCase } from './UpdateInterestPaidUseCase'

let accountsPayableRepositoryInMemory: AccountsPayableRepositoryInMemory
let updateInterestPaidUseCase: UpdateInterestPaidUseCase

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

describe('[AccountPayable] - Update amount with interest pay', () => {
  let accountPayableId: string

  beforeEach(async () => {
    accountPayableId = await createAccountPayable()

    updateInterestPaidUseCase = new UpdateInterestPaidUseCase(
      accountsPayableRepositoryInMemory,
    )
  })

  it('should be able to update amount with interest pay', async () => {
    await updateInterestPaidUseCase.execute({
      accountPayableId,
      amount: 200,
    })

    const result = await accountsPayableRepositoryInMemory.listAll('user_id')

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          amount: 200,
          interestPaid: 100,
          isInterestPaid: true,
        }),
      ]),
    )
  })
})
