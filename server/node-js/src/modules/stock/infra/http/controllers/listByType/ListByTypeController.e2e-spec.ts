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

async function createStock(token: string) {
  await request(app)
    .post('/stocks')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      symbol: 'PETR4',
      price: 25,
      quantity: 1,
      type: 'stock',
    })
}

describe('[E2E] - List all stocks by type', () => {
  let token: string
  const type = 'stock'

  beforeEach(async () => {
    token = await authenticateUser()

    await createStock(token)
  })

  it('should be to list all stocks by type', async () => {
    const response = await request(app)
      .get('/stocks/type')
      .set({ Authorization: `Bearer ${token}` })
      .query({ type })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.stocks)).toBe(true)
    expect(response.body.stocks.length).toBe(1)
  })
})
