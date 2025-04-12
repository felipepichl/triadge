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
      quantity: 3,
      type: 'stock',
    })
}

describe('[E2E] - Get user portifolio with total invested and current value', () => {
  let token: string
  const type = 'stock'

  beforeEach(async () => {
    token = await authenticateUser()

    await createStock(token)
  })

  it('should be able to get user portifolio with invested and current value', async () => {
    const response = await request(app)
      .get('/stocks/portfolio')
      .set({ Authorization: `Bearer ${token}` })
      .query({ type })

    expect(response.status).toBe(200)
    expect(response.body.portfolio[0].stock.symbol).toBe('PETR4')
    expect(response.body.portfolio.length).toBe(1)
  })
})
