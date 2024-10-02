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

describe('[E2E] - List all Financial Category', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()
  })

  it('should be to list all financial categories to authenticated user', async () => {
    const response = await request(app)
      .get('/financial-category')
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(201)
  })
})
