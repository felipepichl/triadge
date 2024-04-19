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

async function createTransactionCategory(): Promise<string> {
  const token = await authenticateUser()

  await request(app)
    .post('/transactions/categories')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Category Description',
    })

  const response = await request(app)
    .get('/transactions/categories')
    .set({ Authorization: `Bearer ${token}` })

  const { transactionCategories } = response.body

  const { _id } = transactionCategories[0]

  return _id
}

describe('[E2E] - Create Transaction', () => {
  let token: string
  let transactionCategoryId: string

  beforeEach(async () => {
    token = await authenticateUser()
    transactionCategoryId = await createTransactionCategory()
  })

  it('should be to create a new transaction', async () => {
    await createTransactionCategory()

    // const response = await request(app)
    //   .post('/transactions')
    //   .set({ Authorization: `Bearer ${token}` })
    //   .send({
    //     description: 'Description',
    //     detail: '',
    //     type: '',
    //     value: '',
    //     transactionCategoryId: '',
    //   })
    // expect(response.status).toBe(201)
  })
})
