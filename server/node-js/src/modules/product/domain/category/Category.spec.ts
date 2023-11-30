import { Category } from './Category'

describe('[Product]/[Category] - Create a new category', () => {
  it('should be able to create a new instance of Category', () => {
    const category = Category.createCategory({
      description: 'description',
    })

    expect(category instanceof Category).toBe(true)
    expect(Category).toBeTruthy()
  })
})
