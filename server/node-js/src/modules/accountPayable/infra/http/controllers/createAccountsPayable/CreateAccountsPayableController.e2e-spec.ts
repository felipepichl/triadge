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

async function createSubcategory(parentCategoryId: string): Promise<string> {
  const token = await authenticateUser()

  await request(app)
    .post('/financial-category/subcategory')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Subcategory',
      parentCategoryId,
    })

  const response = await request(app)
    .get(`/financial-category/subcategory/${parentCategoryId}`)
    .set({ Authorization: `Bearer ${token}` })

  const { _id } = response.body.subcategories[0]

  return _id
}

describe('[E2E] - Create Account Payable', () => {
  let token: string
  let financialCategoryId: string
  let subcategoryId: string

  beforeEach(async () => {
    token = await authenticateUser()
    financialCategoryId = await createFinancialCategory()
    subcategoryId = await createSubcategory(financialCategoryId)
  })

  it('should be to create a new account payable', async () => {
    const response = await request(app)
      .post('/accounts-payable')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        description: 'Description',
        amount: 1000,
        dueDate: new Date(),
        financialCategoryId,
        installments: 1,
      })
    expect(response.status).toBe(201)
  })

  it('should be to create a new account payable with subcategory', async () => {
    const response = await request(app)
      .post('/accounts-payable')
      .set({ Authorization: `Bearer ${token}` })
      .send({
        description: 'Description',
        amount: 1000,
        dueDate: new Date(),
        financialCategoryId,
        subcategoryId,
        installments: 5,
      })
    expect(response.status).toBe(201)
  })
})
