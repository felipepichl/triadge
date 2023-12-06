import { Subcategory } from './Subcategory'

describe('[Product]/[Subcategory] - Create a new subcategory', () => {
  it('should be able to create a new instance of subcategory', () => {
    const subcategory = Subcategory.createSubcategory({
      name: 'name',
      description: 'description',
      categoryId: 'categoryId',
    })

    expect(subcategory instanceof Subcategory).toBe(true)
    expect(subcategory).toBeTruthy()
  })
})
