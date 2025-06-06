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

async function createFinancialCategoy(token: string): Promise<string> {
  await request(app)
    .post('/financial-category')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Financial Category Test',
    })

  const response = await request(app)
    .get('/financial-category')
    .set({ Authorization: `Bearer ${token}` })

  const { _id } = response.body.financialCategories[0]

  return _id
}

async function createTransaction(financialCategoryId: string, token: string) {
  await request(app)
    .post('/transactions')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description',
      detail: 'Detail',
      type: 'income',
      amount: 100,
      financialCategoryId,
    })

  await request(app)
    .post('/transactions')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description',
      detail: 'Detail',
      type: 'outcome',
      amount: 50,
      financialCategoryId,
    })
}

describe('[E2E] - List all Transactions', () => {
  let token: string
  let financialCategoryId: string

  beforeEach(async () => {
    token = await authenticateUser()
    financialCategoryId = await createFinancialCategoy(token)
    await createTransaction(financialCategoryId, token)
  })

  it('should be to list all categories', async () => {
    const response = await request(app)
      .get('/transactions')
      .set({ Authorization: `Bearer ${token}` })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.transactions)).toBe(true)
    expect(response.body.transactions.length).toBe(2)
  })
})
