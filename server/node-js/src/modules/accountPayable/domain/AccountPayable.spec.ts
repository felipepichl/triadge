import { AccountPayable } from './AccountPayable'

describe('[AccountPayable] - Create a new account payable', () => {
  it('should be able to create a new instance of account payable', () => {
    const accountPayable = AccountPayable.createAccountPayable({
      description: 'Account Payable description',
      amount: 100,
      dueDate: new Date(),
      isPaid: false,
      totalInstallments: 1,
      isFixed: false,
      userId: 'user_id',
      financialCategoryId: 'financial_category_id',
      subcategoryId: 'subcategory_id',
    })

    expect(accountPayable instanceof AccountPayable).toBe(true)
    expect(accountPayable).toBeTruthy()
  })
})
