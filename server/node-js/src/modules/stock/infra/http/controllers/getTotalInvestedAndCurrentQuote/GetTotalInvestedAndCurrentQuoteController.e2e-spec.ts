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
      price: 21,
      quantity: 3,
      type: 'stock',
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
  })
})
