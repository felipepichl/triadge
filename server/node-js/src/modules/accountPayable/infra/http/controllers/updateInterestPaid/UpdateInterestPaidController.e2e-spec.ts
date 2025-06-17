import { app } from '@shared/infra/http/start/app'
import { PrismaSingleton } from '@shared/infra/prisma'
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

async function createAccountPaybale() {
  const token = await authenticateUser()
  const financialCategoryId = await createFinancialCategory()

  await request(app)
    .post('/accounts-payable')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description Account Payable 1',
      amount: 1000,
      dueDate: new Date('2025-01-02'),
      financialCategoryId,
    })

  await request(app)
    .post('/accounts-payable')
    .set({ Authorization: `Bearer ${token}` })
    .send({
      description: 'Description Account Payable 2',
      amount: 500,
      dueDate: new Date('2025-01-02'),
      financialCategoryId,
    })
}

async function getAccountPayable() {
  const result = await PrismaSingleton.getInstance().accountPayable.findFirst({
    where: { description: 'Description Account Payable 1' },
  })

  return result
}

describe('[E2E] - Update amount with interest pay to account payable', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()
    await createAccountPaybale()
  })

  it('should be able to update amount with interest pay to account payable', async () => {
    const { id } = await getAccountPayable()

    const response = await request(app)
      .patch(`/accounts-payable/${id}/interest-paid`)
      .set({ Authorization: `Bearer ${token}` })
      .send({
        amount: 2000,
      })

    const { amount } = await getAccountPayable()
    const result = await getAccountPayable()

    console.log(JSON.stringify(result, null, 2))

    expect(response.status).toBe(201)
    expect(Number(amount)).toBe(2000)
  })
})
