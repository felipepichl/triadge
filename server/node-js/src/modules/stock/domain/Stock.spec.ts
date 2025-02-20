import { Stock } from './Stock'

describe('[Stock] - Create a new Stock', () => {
  it('should be able to create a new instance of stock', () => {
    const stock = Stock.createStock({
      shortName: 'short name',
      symbol: 'symbol',
      price: 7,
      date: new Date(),
      quantity: 1,
      userId: 'userId',
    })

    expect(stock instanceof Stock).toBe(true)
    expect(stock).toBeTruthy()
  })
})
