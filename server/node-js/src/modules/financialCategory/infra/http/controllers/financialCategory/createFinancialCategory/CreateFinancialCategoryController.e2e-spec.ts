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

describe('[E2E] - Create Financial Category', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()
  })

  it('should be to create a new financial category', async () => {
    const response = await request(app)
      .post('/financial-category')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        description: 'Financial Category Description',
      })

    expect(response.status).toBe(201)
  })
})
