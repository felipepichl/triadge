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

async function createCategoy(name: string, description: string, token: string) {
  await request(app)
    .post('/categories')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      name,
      description,
    })
}

describe('[E2E] - List all Categories', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()
    await createCategoy('Category01', 'Category Test01', token)
    await createCategoy('Category02', 'Category Test02', token)
  })

  it('should be to list all categories', async () => {
    const response = await request(app)
      .get('/categories')
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.categories)).toBe(true)
    expect(response.body.categories.length).toBe(2)
  })
})
