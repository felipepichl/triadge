import { Category } from './Category'

describe('[Transaction]/[Category] - Create a new transaction category', () => {
  it('should be able to create a new instance of transaction category', () => {
    const category = Category.createCategory({
      description: 'Transaction category description',
    })

    expect(category instanceof Category).toBe(true)
    expect(category).toBeTruthy()
  })
})
