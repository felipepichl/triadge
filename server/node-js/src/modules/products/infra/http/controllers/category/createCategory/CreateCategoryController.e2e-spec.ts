import request from 'supertest'

import { app } from '@shared/infra/http/start/app'

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

describe('[E2E] - Create Category', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()
  })

  it('should be to create a new category', async () => {
    const response = await request(app)
      .post('/categories')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        name: 'Category name',
        description: 'Category description',
      })

    expect(response.status).toBe(201)
  })
})
