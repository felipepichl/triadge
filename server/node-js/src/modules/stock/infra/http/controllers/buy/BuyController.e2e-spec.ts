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

describe('[E2E] - Buy a new stock', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()
  })

  it('should be to buy a new stock', async () => {
    const response = await request(app)
      .post('/stocks/buy')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        symbol: 'LIFE11',
        price: 25,
        quantity: 1,
        type: 'fii',
      })
    expect(response.status).toBe(201)
  })
})
