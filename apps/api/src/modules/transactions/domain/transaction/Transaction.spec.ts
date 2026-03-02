import { Transaction } from './Transaction'

describe('[Transaction] - Create a new transaction', () => {
  it('should be able to create a new instance of transaction', () => {
    const transaction = Transaction.createTransaction({
      description: 'Transaction description',
      type: 'income',
      amount: 1000,
      userId: 'userId',
      financialCategoryId: 'financialCategoryId',
    })

    expect(transaction instanceof Transaction).toBe(true)
    expect(transaction).toBeTruthy()
  })
})
