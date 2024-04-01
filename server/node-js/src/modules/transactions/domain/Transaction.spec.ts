import { Transaction } from './Transaction'

describe('[Tranasaction] - Create a new Transaction', () => {
  it('should be able to create a new instance of transaction', () => {
    const transaction = Transaction.createTransaction({
      description: 'Transaction description',
      type: 'type',
      value: 1000,
    })

    expect(transaction instanceof Transaction).toBe(true)
    expect(transaction).toBeTruthy()
  })
})
