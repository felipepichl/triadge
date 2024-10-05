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

async function createFinancialCategory(): Promise<string> {
  const token = await authenticateUser()

  await request(app)
    .post('/financial-category')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Financial Category Description',
    })

  const response = await request(app)
    .get('/financial-category')
    .set({ Authorization: `Bearer ${token}` })

  const { financialCategories } = response.body

  const { _id } = financialCategories[0]

  return _id
}

describe('[E2E] - Create Transaction', () => {
  let token: string
  let financialCategoryId: string

  beforeEach(async () => {
    token = await authenticateUser()
    financialCategoryId = await createFinancialCategory()
  })

  it('should be to create a new transaction', async () => {
    const response = await request(app)
      .post('/transactions')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        description: 'Description',
        detail: 'Detail',
        type: 'income',
        value: 100,
        financialCategoryId,
      })
    expect(response.status).toBe(201)
  })
})
