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

async function createCategoy(description: string, token: string) {
  await request(app)
    .post('/financial-category')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description,
    })
}

describe('[E2E] - List all Financial Categories', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()

    await createCategoy('Financial Category Test01', token)
    await createCategoy('Financial Category Test02', token)
  })

  it('should be to list all financial categories to authenticated user', async () => {
    const response = await request(app)
      .get('/financial-category')
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.financialCategories)).toBe(true)
    expect(response.body.financialCategories.length).toBe(2)
  })
})
