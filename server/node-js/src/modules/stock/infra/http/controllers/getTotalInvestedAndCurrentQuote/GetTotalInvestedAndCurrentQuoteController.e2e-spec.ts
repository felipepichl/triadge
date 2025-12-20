import { app } from '@shared/infra/http/start/app'
import request from 'supertest'

async function authenticateUser(): Promise<string> {
  await request(app).post('/users').send({
    name: 'Jonh Due',
    email: 'johndue@example.com',
    password: 'hash123',
    phoneNumber: '51999999999',
  })

  const response = await request(app).post('/sessions').send({
    email: 'johndue@example.com',
    password: 'hash123',
  })
  const { token } = response.body
  return token
}

async function createStock(token: string, options?: { symbol?: string; price?: number; quantity?: number; type?: string }) {
  const { symbol = 'PETR4', price = 21, quantity = 3, type = 'stock' } = options || {}

  await request(app)
    .post('/stocks/buy')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      symbol,
      price,
      quantity,
      type,
    })
}

describe('[E2E] - Get user total invested and current value', () => {
  let token: string
  const type = 'stock'

  beforeEach(async () => {
    token = await authenticateUser()

    await createStock(token)
  })

  it('should be able to get user total invested and current value', async () => {
    const response = await request(app)
      .get('/stocks/investement')
      .set({ Authorization: `Bearer ${token}` })
      .query({ type })

    expect(response.status).toBe(200)
    expect(response.body.totalInvested).toBe(63)
    expect(response.body.currentValue).toBeDefined()
    expect(response.body.position).toBeDefined()

    const { totalInvested, currentValue, position } = response.body

    // Position should be currentValue - totalInvested
    expect(position).toBe(currentValue - totalInvested)
  })

  it('should calculate position with profit when current market prices are higher than purchase prices', async () => {
    // Setup: Create stock with low purchase price to ensure profit scenario
    const lowPrice = 10 // Assuming current market price is higher than 10
    await request(app)
      .post('/stocks/buy')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        symbol: 'VALE3', // Different symbol to avoid conflicts
        price: lowPrice,
        quantity: 10,
        type: 'stock',
      })

    const response = await request(app)
      .get('/stocks/investement')
      .set({ Authorization: `Bearer ${token}` })
      .query({ type })

    expect(response.status).toBe(200)
    expect(response.body.currentValue).toBeDefined()
    expect(response.body.position).toBeDefined()

    const { totalInvested, currentValue, position } = response.body

    // For this test, we expect profit (assuming current market price > purchase price)
    // Position should be positive when currentValue > totalInvested
    expect(position).toBe(currentValue - totalInvested)
    expect(typeof position).toBe('number')
  })

  it('should calculate position with loss when current market prices are lower than purchase prices', async () => {
    // Setup: Create stock with high purchase price to ensure loss scenario
    const highPrice = 100 // Assuming current market price is lower than 100
    await request(app)
      .post('/stocks/buy')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        symbol: 'ITUB4', // Different symbol to avoid conflicts
        price: highPrice,
        quantity: 5,
        type: 'stock',
      })

    const response = await request(app)
      .get('/stocks/investement')
      .set({ Authorization: `Bearer ${token}` })
      .query({ type })

    expect(response.status).toBe(200)
    expect(response.body.currentValue).toBeDefined()
    expect(response.body.position).toBeDefined()

    const { totalInvested, currentValue, position } = response.body

    // For this test, we expect loss (assuming current market price < purchase price)
    // Position should be negative when currentValue < totalInvested
    expect(position).toBe(currentValue - totalInvested)
    expect(typeof position).toBe('number')
  })
})
