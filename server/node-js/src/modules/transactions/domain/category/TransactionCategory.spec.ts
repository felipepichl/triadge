import { TransactionCategory } from './TransactionCategory'

describe('[Transaction]/[Category] - Create a new transaction category', () => {
  it('should be able to create a new instance of transaction category', () => {
    const transactionCategory = TransactionCategory.createTransactionCategory({
      description: 'Transaction category description',
    })

    expect(transactionCategory instanceof TransactionCategory).toBe(true)
    expect(transactionCategory).toBeTruthy()
  })
})
