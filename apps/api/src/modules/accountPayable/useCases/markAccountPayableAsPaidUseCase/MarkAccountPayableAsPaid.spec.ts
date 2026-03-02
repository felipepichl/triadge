import { AccountPayable } from '@modules/accountPayable/domain/AccountPayable'
import { AccountsPayableRepositoryInMemory } from '@modules/accountPayable/repositories/in-memory/AccountsPayableRepositoryInMemory'
import { TransactionsRepositoryInMemory } from '@modules/transactions/repositories/transaction/in-memory/TransactionsRepositoryInMemory'

import { MarkAccountPayableAsPaidUseCase } from './MarkAccountPayableAsPaidUseCase'

let accountsPayableRepositoryInMemory: AccountsPayableRepositoryInMemory
let transactionsRepositoryInMemory: TransactionsRepositoryInMemory
let markAccountPayableAsPaidUseCase: MarkAccountPayableAsPaidUseCase

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
    amount: 100,
    dueDate: new Date('2025,04,01'),
    userId: 'user_id',
    financialCategoryId: 'financial_category_id',
    subcategoryId: 'subcategory_id',
  })

  accounts.push(accountPayable1, accountPayable2)

  accountsPayableRepositoryInMemory.createMany(accounts)

  return accountPayable1.id.toString()
}

describe('[AccountPayable] - Mark account payable as to paid', () => {
  let accountPayableId: string

  beforeEach(async () => {
    accountPayableId = await createAccountPayable()
    transactionsRepositoryInMemory = new TransactionsRepositoryInMemory()

    markAccountPayableAsPaidUseCase = new MarkAccountPayableAsPaidUseCase(
      accountsPayableRepositoryInMemory,
      transactionsRepositoryInMemory,
    )
  })

  it('should be able to mark account payable as to paid', async () => {
    await markAccountPayableAsPaidUseCase.execute({
      accountPayableId,
    })

    const result =
      await accountsPayableRepositoryInMemory.listAllPaidAccountsByMonth(
        'user_id',
        4,
      )

    expect(result[0]).toBeDefined()
    expect(result.length).toBe(1)
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          isPaid: true,
        }),
      ]),
    )
  })

  it('should be able to create a new transaction when account payable as to paid', async () => {
    await markAccountPayableAsPaidUseCase.execute({
      accountPayableId,
    })

    const result =
      await transactionsRepositoryInMemory.findByDescription(
        'Account Payable 1',
      )

    expect(result).toBeDefined()
    expect(result).toEqual(
      expect.objectContaining({
        description: 'Account Payable 1',
        type: 'outcome',
      }),
    )
  })
})
