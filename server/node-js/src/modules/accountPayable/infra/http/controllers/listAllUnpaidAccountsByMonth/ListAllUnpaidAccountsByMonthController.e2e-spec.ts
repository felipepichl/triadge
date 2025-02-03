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

async function markAccountPayableAsPaid() {
  const token = await authenticateUser()

  const { id } = await PrismaSingleton.getInstance().accountPayable.findFirst({
    where: { description: 'Description Account Payable 1' },
  })

  await request(app)
    .patch(`/accounts-payable/${id}/pay`)
    .set({ Authorization: `Bearer ${token}` })
}

describe('[E2E] - List all unpaid accounts payable by month', () => {
  let token: string

  beforeEach(async () => {
    token = await authenticateUser()
    await createAccountPaybale()
    await markAccountPayableAsPaid()
  })

  it('should be able to list all unpaid accounts by month', async () => {
    const response = await request(app)
      .get('/accounts-payable/unpaid/month')
      .set({ Authorization: `Bearer ${token}` })
      .query({ month: 1 })

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body.unpaidAccountsPayable)).toBe(true)
    expect(response.body.unpaidAccountsPayable.length).toBe(1)
    expect(response.body.unpaidAccountsPayableTotalAmount).toBe(500)
  })
})
