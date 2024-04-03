import { Transaction } from './Transaction'

describe('[Transaction] - Create a new transaction', () => {
  it('should be able to create a new instance of transaction', () => {
    const transaction = Transaction.createTransaction({
      description: 'Transaction description',
      type: 'income',
      value: 1000,
    })

    expect(transaction instanceof Transaction).toBe(true)
    expect(transaction).toBeTruthy()
  })
})
