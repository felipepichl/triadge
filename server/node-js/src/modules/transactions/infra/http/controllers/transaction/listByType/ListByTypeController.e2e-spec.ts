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

async function createCategoy(token: string): Promise<string> {
  await request(app)
    .post('/transactions/categories')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Category Test',
    })

  const response = await request(app)
    .get('/transactions/categories')
    .set({ Authorization: `Bearer ${token}` })

  const { _id } = response.body.transactionCategories[0]

  return _id
}

async function createTransaction(transactionCategoryId: string, token: string) {
  await request(app)
    .post('/transactions')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description 1',
      detail: 'Detail',
      type: 'income',
      value: 100,
      transactionCategoryId,
    })

  await request(app)
    .post('/transactions')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description 2',
      detail: 'Detail',
      type: 'outcome',
      value: 50,
      transactionCategoryId,
    })

  await request(app)
    .post('/transactions')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description 3',
      detail: 'Detail',
      type: 'outcome',
      value: 50,
      transactionCategoryId,
    })
}

describe('[E2E] - List all Transactions by type', () => {
  let token: string
  let transactionCategoryId: string
  const type = 'outcome'

  beforeEach(async () => {
    token = await authenticateUser()
    transactionCategoryId = await createCategoy(token)
    await createTransaction(transactionCategoryId, token)
  })

  it('should be to list all transactions by type', async () => {
    const response = await request(app)
      .get('/transactions/type')
      .set({ Authorization: `Bearer ${token}` })
      .query({ type })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.transactions)).toBe(true)
    expect(response.body.transactions.length).toBe(2)
  })
})
