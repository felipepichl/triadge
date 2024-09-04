import { FinancialCategory } from './FinancialCategory'

describe('[FinancialCategory] - Create a new financial category', () => {
  it('should be able to create a new instance of financial category', () => {
    const financialCategory = FinancialCategory.createFinancialCategory({
      description: 'Transaction category description',
    })

    expect(financialCategory instanceof FinancialCategory).toBe(true)
    expect(financialCategory).toBeTruthy()
  })
})
