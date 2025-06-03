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

  await request(app)
    .post('/stocks')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      symbol: 'RZAK11',
      price: 88,
      date: new Date(2025, 7, 1),
      quantity: 2,
      type: 'fii',
    })

  await request(app)
    .post('/stocks')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      symbol: 'LIFE11',
      price: 88,
      date: new Date(2025, 7, 5),
      quantity: 2,
      type: 'fii',
    })

  await request(app)
    .post('/stocks')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      symbol: 'LIFE11',
      price: 88,
      date: new Date('2025-07-05'),
      quantity: 2,
      type: 'fii',
    })
}

describe('[E2E] - List all fiis purcheses by month', () => {
  let token: string
  const month = 8

  beforeEach(async () => {
    token = await authenticateUser()

    await createStock(token)
  })

  it('should be to list all fiis purcheses by month', async () => {
    const response = await request(app)
      .get('/stocks/fii-purchases/by-month')
      .set({ Authorization: `Bearer ${token}` })
      .query({ month })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.stocks)).toBe(true)
    expect(response.body.stocks.length).toBe(2)
  })
})
